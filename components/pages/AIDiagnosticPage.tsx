'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, AlertTriangle, Sparkles, Loader2, CheckCircle2, XCircle } from 'lucide-react';

// -----------------------------------------------------------------------------
// Config
// -----------------------------------------------------------------------------

const CONFIG = {
  WEBHOOK_URL: '/api/lead',
  BOOKING_URL: 'https://wa.me/447835212468',
  SOURCE: 'Диагностика готовности к AI',
};

// Упрощённая версия: 5 утверждений → 3 ключевых.
const MATURITY_STATEMENTS = [
  'Ключевые процессы описаны в документах, а не только «в головах»',
  'Для главных задач есть чёткий стандарт результата',
  'Уже стабильно работает автоматизация или AI-агенты',
];

// Упрощённая матрица: 4 критерия вместо 8. Достаточно для точного вердикта.
const CRITERIA = [
  { id: 'impact', label: 'Влияние на выручку', hint: 'Насколько результат критичен для бизнеса' },
  { id: 'standard', label: 'Стандарт результата', hint: 'Насколько чётко описан «правильный» ответ' },
  { id: 'data', label: 'Качество данных', hint: 'Полнота и точность входных данных' },
  { id: 'reversibility', label: 'Обратимость ошибки', hint: 'Можно ли откатить ошибку без потерь' },
] as const;

type CriterionId = (typeof CRITERIA)[number]['id'];
type Scores = Record<CriterionId, number>;
type Answer = 'yes' | 'part' | 'no' | null;

const initialScores: Scores = { impact: 3, standard: 3, data: 3, reversibility: 3 };

const LEVELS: Array<{ level: number; title: string; description: string }> = [
  { level: 0, title: 'В головах', description: 'Процессы существуют только в опыте сотрудников' },
  { level: 1, title: 'В документах', description: 'Есть базовые описания процессов' },
  { level: 2, title: 'Со стандартом', description: 'Известен «правильный» результат ключевых задач' },
  { level: 3, title: 'С автоматизацией', description: 'Уже работают агенты или автоматизации' },
];

// -----------------------------------------------------------------------------
// Calc
// -----------------------------------------------------------------------------

function calcLevel(answers: Answer[]): number {
  let score = 0;
  for (const a of answers) {
    if (a === 'yes') score += 1;
    else if (a === 'part') { score += 0.5; break; }
    else break;
  }
  return Math.floor(score);
}

function calcPercent(scores: Scores): number {
  const sum = Object.values(scores).reduce((a, b) => a + b, 0);
  return Math.round((sum / 20) * 100); // 4 критерия × 5 = 20
}

function calcBand(percent: number, redZone: boolean) {
  if (redZone) return { label: 'Нужен контур контроля', tone: 'red' as const };
  if (percent >= 70) return { label: 'Готов к пилоту', tone: 'green' as const };
  if (percent >= 50) return { label: 'Почти готов', tone: 'blue' as const };
  if (percent >= 30) return { label: 'Учебный стенд', tone: 'amber' as const };
  return { label: 'Рано: сначала подготовка', tone: 'neutral' as const };
}

function verdict(level: number, percent: number, redZone: boolean): string {
  if (redZone)
    return 'В задаче есть необратимые действия — начинать с полноценного AI-агента опасно. Первый шаг: описать процесс, добавить ручную проверку на критичных шагах, затем подключать автономию.';
  if (percent >= 70 && level >= 1)
    return 'Отличная точка входа: данные есть, стандарт понятен. Можно готовить пилот на 4–6 недель — сначала копилот, потом автономный агент.';
  if (percent >= 50)
    return 'Кандидат хороший, но нужно докрутить данные и стандарт. 1–2 недели подготовки — и запускаем пилот в режиме копилота.';
  if (percent >= 30)
    return 'Пока рано для боевого агента: подойдёт как учебный стенд. Настроим процесс, соберём данные, обучим команду — через 1–2 месяца возвращаемся к пилоту.';
  return 'Для этой задачи AI-агент сейчас не даст эффекта. Сначала опишите процесс, определите стандарт результата и соберите данные — без этой базы агент только увеличит хаос.';
}

// -----------------------------------------------------------------------------
// UI primitives
// -----------------------------------------------------------------------------

function Ring({ percent, tone }: { percent: number; tone: string }) {
  const r = 62;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  const colorMap: Record<string, string> = {
    red: '#E60000', green: '#22c55e', amber: '#f59e0b', blue: '#3b82f6', neutral: '#71717a',
  };
  const color = colorMap[tone] || '#E60000';
  return (
    <svg width="160" height="160" viewBox="0 0 160 160" className="rotate-[-90deg]">
      <circle cx="80" cy="80" r={r} stroke="#f0f0f0" strokeWidth="12" fill="none" />
      <motion.circle
        cx="80" cy="80" r={r} stroke={color} strokeWidth="12" fill="none" strokeLinecap="round"
        initial={{ strokeDasharray: c, strokeDashoffset: c }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
      <text x="80" y="80" textAnchor="middle" dominantBaseline="central"
        transform="rotate(90 80 80)"
        style={{ fontSize: '28px', fontWeight: 700, fill: '#101010' }}>
        {percent}%
      </text>
    </svg>
  );
}

// -----------------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------------

export function AIDiagnosticPage() {
  const [step, setStep] = useState(0); // 0=intro, 1=form, 2=result

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [answers, setAnswers] = useState<Answer[]>([null, null, null]);
  const [processName, setProcessName] = useState('');
  const [scores, setScores] = useState<Scores>(initialScores);
  const [redZone, setRedZone] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<'idle' | 'ok' | 'err'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [utm, setUtm] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const captured: Record<string, string> = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((k) => {
      const v = params.get(k);
      if (v) captured[k] = v;
    });
    setUtm(captured);
    fire('diagnostic_view');
  }, []);

  const level = useMemo(() => calcLevel(answers), [answers]);
  const percent = useMemo(() => calcPercent(scores), [scores]);
  const band = useMemo(() => calcBand(percent, redZone), [percent, redZone]);
  const levelInfo = LEVELS[Math.min(level, LEVELS.length - 1)];

  function fire(name: string, params: Record<string, unknown> = {}) {
    if (typeof window === 'undefined') return;
    const w = window as any;
    if (typeof w.gtag === 'function') w.gtag('event', name, params);
    if (typeof w.ym === 'function') w.ym(112550385, 'reachGoal', name);
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Укажите имя';
    if (!company.trim()) e.company = 'Укажите компанию';
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) e.phone = 'Не менее 10 цифр';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Некорректный email';
    if (answers.some((a) => a === null)) e.maturity = 'Ответьте на все 3 утверждения';
    if (!processName.trim()) e.process = 'Опишите процесс-кандидат';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit() {
    if (submitting) return;
    if (!validate()) {
      document.getElementById('diag-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    setSubmitting(true);
    fire('diagnostic_submit');

    const noteLines = [
      `📋 ${CONFIG.SOURCE}`,
      '',
      `👤 ${name} · ${company}`,
      `📞 ${phone} · ✉ ${email}`,
      '',
      `📊 Уровень зрелости: ${level}/3 — ${levelInfo.title}`,
      `   Ответы: ${answers.map((a, i) => `${i + 1}=${a}`).join(', ')}`,
      '',
      `🤖 Процесс: ${processName}`,
      `   Готовность: ${percent}% — ${band.label}${redZone ? ' · 🚨 Красная зона' : ''}`,
      ...CRITERIA.map((c) => `   ${c.label}: ${scores[c.id]}/5`),
      '',
      Object.keys(utm).length ? `UTM: ${JSON.stringify(utm)}` : null,
    ].filter(Boolean).join('\n');

    const payload = {
      name: `${name} · Диагностика AI (${percent}%, ур.${level})`,
      phone,
      email,
      note: noteLines,
      page: '/ai-diagnostic',
      utm: { source: utm.utm_source, medium: utm.utm_medium, campaign: utm.utm_campaign },
      diagnostic: {
        contact: { name, phone, email },
        company: { name: company },
        maturity: { level, answers },
        firstAgent: { process: processName, scores, totalPercent: percent, redZone },
        meta: {
          source: CONFIG.SOURCE,
          url: typeof window !== 'undefined' ? window.location.href : '',
          submittedAt: new Date().toISOString(),
          utm,
        },
      },
    };

    try {
      const r = await fetch(CONFIG.WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setSubmitResult(r.ok ? 'ok' : 'err');
      fire(r.ok ? 'diagnostic_submit_success' : 'diagnostic_submit_error', { percent, level });
    } catch (e) {
      console.error('diagnostic submit failed', e);
      setSubmitResult('err');
      fire('diagnostic_submit_error');
    } finally {
      setSubmitting(false);
      setStep(2);
      document.getElementById('diag-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  const inputCls =
    'w-full rounded-lg border border-black/15 bg-white px-3 py-2.5 text-[15px] text-[#101010] outline-none focus:border-[#E60000] focus:ring-2 focus:ring-[#E60000]/15';

  return (
    <section className="min-h-screen bg-[#f5f5f5] px-4 pb-20 pt-28 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-4 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#E60000]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#666]">
              Бесплатная диагностика · 2 минуты
            </span>
          </div>
        </div>

        <div
          id="diag-card"
          className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.15)]"
        >
          <div className="p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {/* ============ INTRO ============ */}
              {step === 0 && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="text-3xl font-semibold tracking-tight text-[#101010] sm:text-4xl">
                    Готов ли ваш бизнес к{' '}
                    <span className="whitespace-nowrap text-[#E60000]">AI-агенту</span>?
                  </h1>
                  <p className="mt-4 text-base text-[#666] sm:text-lg">
                    За 2 минуты узнаете уровень зрелости процессов, готовность выбранной задачи к AI
                    и получите персональный вывод — с чего начать.
                  </p>
                  <ul className="mt-6 space-y-2 text-sm text-[#101010]">
                    {[
                      'Уровень зрелости процессов',
                      'Готовность выбранного процесса к AI (в %)',
                      'Персональный вывод: пилот, стенд или подготовка',
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-2">
                        <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#E60000]/10">
                          <Check className="h-3 w-3 text-[#E60000]" strokeWidth={3} />
                        </div>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => {
                      fire('diagnostic_start');
                      setStep(1);
                      document.getElementById('diag-card')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#E60000] px-6 py-3.5 text-base font-semibold text-white shadow-[0_10px_30px_-10px_rgba(230,0,0,0.6)] transition hover:bg-[#cc0000] sm:w-auto"
                  >
                    Начать диагностику
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="mt-4 text-xs text-[#999]">
                    Данные не передаём третьим лицам. Результат — на экране сразу.
                  </p>
                </motion.div>
              )}

              {/* ============ FORM (single screen) ============ */}
              {step === 1 && (
                <motion.div
                  key="form"
                  id="diag-form"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Contacts */}
                  <h2 className="text-xl font-semibold text-[#101010] sm:text-2xl">Ваши данные</h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div>
                      <input
                        placeholder="Имя *"
                        className={inputCls}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {errors.name && <p className="mt-1 text-xs text-[#E60000]">{errors.name}</p>}
                    </div>
                    <div>
                      <input
                        placeholder="Компания *"
                        className={inputCls}
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                      {errors.company && <p className="mt-1 text-xs text-[#E60000]">{errors.company}</p>}
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Телефон *"
                        className={inputCls}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      {errors.phone && <p className="mt-1 text-xs text-[#E60000]">{errors.phone}</p>}
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email *"
                        className={inputCls}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && <p className="mt-1 text-xs text-[#E60000]">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Maturity */}
                  <h3 className="mt-8 text-lg font-semibold text-[#101010]">
                    Зрелость процессов
                  </h3>
                  <p className="mt-0.5 text-sm text-[#666]">3 короткие оценки — «Да / Частично / Нет»</p>
                  <div className="mt-3 space-y-2.5">
                    {MATURITY_STATEMENTS.map((s, i) => (
                      <div key={i} className="rounded-xl border border-black/10 bg-white p-3.5">
                        <p className="mb-2.5 text-sm text-[#101010]">
                          <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded bg-[#E60000]/10 text-xs font-semibold text-[#E60000]">
                            {i + 1}
                          </span>
                          {s}
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          {([{ v: 'yes', l: 'Да' }, { v: 'part', l: 'Частично' }, { v: 'no', l: 'Нет' }] as const).map(
                            (opt) => {
                              const active = answers[i] === opt.v;
                              return (
                                <button
                                  key={opt.v}
                                  type="button"
                                  onClick={() => {
                                    const next = [...answers];
                                    next[i] = opt.v as Answer;
                                    setAnswers(next);
                                  }}
                                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                                    active
                                      ? 'border-[#E60000] bg-[#E60000] text-white'
                                      : 'border-black/10 bg-white text-[#101010] hover:border-[#E60000]/40'
                                  }`}
                                >
                                  {opt.l}
                                </button>
                              );
                            },
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.maturity && <p className="mt-2 text-xs text-[#E60000]">{errors.maturity}</p>}

                  {/* First agent */}
                  <h3 className="mt-8 text-lg font-semibold text-[#101010]">Первый агент</h3>
                  <p className="mt-0.5 text-sm text-[#666]">
                    Один процесс + 4 быстрые оценки по шкале 1–5
                  </p>
                  <input
                    placeholder="Процесс-кандидат (например: квалификация лидов) *"
                    className={`${inputCls} mt-3`}
                    value={processName}
                    onChange={(e) => setProcessName(e.target.value)}
                  />
                  {errors.process && <p className="mt-1 text-xs text-[#E60000]">{errors.process}</p>}

                  <div className="mt-3 space-y-2.5">
                    {CRITERIA.map((c) => (
                      <div key={c.id} className="rounded-xl border border-black/10 bg-white p-3.5">
                        <div className="mb-2 flex items-baseline justify-between gap-3">
                          <div>
                            <div className="text-sm font-medium text-[#101010]">{c.label}</div>
                            <div className="text-xs text-[#999]">{c.hint}</div>
                          </div>
                          <div className="font-mono text-base font-semibold text-[#E60000]">
                            {scores[c.id]}
                          </div>
                        </div>
                        <div className="grid grid-cols-5 gap-1.5">
                          {[1, 2, 3, 4, 5].map((n) => {
                            const active = scores[c.id] === n;
                            return (
                              <button
                                key={n}
                                type="button"
                                onClick={() => setScores({ ...scores, [c.id]: n })}
                                className={`rounded-lg border py-1.5 text-sm font-medium transition ${
                                  active
                                    ? 'border-[#E60000] bg-[#E60000] text-white'
                                    : 'border-black/10 bg-white text-[#666] hover:border-[#E60000]/40'
                                }`}
                              >
                                {n}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/50 p-3.5">
                    <input
                      type="checkbox"
                      checked={redZone}
                      onChange={(e) => setRedZone(e.target.checked)}
                      className="mt-0.5 h-5 w-5 flex-shrink-0 rounded border-amber-300 text-[#E60000] focus:ring-[#E60000]"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-[#101010]">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        В задаче есть необратимые действия
                      </div>
                      <div className="mt-0.5 text-xs text-[#666]">
                        Отправка платежа, публикация, письмо клиенту — нужен контур контроля.
                      </div>
                    </div>
                  </label>

                  <button
                    onClick={submit}
                    disabled={submitting}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#E60000] px-6 py-3.5 text-base font-semibold text-white shadow-[0_10px_30px_-10px_rgba(230,0,0,0.6)] transition hover:bg-[#cc0000] disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Отправляем...
                      </>
                    ) : (
                      <>
                        Получить результат
                        <Sparkles className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </motion.div>
              )}

              {/* ============ RESULT ============ */}
              {step === 2 && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <div className="flex justify-center">
                    <Ring percent={percent} tone={band.tone} />
                  </div>

                  <div
                    className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${
                      band.tone === 'red'
                        ? 'bg-red-50 text-red-700'
                        : band.tone === 'green'
                        ? 'bg-green-50 text-green-700'
                        : band.tone === 'amber'
                        ? 'bg-amber-50 text-amber-700'
                        : band.tone === 'blue'
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-zinc-100 text-zinc-700'
                    }`}
                  >
                    {band.tone === 'red' && <AlertTriangle className="h-4 w-4" />}
                    {band.tone === 'green' && <Check className="h-4 w-4" strokeWidth={3} />}
                    {band.label}
                  </div>

                  <h2 className="mt-6 text-2xl font-semibold tracking-tight text-[#101010] sm:text-3xl">
                    Уровень зрелости: {level}/3
                  </h2>
                  <p className="mt-1 text-lg font-medium text-[#E60000]">{levelInfo.title}</p>
                  <p className="mx-auto mt-2 max-w-md text-sm text-[#666]">{levelInfo.description}</p>

                  <div className="mt-6 rounded-2xl border border-black/10 bg-[#f8f8f8] p-5 text-left">
                    <div className="mb-2 font-mono text-xs uppercase tracking-wider text-[#666]">
                      Что это значит для вас
                    </div>
                    <p className="text-[15px] leading-relaxed text-[#101010]">
                      {verdict(level, percent, redZone)}
                    </p>
                  </div>

                  <a
                    href={CONFIG.BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => fire('diagnostic_cta_click')}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#E60000] px-6 py-3.5 text-base font-semibold text-white shadow-[0_10px_30px_-10px_rgba(230,0,0,0.6)] transition hover:bg-[#cc0000]"
                  >
                    Записаться на разбор
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  <div className="mt-6 text-sm">
                    {submitResult === 'ok' && (
                      <div className="inline-flex items-center gap-2 text-green-700">
                        <CheckCircle2 className="h-4 w-4" />
                        Заявку получили — свяжемся в течение рабочего дня.
                      </div>
                    )}
                    {submitResult === 'err' && (
                      <div className="inline-flex items-center gap-2 text-amber-700">
                        <XCircle className="h-4 w-4" />
                        Результат посчитан. Если заявка не дошла — напишите в WhatsApp по кнопке выше.
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-[#999]">
          ko:agency · Интегратор amoCRM/Kommo · 9 лет на рынке · 200+ внедрений
        </div>
      </div>
    </section>
  );
}
