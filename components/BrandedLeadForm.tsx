'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * Кастомная форма лидогенерации в стиле ko:agency.
 * Функционально заменяет amoCRM-виджет форма 1717818.
 *
 * POST /api/lead → на бэке проксируется в amoCRM incoming leads form endpoint
 * (форма id=1717818, hash=1b51e584023ce7a2b1a6bfa546abf7d3).
 */
export function BrandedLeadForm({ className = '' }: { className?: string }) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const fd = new FormData(e.currentTarget);
    // Honeypot: если бот заполнил скрытое поле — молча "успех"
    if (fd.get('website')) {
      setStatus('success');
      return;
    }

    const payload = {
      name: String(fd.get('name') || '').trim(),
      phone: String(fd.get('phone') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      note: String(fd.get('note') || '').trim(),
      // UTM для аналитики
      utm: {
        source: new URLSearchParams(window.location.search).get('utm_source') || '',
        medium: new URLSearchParams(window.location.search).get('utm_medium') || '',
        campaign: new URLSearchParams(window.location.search).get('utm_campaign') || '',
      },
      page: window.location.pathname,
    };

    if (!payload.name || (!payload.phone && !payload.email)) {
      setStatus('error');
      setErrorMsg('Укажите имя и хотя бы один способ связи (телефон или email).');
      return;
    }

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error((await res.json()).error || `HTTP ${res.status}`);
      }
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Не удалось отправить. Попробуйте ещё раз.');
    }
  }

  return (
    <Card className={`p-8 bg-card border-border shadow-sm ${className}`}>
      <div className="mb-6">
        <h3 className="text-foreground font-semibold text-xl mb-1">Оставьте заявку</h3>
        <p className="text-sm text-muted-foreground">
          Ответим в течение 15 минут в рабочее время
        </p>
      </div>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-3 py-8 text-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h4 className="text-lg font-semibold text-foreground">Спасибо, заявка принята!</h4>
            <p className="text-sm text-muted-foreground max-w-sm">
              Мы уже видим её в amoCRM и свяжемся с вами в ближайшее время. Обычно это 15 минут в
              рабочее время.
            </p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="mt-2 text-sm text-[#E60000] hover:underline"
            >
              Оставить ещё одну
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-4"
            noValidate
          >
            {/* Honeypot — скрыто от людей, ловит ботов */}
            <div className="hidden" aria-hidden="true">
              <label>
                Website
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <Field
              label="ФИО"
              name="name"
              type="text"
              placeholder="Как к вам обращаться"
              required
              autoComplete="name"
            />

            <Field
              label="Телефон"
              name="phone"
              type="tel"
              placeholder="+7 000 000-00-00"
              autoComplete="tel"
            />

            <Field
              label="Email"
              name="email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
            />

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Задача или вопрос
              </label>
              <textarea
                name="note"
                rows={3}
                placeholder="Кратко опишите, что нужно"
                className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[#E60000] focus:outline-none focus:ring-2 focus:ring-[#E60000]/20 transition-colors resize-none"
              />
            </div>

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
              >
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="group relative inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#E60000] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#c50000] hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Отправляем…
                </>
              ) : (
                <>Оставить заявку</>
              )}
            </button>

            <p className="text-[11px] text-muted-foreground text-center pt-2">
              Нажимая кнопку, вы соглашаетесь с{' '}
              <a href="/legal/privacy" className="text-[#E60000] hover:underline">
                политикой конфиденциальности
              </a>
              .
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </Card>
  );
}

function Field(props: {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  const { label, name, type, placeholder, required, autoComplete } = props;
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-medium text-muted-foreground mb-1.5">
        {label} {required && <span className="text-[#E60000]">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[#E60000] focus:outline-none focus:ring-2 focus:ring-[#E60000]/20 transition-colors"
      />
    </div>
  );
}
