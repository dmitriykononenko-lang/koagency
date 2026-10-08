'use client';

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, ChevronDown, Clock, Loader2, Download, MessageCircle, Send } from 'lucide-react';
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
const TOTAL_FIELDS = ALL_STEPS.reduce((sum, s) => sum + s.fields.length, 0);
const SECONDS_PER_FIELD = 20;

function isAnswered(v: AnswerValue | undefined): boolean {
  if (v === undefined || v === null) return false;
  if (Array.isArray(v)) return v.length > 0;
  return String(v).trim().length > 0;
}

function filledIn(step: BriefStep, answers: Answers): number {
  return step.fields.reduce((acc, f) => acc + (isAnswered(answers[f.id]) ? 1 : 0), 0);
}

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
  const [stepsMenuOpen, setStepsMenuOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

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
  const isContactStep = stepIdx === ALL_STEPS.length - 1;

  const stepsFilled = useMemo(
    () => ALL_STEPS.map((s) => filledIn(s, state.answers)),
    [state.answers],
  );
  const totalFilled = useMemo(() => stepsFilled.reduce((a, b) => a + b, 0), [stepsFilled]);
  const progress = useMemo(
    () => Math.min(100, Math.round((totalFilled / TOTAL_FIELDS) * 100)),
    [totalFilled],
  );
  const minutesLeft = useMemo(() => {
    const left = Math.max(0, TOTAL_FIELDS - totalFilled);
    return Math.ceil((left * SECONDS_PER_FIELD) / 60);
  }, [totalFilled]);

  // Автофокус на первый текстовый элемент при переходе на шаг
  useEffect(() => {
    if (!hydrated) return;
    const t = window.setTimeout(() => {
      const el = cardRef.current?.querySelector<HTMLElement>(
        'input:not([type="checkbox"]):not([type="radio"]), textarea',
      );
      el?.focus({ preventScroll: true });
    }, 220);
    return () => window.clearTimeout(t);
  }, [stepIdx, hydrated]);

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

    // KEY ACCOUNT INFO (сверху — чтобы менеджер видел сразу)
    const kommoEmail = String(state.answers.kommoEmail || '').trim();
    if (kommoEmail) {
      lines.push('>>> EMAIL ДЛЯ СОЗДАНИЯ АККАУНТА KOMMO:');
      lines.push('    ' + kommoEmail);
      lines.push('');
    }

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
    if (c.country) lines.push('  Страна / TZ: ' + c.country);
    if (c.phone) lines.push('  Телефон: ' + c.phone);
    if (c.email) lines.push('  Email для связи: ' + c.email);
    if (c.kommoEmail) lines.push('  Email для Kommo: ' + c.kommoEmail);
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
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f6f7fa] to-[#eef0f3]">
      {/* Top bar: лого + таймер + прогресс */}
      <div className="sticky top-0 z-30 border-b border-black/5 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E60000]">
              <span className="font-mono text-sm font-bold text-white">ko</span>
            </div>
            <span className="font-mono text-sm text-[#101010]">ko:agency&nbsp;·&nbsp;brief</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-xs text-[#666]">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#999]" />
              {minutesLeft === 0 ? 'готово!' : `≈${minutesLeft} мин`}
            </span>
            <span className="hidden sm:inline text-[#ccc]">·</span>
            <span className="hidden sm:inline">
              Шаг {stepIdx + 1}&thinsp;/&thinsp;{ALL_STEPS.length}
            </span>
          </div>
        </div>
        <div className="h-1 w-full bg-black/5">
          <motion.div
            className="h-full bg-[#E60000]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>

        {/* Mobile: dropdown-список шагов для быстрой навигации */}
        <div className="border-t border-black/5 bg-white lg:hidden">
          <button
            onClick={() => setStepsMenuOpen((o) => !o)}
            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-[#101010] sm:px-6"
          >
            <span className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E60000] text-[10px] font-semibold text-white">
                {step.num}
              </span>
              {step.title}
            </span>
            <ChevronDown className={`h-4 w-4 text-[#999] transition-transform ${stepsMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {stepsMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden border-t border-black/5 bg-[#fafafa]"
              >
                <div className="px-2 py-2 sm:px-4">
                  <StepList
                    steps={ALL_STEPS}
                    stepIdx={stepIdx}
                    stepsFilled={stepsFilled}
                    onPick={(i) => {
                      setStepIdx(i);
                      setStepsMenuOpen(false);
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10 lg:py-14 lg:px-8">
        {/* Sidebar: список шагов (desktop only) */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-1">
            <div className="mb-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[#999]">
              <span>Разделы брифа</span>
              <span>{totalFilled}/{TOTAL_FIELDS}</span>
            </div>
            <StepList
              steps={ALL_STEPS}
              stepIdx={stepIdx}
              stepsFilled={stepsFilled}
              onPick={(i) => setStepIdx(i)}
            />
          </div>
        </aside>

        {/* Main card */}
        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              ref={cardRef}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="rounded-3xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_40px_-12px_rgba(0,0,0,0.08)] ring-1 ring-black/5"
            >
              <div className="border-b border-black/5 px-6 py-6 sm:px-10 sm:py-8">
                <div className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#E60000]">
                  <span>Раздел {step.num}</span>
                  <span className="text-[#ccc]">·</span>
                  <span className="text-[#999]">{progress}% заполнено</span>
                </div>
                <h1 className="text-2xl font-bold text-[#101010] sm:text-3xl">{step.title}</h1>
                {step.description && (
                  <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#666]">{step.description}</p>
                )}
              </div>

              <div className="space-y-8 px-6 py-8 sm:px-10 sm:py-10">
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
                  <section className="rounded-2xl border border-dashed border-[#E60000]/30 bg-[#fff8f8] p-6">
                    <h3 className="mb-2 text-base font-semibold text-[#101010]">
                      Чеклист: что готово к старту
                    </h3>
                    <p className="mb-4 text-sm text-[#666]">
                      Отметьте, что уже есть — так мы точнее оценим сроки первого этапа.
                    </p>
                    <ul className="space-y-1.5">
                      {STARTUP_CHECKLIST.map((item) => {
                        const checked = !!state.checklist[item];
                        return (
                          <li key={item}>
                            <label
                              className={`flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 transition ${
                                checked ? 'bg-white' : 'hover:bg-white/60'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleCheck(item)}
                                className="mt-0.5 h-4 w-4 shrink-0 accent-[#E60000]"
                              />
                              <span className="text-sm text-[#333]">{item}</span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                )}

                {errorMsg && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {errorMsg}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 rounded-b-3xl border-t border-black/5 bg-[#fafafa] px-6 py-5 sm:px-10">
                <button
                  type="button"
                  onClick={back}
                  disabled={stepIdx === 0}
                  className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-5 py-2.5 text-sm font-medium text-[#333] transition-colors hover:bg-[#f0f0f0] disabled:opacity-30"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Назад
                </button>
                {!isContactStep ? (
                  <button
                    type="button"
                    onClick={next}
                    className="inline-flex items-center gap-2 rounded-full bg-[#E60000] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(230,0,0,0.6)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-8px_rgba(230,0,0,0.75)]"
                  >
                    Дальше
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submit}
                    disabled={status === 'loading'}
                    className="inline-flex items-center gap-2 rounded-full bg-[#E60000] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(230,0,0,0.6)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-8px_rgba(230,0,0,0.75)] disabled:opacity-60"
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
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#999]">
            <p>
              Нажимая «Отправить бриф», вы соглашаетесь с{' '}
              <a href="/privacy" className="text-[#E60000] hover:underline">
                политикой обработки данных
              </a>{' '}
              и даёте{' '}
              <a href="/legal/consent" className="text-[#E60000] hover:underline">
                согласие на обработку заявки
              </a>
              .
            </p>
            <p className="font-mono">⌁ прогресс сохраняется в вашем браузере</p>
          </div>
        </main>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step list (sidebar / mobile dropdown)
// ---------------------------------------------------------------------------

function StepList({
  steps,
  stepIdx,
  stepsFilled,
  onPick,
}: {
  steps: BriefStep[];
  stepIdx: number;
  stepsFilled: number[];
  onPick: (i: number) => void;
}) {
  return (
    <div className="space-y-1">
      {steps.map((s, i) => {
        const active = i === stepIdx;
        const filled = stepsFilled[i];
        const total = s.fields.length;
        const complete = filled === total && total > 0;
        return (
          <button
            key={s.id}
            onClick={() => onPick(i)}
            className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
              active ? 'bg-[#E60000]/10 text-[#101010]' : 'text-[#555] hover:bg-black/5'
            }`}
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold transition ${
                active
                  ? 'bg-[#E60000] text-white'
                  : complete
                    ? 'bg-[#E60000]/15 text-[#E60000]'
                    : filled > 0
                      ? 'bg-black/15 text-[#333]'
                      : 'bg-black/8 text-[#999]'
              }`}
            >
              {complete ? <Check className="h-3 w-3" /> : s.num}
            </span>
            <span className="flex-1 leading-tight">{s.title}</span>
            <span
              className={`font-mono text-[10px] tabular-nums ${
                active ? 'text-[#E60000]' : complete ? 'text-[#E60000]/70' : 'text-[#aaa]'
              }`}
            >
              {filled}/{total}
            </span>
          </button>
        );
      })}
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
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 pt-24 pb-20 text-center sm:pt-32">
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#E60000]/10 ring-8 ring-[#E60000]/5">
          <Check className="h-10 w-10 text-[#E60000]" />
        </div>
        <h1 className="mb-3 text-3xl font-bold text-[#101010] sm:text-4xl">Бриф получили — спасибо!</h1>
        <p className="mb-10 max-w-lg text-[15px] leading-relaxed text-[#555]">
          В течение рабочего дня {leadId ? <>(сделка №{leadId}) </> : null}
          менеджер напишет вам в удобный канал.
          Созвон будет уже по сути — все детали из брифа.
        </p>
        <div className="flex w-full max-w-md flex-col gap-3">
          <button
            onClick={onDownload}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-white px-6 py-3.5 text-sm font-medium text-[#333] hover:bg-[#f0f0f0]"
          >
            <Download className="h-4 w-4" />
            Скачать копию брифа (.txt)
          </button>
          <a
            href="https://wa.me/447835212468"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(37,211,102,0.6)] hover:brightness-110"
          >
            <MessageCircle className="h-4 w-4" />
            Написать в WhatsApp
          </a>
          <a
            href="https://t.me/koagency_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#229ED9] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(34,158,217,0.6)] hover:brightness-110"
          >
            <Send className="h-4 w-4" />
            Открыть Telegram
          </a>
        </div>
      </div>
    </div>
  );
}
