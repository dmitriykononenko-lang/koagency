'use client';

import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Loader2, Download, MessageCircle, Send } from 'lucide-react';
import { Link } from '@/lib/router-shim';
import { BRIEF_STEPS, CONTACT_STEP, STARTUP_CHECKLIST, type BriefField, type BriefStep } from '@/data/brief';

const STORAGE_KEY = 'koagency.brief.v1';
const WEBHOOK_URL = '/api/lead';

type AnswerValue = string | string[];
interface Answers {
  [fieldId: string]: AnswerValue;
}
interface State {
  answers: Answers;
  others: Record<string, string>;
  checklist: Record<string, boolean>;
}

const EMPTY: State = { answers: {}, others: {}, checklist: {} };

const ALL_STEPS: BriefStep[] = [...BRIEF_STEPS, CONTACT_STEP];

function loadState(): State {
  if (typeof window === 'undefined') return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    return { ...EMPTY, ...parsed };
  } catch {
    return EMPTY;
  }
}

export function BriefPage() {
  const [state, setState] = useState<State>(EMPTY);
  const [stepIdx, setStepIdx] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [leadId, setLeadId] = useState<number | null>(null);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, hydrated]);

  const step = ALL_STEPS[stepIdx];
  const progress = useMemo(() => Math.round(((stepIdx + 1) / ALL_STEPS.length) * 100), [stepIdx]);
  const isContactStep = stepIdx === ALL_STEPS.length - 1;

  function setAnswer(id: string, value: AnswerValue) {
    setState((s) => ({ ...s, answers: { ...s.answers, [id]: value } }));
  }
  function setOther(id: string, value: string) {
    setState((s) => ({ ...s, others: { ...s.others, [id]: value } }));
  }
  function toggleCheck(id: string) {
    setState((s) => ({ ...s, checklist: { ...s.checklist, [id]: !s.checklist[id] } }));
  }

  function validateStep(): string | null {
    for (const f of step.fields) {
      if (!f.required) continue;
      const v = state.answers[f.id];
      if (v === undefined || v === null) return `Заполните: «${f.label}»`;
      if (Array.isArray(v) && v.length === 0) return `Выберите хотя бы один вариант в «${f.label}»`;
      if (typeof v === 'string' && !v.trim()) return `Заполните: «${f.label}»`;
    }
    return null;
  }

  function next() {
    const err = validateStep();
    if (err) {
      setErrorMsg(err);
      return;
    }
    setErrorMsg('');
    setStepIdx((i) => Math.min(i + 1, ALL_STEPS.length - 1));
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function back() {
    setErrorMsg('');
    setStepIdx((i) => Math.max(i - 1, 0));
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function buildReport(): string {
    const lines: string[] = [];
    lines.push('БРИФ · внедрение amoCRM / Kommo');
    lines.push('Источник: koagency.me/brief');
    lines.push('Дата: ' + new Date().toLocaleString('ru-RU'));
    lines.push('');

    for (const s of BRIEF_STEPS) {
      lines.push(`${s.num}. ${s.title.toUpperCase()}`);
      for (const f of s.fields) {
        const v = state.answers[f.id];
        if (v === undefined || v === null) continue;
        const text = Array.isArray(v) ? v.join(', ') : String(v).trim();
        if (!text) continue;
        const other = state.others[f.id]?.trim();
        const full = other ? `${text}${text ? ', ' : ''}другое: ${other}` : text;
        lines.push(`  • ${f.label}`);
        lines.push(`    ${full}`);
      }
      lines.push('');
    }

    // Checklist
    const checked = STARTUP_CHECKLIST.filter((item) => state.checklist[item]);
    if (checked.length) {
      lines.push('ГОТОВО К СТАРТУ:');
      for (const c of checked) lines.push('  ✓ ' + c);
      lines.push('');
    }

    // Contacts
    const c = state.answers;
    lines.push('КОНТАКТЫ:');
    if (c.name) lines.push('  Имя: ' + c.name);
    if (c.company) lines.push('  Компания: ' + c.company);
    if (c.phone) lines.push('  Телефон: ' + c.phone);
    if (c.email) lines.push('  Email: ' + c.email);
    if (c.preferredChannel) lines.push('  Предпочитаемый канал: ' + c.preferredChannel);
    if (c.bestTime) lines.push('  Удобное время: ' + c.bestTime);
    return lines.join('\n');
  }

  async function submit() {
    const err = validateStep();
    if (err) {
      setErrorMsg(err);
      return;
    }
    setStatus('loading');
    setErrorMsg('');

    const name = String(state.answers.name || '').trim();
    const phone = String(state.answers.phone || '').trim();
    const email = String(state.answers.email || '').trim();
    const company = String(state.answers.company || '').trim();
    const mainTask = String(state.answers.q1_1 || '').trim().slice(0, 60) || 'внедрение CRM';

    const report = buildReport();

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          company,
          note: report,
          page: '/brief',
          leadTitle: `Бриф · ${company || name} · ${mainTask}`,
          tags: ['brief', 'kommo', 'amocrm'],
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; leadId?: number; error?: string };
      if (!res.ok || !data.ok) {
        setStatus('error');
        setErrorMsg(data.error || 'Не удалось отправить. Напишите на service@koagency.me — скопируйте бриф ниже.');
        return;
      }
      setLeadId(data.leadId ?? null);
      setStatus('success');
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch { /* ignore */ }
    } catch {
      setStatus('error');
      setErrorMsg('Нет связи с сервером. Напишите на service@koagency.me — скопируйте бриф ниже.');
    }
  }

  function downloadReport() {
    const blob = new Blob([buildReport()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `koagency-brief-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  if (status === 'success') {
    return <SuccessScreen leadId={leadId} onDownload={downloadReport} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-black/5 bg-[#f8f8f8]">
        <div className="mx-auto max-w-3xl px-4 pt-24 pb-6 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#666] hover:text-[#E60000]">
            <ArrowLeft className="h-4 w-4" />
            На главную
          </Link>
          <div className="mt-4 flex items-end justify-between gap-4">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-[#999]">
                Шаг {stepIdx + 1} из {ALL_STEPS.length}
              </div>
              <h1 className="mt-1 text-2xl font-bold text-[#101010] sm:text-3xl">{step.title}</h1>
              {step.description && <p className="mt-2 max-w-2xl text-sm text-[#666]">{step.description}</p>}
            </div>
            <div className="hidden text-right sm:block">
              <div className="text-xs text-[#999]">Прогресс</div>
              <div className="font-mono text-xl font-bold text-[#E60000]">{progress}%</div>
            </div>
          </div>
          <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-black/5">
            <motion.div
              className="h-full bg-[#E60000]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {step.fields.map((f) => (
              <FieldRow
                key={f.id}
                field={f}
                value={state.answers[f.id]}
                other={state.others[f.id] || ''}
                onChange={(v) => setAnswer(f.id, v)}
                onOtherChange={(v) => setOther(f.id, v)}
              />
            ))}

            {isContactStep && (
              <section className="rounded-2xl border border-black/10 bg-[#f8f8f8] p-6">
                <h3 className="mb-3 text-lg font-semibold text-[#101010]">Чеклист: что понадобится на старте</h3>
                <p className="mb-4 text-sm text-[#666]">
                  Отметьте, что у вас уже есть — так мы точнее оценим сроки.
                </p>
                <ul className="space-y-2">
                  {STARTUP_CHECKLIST.map((item) => (
                    <li key={item}>
                      <label className="flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2 hover:bg-white">
                        <input
                          type="checkbox"
                          checked={!!state.checklist[item]}
                          onChange={() => toggleCheck(item)}
                          className="mt-1 h-4 w-4 shrink-0 accent-[#E60000]"
                        />
                        <span className="text-sm text-[#333]">{item}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {errorMsg && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMsg}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/5 pt-6">
              <button
                type="button"
                onClick={back}
                disabled={stepIdx === 0}
                className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-sm text-[#333] transition-colors hover:bg-[#f5f5f5] disabled:opacity-30"
              >
                <ArrowLeft className="h-4 w-4" />
                Назад
              </button>
              {!isContactStep ? (
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center gap-2 rounded-full bg-[#E60000] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(230,0,0,0.25)] transition-shadow hover:shadow-[0_0_30px_rgba(230,0,0,0.45)]"
                >
                  Дальше
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={status === 'loading'}
                  className="inline-flex items-center gap-2 rounded-full bg-[#E60000] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(230,0,0,0.25)] transition-shadow hover:shadow-[0_0_30px_rgba(230,0,0,0.45)] disabled:opacity-60"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Отправляем…
                    </>
                  ) : (
                    <>
                      Отправить бриф
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              )}
            </div>

            <p className="text-[11px] text-[#999]">
              Нажимая «Отправить бриф», вы соглашаетесь с{' '}
              <a href="/privacy" className="text-[#E60000] hover:underline">
                политикой обработки данных
              </a>{' '}
              и даёте{' '}
              <a href="/legal/consent" className="text-[#E60000] hover:underline">
                согласие на обработку заявки
              </a>
              . Прогресс сохраняется в вашем браузере — можно закрыть и вернуться позже.
            </p>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Field row
// ---------------------------------------------------------------------------

function FieldRow({
  field,
  value,
  other,
  onChange,
  onOtherChange,
}: {
  field: BriefField;
  value: AnswerValue | undefined;
  other: string;
  onChange: (v: AnswerValue) => void;
  onOtherChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#101010]">
        {field.label}
        {field.required && <span className="ml-1 text-[#E60000]">*</span>}
      </label>
      {field.hint && <p className="mb-3 text-xs text-[#999]">{field.hint}</p>}

      {field.type === 'text' && (
        <input
          type="text"
          value={(value as string) || ''}
          placeholder={field.placeholder}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-[#101010] outline-none transition focus:border-[#E60000]"
        />
      )}
      {field.type === 'number' && (
        <input
          type="number"
          value={(value as string) || ''}
          placeholder={field.placeholder}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-[#101010] outline-none transition focus:border-[#E60000]"
        />
      )}
      {field.type === 'textarea' && (
        <textarea
          rows={4}
          value={(value as string) || ''}
          placeholder={field.placeholder}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
          className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-[#101010] outline-none transition focus:border-[#E60000]"
        />
      )}
      {field.type === 'radio' && field.options && (
        <div className="grid gap-2 sm:grid-cols-2">
          {field.options.map((opt) => {
            const checked = value === opt;
            return (
              <label
                key={opt}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                  checked ? 'border-[#E60000] bg-[#fff5f5] text-[#101010]' : 'border-black/15 bg-white text-[#333] hover:border-black/30'
                }`}
              >
                <input
                  type="radio"
                  name={field.id}
                  value={opt}
                  checked={checked}
                  onChange={() => onChange(opt)}
                  className="h-4 w-4 accent-[#E60000]"
                />
                {opt}
              </label>
            );
          })}
          {field.allowOther && (
            <input
              type="text"
              value={other}
              placeholder="Другое…"
              onChange={(e) => onOtherChange(e.target.value)}
              className="rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-[#101010] outline-none transition focus:border-[#E60000]"
            />
          )}
        </div>
      )}
      {field.type === 'checkboxes' && field.options && (
        <div className="grid gap-2 sm:grid-cols-2">
          {field.options.map((opt) => {
            const arr = Array.isArray(value) ? value : [];
            const checked = arr.includes(opt);
            return (
              <label
                key={opt}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                  checked ? 'border-[#E60000] bg-[#fff5f5] text-[#101010]' : 'border-black/15 bg-white text-[#333] hover:border-black/30'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => {
                    const next = checked ? arr.filter((x) => x !== opt) : [...arr, opt];
                    onChange(next);
                  }}
                  className="h-4 w-4 accent-[#E60000]"
                />
                {opt}
              </label>
            );
          })}
          {field.allowOther && (
            <input
              type="text"
              value={other}
              placeholder="Другое…"
              onChange={(e) => onOtherChange(e.target.value)}
              className="rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-[#101010] outline-none transition focus:border-[#E60000] sm:col-span-2"
            />
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Success screen
// ---------------------------------------------------------------------------

function SuccessScreen({ leadId, onDownload }: { leadId: number | null; onDownload: () => void }) {
  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 pt-32 pb-20 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#E60000]/10">
          <Check className="h-8 w-8 text-[#E60000]" />
        </div>
        <h1 className="mb-3 text-3xl font-bold text-[#101010] sm:text-4xl">Бриф получили — спасибо!</h1>
        <p className="mb-8 max-w-lg text-[#555]">
          В течение рабочего дня {leadId ? <>(сделка №{leadId}) </> : null}
          менеджер напишет вам в удобный канал. Пока — можете скачать копию брифа и записаться на обсуждение.
        </p>
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onDownload}
            className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-medium text-[#333] hover:bg-[#f0f0f0]"
          >
            <Download className="h-4 w-4" />
            Скачать копию брифа (.txt)
          </button>
          <a
            href="https://wa.me/447835212468"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:brightness-110"
          >
            <MessageCircle className="h-4 w-4" />
            Написать в WhatsApp
          </a>
          <a
            href="https://t.me/koagency_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#229ED9] px-6 py-3 text-sm font-semibold text-white hover:brightness-110"
          >
            <Send className="h-4 w-4" />
            Открыть Telegram
          </a>
        </div>
        <Link to="/" className="text-sm text-[#666] hover:text-[#E60000]">
          ← Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
