'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, AlertTriangle, Sparkles, Loader2, CheckCircle2, XCircle } from 'lucide-react';

// -----------------------------------------------------------------------------
// Config & constants
// -----------------------------------------------------------------------------

const CONFIG = {
  WEBHOOK_URL: '/api/lead',
  BOOKING_URL: 'https://wa.me/447835212468',
  SOURCE: 'Диагностика готовности к AI',
};

const MATURITY_STATEMENTS = [
  'Процессы описаны в документах, а не «в головах».',
  'Есть единый источник истины — документы не расходятся между отделами и версиями.',
  'Для ключевых задач описан стандарт результата.',
  'В процессах уже стабильно работает автоматизация или AI-агенты.',
  'Системы обмениваются результатами, видны действия, стоимость и ошибки.',
];

const LEVELS: Array<{ level: number; title: string; description: string }> = [
  { level: 0, title: 'В головах', description: 'Процессы существуют только в опыте сотрудников. Ничего не описано.' },
  { level: 1, title: 'В файлах', description: 'Есть документы и таблицы, но они разбросаны и не синхронизированы.' },
  { level: 2, title: 'Источник истины', description: 'Единый набор актуальных документов, доступный всем отделам.' },
  { level: 3, title: 'Первый агент', description: 'В процессе стабильно работает автоматизация или отдельный AI-агент.' },
  { level: 4, title: 'Связка агентов', description: 'Несколько агентов передают результаты друг другу, есть контроль.' },
  { level: 5, title: 'Система', description: 'Полноценная агентная система: видны действия, стоимость, ошибки, ROI.' },
];

const CRITERIA: Array<{ id: keyof Scores; label: string; hint: string }> = [
  { id: 'impact', label: 'Влияние', hint: 'Насколько результат этого процесса важен для выручки/маржи' },
  { id: 'frequency', label: 'Частота', hint: 'Как часто задача повторяется' },
  { id: 'standard', label: 'Стандарт результата', hint: 'Насколько чётко описан “правильный” ответ' },
  { id: 'data', label: 'Данные', hint: 'Полнота и качество входных данных для агента' },
  { id: 'measurability', label: 'Измеримость', hint: 'Можно ли посчитать успех/ошибку количественно' },
  { id: 'integration', label: 'Интеграции', hint: 'Легко ли подключиться к нужным системам' },
  { id: 'reversibility', label: 'Обратимость', hint: 'Можно ли откатить ошибку агента без потерь' },
  { id: 'adoption', label: 'Принятие', hint: 'Готовность команды использовать результат агента' },
];

type Scores = {
  impact: number;
  frequency: number;
  standard: number;
  data: number;
  measurability: number;
  integration: number;
  reversibility: number;
  adoption: number;
};

type Answer = 'yes' | 'part' | 'no' | null;

const initialScores: Scores = {
  impact: 3,
  frequency: 3,
  standard: 3,
  data: 3,
  measurability: 3,
  integration: 3,
  reversibility: 3,
  adoption: 3,
};

// -----------------------------------------------------------------------------
// Calculation logic (per ТЗ раздел 6)
// -----------------------------------------------------------------------------

function calcMaturityLevel(answers: Answer[]): number {
  let score = 0;
  for (const a of answers) {
    if (a === 'yes') score += 1;
    else if (a === 'part') {
      score += 0.5;
      break;
    } else {
      break;
    }
  }
  return Math.floor(score);
}

function calcTotalPercent(scores: Scores): number {
  const sum = Object.values(scores).reduce((a, b) => a + b, 0);
  return Math.round((sum / 40) * 100);
}

function calcBand(percent: number, redZone: boolean): { label: string; tone: 'red' | 'green' | 'amber' | 'neutral' | 'blue' } {
  if (redZone) return { label: 'Красная зона: нужен контур контроля', tone: 'red' };
  if (percent >= 70) return { label: 'Готов к пилоту', tone: 'green' };
  if (percent >= 50) return { label: 'Почти готов — доработать данные', tone: 'blue' };
  if (percent >= 30) return { label: 'Учебный стенд', tone: 'amber' };
  return { label: 'Рано: сначала подготовка', tone: 'neutral' };
}

function personalVerdict(level: number, percent: number, redZone: boolean): string {
  if (redZone) {
    return 'В задаче есть необратимые действия — начинать с полноценного AI-агента опасно. Первый шаг: описать процесс, добавить ручную проверку на критичных шагах и только потом подключать автономию.';
  }
  if (percent >= 70 && level >= 2) {
    return 'Отличная точка входа. Процессы описаны, данные есть, влияние понятно. Можно готовить пилот на 4–6 недель: сначала копилот, потом автономный агент.';
  }
  if (percent >= 50) {
    return 'Кандидат хороший, но нужно докрутить данные и стандарт результата. 1–2 недели подготовки — и можно запускать пилот в режиме копилота.';
  }
  if (percent >= 30) {
    return 'Пока рано для боевого агента, но подойдёт как учебный стенд: настроим процесс, соберём данные, обучим команду. Через 1–2 месяца можно возвращаться к пилоту.';
  }
  return 'Для этой задачи AI-агент сейчас не даст эффекта. Стоит сначала описать процесс, определить стандарт результата и собрать нормальные данные — это база, без которой агент только увеличит хаос.';
}

// -----------------------------------------------------------------------------
// UI primitives
// -----------------------------------------------------------------------------

function Ring({ percent, tone }: { percent: number; tone: string }) {
  const r = 62;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  const colorMap: Record<string, string> = {
    red: '#E60000',
    green: '#22c55e',
    amber: '#f59e0b',
    blue: '#3b82f6',
    neutral: '#71717a',
  };
  const color = colorMap[tone] || '#E60000';
  return (
    <svg width="160" height="160" viewBox="0 0 160 160" className="rotate-[-90deg]">
      <circle cx="80" cy="80" r={r} stroke="#f0f0f0" strokeWidth="12" fill="none" />
      <motion.circle
        cx="80"
        cy="80"
        r={r}
        stroke={color}
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
        initial={{ strokeDasharray: c, strokeDashoffset: c }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
      <text
        x="80"
        y="80"
        textAnchor="middle"
        dominantBaseline="central"
        className="rotate-90"
        transform="rotate(90 80 80)"
        style={{ fontSize: '28px', fontWeight: 700, fill: '#101010' }}
      >
        {percent}%
      </text>
    </svg>
  );
}

function Progress({ step, total }: { step: number; total: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/5">
      <motion.div
        className="h-full bg-[#E60000]"
        initial={{ width: 0 }}
        animate={{ width: `${(step / total) * 100}%` }}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main component
// -----------------------------------------------------------------------------

export function AIDiagnosticPage() {
  const [step, setStep] = useState(0); // 0=intro, 1=contact, 2=maturity, 3=first-agent, 4=result

  // Step 1 — contact + company
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [size, setSize] = useState('');
  const [niche, setNiche] = useState('');
  const [crm, setCrm] = useState('');

  // Step 2 — maturity
  const [answers, setAnswers] = useState<Answer[]>([null, null, null, null, null]);

  // Step 3 — first agent
  const [process, setProcess] = useState('');
  const [scores, setScores] = useState<Scores>(initialScores);
  const [redZone, setRedZone] = useState(false);

  // Submit state
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<'idle' | 'ok' | 'err'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [utm, setUtm] = useState<Record<string, string>>({});

  // Read UTM from query on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const captured: Record<string, string> = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((k) => {
      const v = params.get(k);
      if (v) captured[k] = v;
    });
    setUtm(captured);
    fireEvent('diagnostic_view');
  }, []);

  const maturityLevel = useMemo(() => calcMaturityLevel(answers), [answers]);
  const totalPercent = useMemo(() => calcTotalPercent(scores), [scores]);
  const band = useMemo(() => calcBand(totalPercent, redZone), [totalPercent, redZone]);
  const levelInfo = LEVELS[maturityLevel] || LEVELS[0];

  function fireEvent(name: string, params: Record<string, unknown> = {}) {
    if (typeof window === 'undefined') return;
    const w = window as any;
    if (typeof w.gtag === 'function') w.gtag('event', name, params);
    if (typeof w.ym === 'function') w.ym(112550385, 'reachGoal', name);
  }

  function validateStep1(): boolean {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Укажите имя';
    if (!company.trim()) e.company = 'Укажите компанию';
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) e.phone = 'Не менее 10 цифр';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Некорректный email';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2(): boolean {
    if (answers.some((a) => a === null)) {
      setErrors({ maturity: 'Ответьте на все 5 утверждений' });
      return false;
    }
    setErrors({});
    return true;
  }

  function validateStep3(): boolean {
    if (!process.trim()) {
      setErrors({ process: 'Опишите процесс-кандидат' });
      return false;
    }
    setErrors({});
    return true;
  }

  function next() {
    let ok = true;
    if (step === 1) ok = validateStep1();
    if (step === 2) ok = validateStep2();
    if (step === 3) ok = validateStep3();
    if (!ok) return;
    if (step === 1) fireEvent('diagnostic_step_1_done');
    if (step === 2) fireEvent('diagnostic_step_2_done');
    if (step === 3) submit();
    else setStep(step + 1);
    scrollTop();
  }

  function back() {
    setStep(Math.max(0, step - 1));
    scrollTop();
  }

  function scrollTop() {
    if (typeof window !== 'undefined') {
      document.getElementById('diag-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  async function submit() {
    if (submitting) return;
    setSubmitting(true);
    fireEvent('diagnostic_submit');

    const verdict = band.label;
    const noteLines = [
      `📋 ${CONFIG.SOURCE}`,
      '',
      `👤 Контакт: ${name}${position ? ` · ${position}` : ''}`,
      `🏢 Компания: ${company}${size ? ` · ${size}` : ''}${niche ? ` · ${niche}` : ''}`,
      crm ? `💼 Текущая CRM: ${crm}` : null,
      '',
      `📊 Уровень зрелости: ${maturityLevel}/5 — ${levelInfo.title}`,
      `   Ответы: ${answers.map((a, i) => `${i + 1}=${a}`).join(', ')}`,
      '',
      `🤖 Процесс-кандидат: ${process}`,
      `   Готовность: ${totalPercent}%`,
      `   Вердикт: ${verdict}${redZone ? ' · 🚨 Красная зона' : ''}`,
      '',
      `Оценки по критериям (1–5):`,
      ...CRITERIA.map((c) => `   ${c.label}: ${scores[c.id]}`),
      '',
      Object.keys(utm).length ? `UTM: ${JSON.stringify(utm)}` : null,
    ].filter(Boolean).join('\n');

    const payload = {
      name: `${name} · Диагностика AI (${totalPercent}%, ур.${maturityLevel})`,
      phone,
      email,
      note: noteLines,
      page: '/ai-diagnostic',
      utm: {
        source: utm.utm_source,
        medium: utm.utm_medium,
        campaign: utm.utm_campaign,
      },
      // Structured payload (per ТЗ 8.3) — endpoint пока кладёт в note, но данные под рукой
      diagnostic: {
        contact: { name, phone, email, position },
        company: { name: company, size, niche, crm },
        maturity: { level: maturityLevel, answers },
        firstAgent: { process, scores, totalPercent, redZone },
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
      if (r.ok) {
        setSubmitResult('ok');
        fireEvent('diagnostic_submit_success', { percent: totalPercent, level: maturityLevel });
      } else {
        setSubmitResult('err');
        fireEvent('diagnostic_submit_error');
      }
    } catch (e) {
      console.error('diagnostic submit failed', e);
      setSubmitResult('err');
      fireEvent('diagnostic_submit_error');
    } finally {
      setSubmitting(false);
      setStep(4);
      scrollTop();
    }
  }

  // ---------------------------------------------------------------------------
  // Render helpers
  // ---------------------------------------------------------------------------

  function Field({
    id,
    label,
    required,
    error,
    children,
  }: {
    id: string;
    label: string;
    required?: boolean;
    error?: string;
    children: React.ReactNode;
  }) {
    return (
      <div>
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-[#101010]">
          {label} {required && <span className="text-[#E60000]">*</span>}
        </label>
        {children}
        {error && <p className="mt-1 text-xs text-[#E60000]">{error}</p>}
      </div>
    );
  }

  const inputCls =
    'w-full rounded-lg border border-black/15 bg-white px-3 py-2.5 text-[15px] text-[#101010] outline-none focus:border-[#E60000] focus:ring-2 focus:ring-[#E60000]/15';

  // ---------------------------------------------------------------------------
  // Screens
  // ---------------------------------------------------------------------------

  const stepsTotal = 3;

  return (
    <section className="min-h-screen bg-[#f5f5f5] px-4 pb-20 pt-28 sm:px-6">
      <div className="mx-auto max-w-2xl">
        {/* Header pill */}
        <div className="mb-4 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#E60000]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#666]">
              Бесплатная диагностика · 5 минут
            </span>
          </div>
        </div>

        {/* Card */}
        <div
          id="diag-card"
          className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.15)]"
        >
          {/* Progress (только на шагах формы) */}
          {step > 0 && step < 4 && (
            <div className="border-b border-black/5 px-6 py-4 sm:px-8">
              <div className="mb-2 flex items-center justify-between text-xs text-[#666]">
                <span>
                  Шаг {step} из {stepsTotal}
                </span>
                <span>{Math.round((step / stepsTotal) * 100)}%</span>
              </div>
              <Progress step={step} total={stepsTotal} />
            </div>
          )}

          <div className="p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {/* ============================ INTRO ============================ */}
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
                    За 5 минут узнаете уровень зрелости процессов, определите первый процесс для
                    автономного агента и получите персональный вывод с планом действий.
                  </p>
                  <ul className="mt-6 space-y-2 text-sm text-[#101010]">
                    {[
                      'Уровень зрелости процессов по 5-балльной шкале',
                      'Готовность выбранного процесса к AI (в %)',
                      'Персональный вывод: пилот, стенд или подготовка',
                      'Что делать конкретно — с чего начать',
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
                      fireEvent('diagnostic_start');
                      setStep(1);
                      scrollTop();
                    }}
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#E60000] px-6 py-3.5 text-base font-semibold text-white shadow-[0_10px_30px_-10px_rgba(230,0,0,0.6)] transition hover:bg-[#cc0000] sm:w-auto"
                  >
                    Начать диагностику
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="mt-4 text-xs text-[#999]">
                    Данные не передаём третьим лицам. Результат вы получите на экране сразу.
                  </p>
                </motion.div>
              )}

              {/* ============================ STEP 1: contacts ============================ */}
              {step === 1 && (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="text-xl font-semibold text-[#101010] sm:text-2xl">О вас и компании</h2>
                  <p className="mt-1 text-sm text-[#666]">
                    Отправим итоговый отчёт и свяжемся, если попросите разбор.
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <Field id="name" label="Имя" required error={errors.name}>
                      <input id="name" className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Иван" />
                    </Field>
                    <Field id="company" label="Компания" required error={errors.company}>
                      <input id="company" className={inputCls} value={company} onChange={(e) => setCompany(e.target.value)} placeholder="ООО Ромашка" />
                    </Field>
                    <Field id="position" label="Роль">
                      <input id="position" className={inputCls} value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Собственник / РОП" />
                    </Field>
                    <Field id="phone" label="Телефон" required error={errors.phone}>
                      <input id="phone" type="tel" className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+7 900 000-00-00" />
                    </Field>
                    <Field id="email" label="Email" required error={errors.email}>
                      <input id="email" type="email" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.ru" />
                    </Field>
                    <Field id="size" label="Размер компании">
                      <select id="size" className={inputCls} value={size} onChange={(e) => setSize(e.target.value)}>
                        <option value="">— не выбрано —</option>
                        {['1–2', '3–9', '10–20', '20–50', '50+'].map((v) => (
                          <option key={v} value={v}>
                            {v} сотрудников
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field id="niche" label="Сфера бизнеса">
                      <input id="niche" className={inputCls} value={niche} onChange={(e) => setNiche(e.target.value)} placeholder="Например: продажа окон" />
                    </Field>
                    <Field id="crm" label="Текущая CRM">
                      <select id="crm" className={inputCls} value={crm} onChange={(e) => setCrm(e.target.value)}>
                        <option value="">— не выбрано —</option>
                        {['amoCRM / Kommo', 'Bitrix24', 'Другая', 'Нет CRM'].map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </motion.div>
              )}

              {/* ============================ STEP 2: maturity ============================ */}
              {step === 2 && (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="text-xl font-semibold text-[#101010] sm:text-2xl">Зрелость процессов</h2>
                  <p className="mt-1 text-sm text-[#666]">
                    Оцените 5 утверждений — считаем накопительно от простого к сложному.
                  </p>

                  <div className="mt-6 space-y-3">
                    {MATURITY_STATEMENTS.map((s, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-black/10 bg-white p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#E60000]/10 text-sm font-semibold text-[#E60000]">
                            {i + 1}
                          </div>
                          <p className="text-sm text-[#101010] sm:text-base">{s}</p>
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          {(
                            [
                              { v: 'yes', l: 'Да' },
                              { v: 'part', l: 'Частично' },
                              { v: 'no', l: 'Нет' },
                            ] as const
                          ).map((opt) => {
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
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.maturity && (
                    <p className="mt-3 text-sm text-[#E60000]">{errors.maturity}</p>
                  )}
                </motion.div>
              )}

              {/* ============================ STEP 3: first agent ============================ */}
              {step === 3 && (
                <motion.div
                  key="s3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="text-xl font-semibold text-[#101010] sm:text-2xl">Первый агент</h2>
                  <p className="mt-1 text-sm text-[#666]">
                    Выберите один конкретный процесс и оцените его по 8 критериям (1 — плохо, 5 — отлично).
                  </p>

                  <div className="mt-6">
                    <Field id="process" label="Процесс-кандидат" required error={errors.process}>
                      <input
                        id="process"
                        className={inputCls}
                        value={process}
                        onChange={(e) => setProcess(e.target.value)}
                        placeholder="Например: квалификация входящих лидов"
                      />
                    </Field>
                  </div>

                  <div className="mt-6 space-y-3">
                    {CRITERIA.map((c) => (
                      <div key={c.id} className="rounded-xl border border-black/10 bg-white p-4">
                        <div className="mb-2 flex items-baseline justify-between gap-4">
                          <div>
                            <div className="font-medium text-[#101010]">{c.label}</div>
                            <div className="text-xs text-[#999]">{c.hint}</div>
                          </div>
                          <div className="font-mono text-lg font-semibold text-[#E60000]">
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
                                className={`rounded-lg border py-2 text-sm font-medium transition ${
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

                  <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/50 p-4">
                    <input
                      type="checkbox"
                      checked={redZone}
                      onChange={(e) => setRedZone(e.target.checked)}
                      className="mt-0.5 h-5 w-5 flex-shrink-0 rounded border-amber-300 text-[#E60000] focus:ring-[#E60000]"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 font-medium text-[#101010]">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        В задаче есть необратимые действия
                      </div>
                      <div className="mt-0.5 text-xs text-[#666]">
                        Например: отправка платежа, публикация в проде, отправка письма клиенту. Если да —
                        нужен контур контроля перед автономией.
                      </div>
                    </div>
                  </label>
                </motion.div>
              )}

              {/* ============================ STEP 4: result ============================ */}
              {step === 4 && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <div className="flex justify-center">
                    <Ring percent={totalPercent} tone={band.tone} />
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
                    Уровень зрелости: {maturityLevel}/5
                  </h2>
                  <p className="mt-1 text-lg font-medium text-[#E60000]">{levelInfo.title}</p>
                  <p className="mx-auto mt-2 max-w-md text-sm text-[#666]">{levelInfo.description}</p>

                  <div className="mt-6 rounded-2xl border border-black/10 bg-[#f8f8f8] p-5 text-left">
                    <div className="mb-2 font-mono text-xs uppercase tracking-wider text-[#666]">
                      Что это значит для вас
                    </div>
                    <p className="text-[15px] leading-relaxed text-[#101010]">
                      {personalVerdict(maturityLevel, totalPercent, redZone)}
                    </p>
                  </div>

                  <a
                    href={CONFIG.BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => fireEvent('diagnostic_cta_click')}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#E60000] px-6 py-3.5 text-base font-semibold text-white shadow-[0_10px_30px_-10px_rgba(230,0,0,0.6)] transition hover:bg-[#cc0000]"
                  >
                    Записаться на разбор
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  {/* Submit status */}
                  <div className="mt-6 text-sm">
                    {submitResult === 'ok' && (
                      <div className="inline-flex items-center gap-2 text-green-700">
                        <CheckCircle2 className="h-4 w-4" />
                        Мы получили вашу заявку — свяжемся в течение рабочего дня.
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

            {/* Nav buttons — только на шагах 1–3 */}
            {step >= 1 && step <= 3 && (
              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={back}
                  disabled={submitting}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-[#666] transition hover:border-[#E60000]/30 hover:text-[#101010] disabled:opacity-50"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Назад
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#E60000] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#cc0000] disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Отправляем...
                    </>
                  ) : step === 3 ? (
                    <>
                      Получить результат
                      <Sparkles className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Далее
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer trust */}
        <div className="mt-6 text-center text-xs text-[#999]">
          ko:agency · Интегратор amoCRM/Kommo · 9 лет на рынке · 200+ внедрений
        </div>
      </div>
    </section>
  );
}
