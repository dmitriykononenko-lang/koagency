'use client';

import { Link } from '@/lib/router-shim';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ListChecks,
  BarChart3,
  Plug,
  Sparkles,
  Puzzle,
  type LucideIcon,
} from 'lucide-react';
import { Card } from '../ui/card';
import { widgetsList, type Widget } from '@/data/widgets';

const ICON_MAP: Record<string, LucideIcon> = {
  ListChecks,
  BarChart3,
  Plug,
  Sparkles,
  Puzzle,
};

const STATUS_LABEL: Record<Widget['status'], string> = {
  live: 'Доступен',
  beta: 'Beta',
  'coming-soon': 'Скоро',
};

const STATUS_STYLE: Record<Widget['status'], string> = {
  live: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  beta: 'bg-amber-50 text-amber-700 border-amber-200',
  'coming-soon': 'bg-black/5 text-[#666666] border-black/10',
};

export function WidgetsIndexPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Hero */}
      <section className="bg-white pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-black/5">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 shadow-sm mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#E60000]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#101010]">
              Виджеты KO:AGENCY для amoCRM и Kommo
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-3xl font-bold text-[#101010] sm:text-4xl lg:text-5xl"
          >
            Наши виджеты
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl text-base text-[#666666] sm:text-lg"
          >
            Собственные разработки для amoCRM и Kommo — устанавливаются в один клик
            через amoМаркет. 14 дней бесплатно, безлимит по пользователям, поддержка
            в Telegram.
          </motion.p>
        </div>
      </section>

      {/* Widgets grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2">
            {widgetsList.map((w, idx) => {
              const Icon = ICON_MAP[w.icon] ?? Puzzle;
              const disabled = w.status === 'coming-soon';
              const CardInner = (
                <Card
                  className={`group h-full p-8 bg-white border-black/10 shadow-sm transition-all duration-300 ${
                    disabled
                      ? 'opacity-70'
                      : 'cursor-pointer hover:shadow-lg hover:border-[#E60000]/30 hover:-translate-y-1'
                  }`}
                >
                  {/* Head */}
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E60000]/10 text-[#E60000]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="mb-1 font-mono text-xs uppercase tracking-wider text-[#999999]">
                          {w.platform}
                        </div>
                        <h2 className="text-xl font-semibold text-[#101010]">{w.title}</h2>
                      </div>
                    </div>
                    {!disabled && (
                      <ArrowUpRight className="h-6 w-6 text-[#666666] group-hover:text-[#E60000] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    )}
                  </div>

                  {/* Status + tagline */}
                  <div className="mb-4 flex items-center gap-2 flex-wrap">
                    <span
                      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLE[w.status]}`}
                    >
                      {STATUS_LABEL[w.status]}
                    </span>
                    <span className="text-[13px] text-[#666666]">{w.tagline}</span>
                  </div>

                  {/* Description */}
                  <p className="mb-5 text-sm text-[#444444] leading-relaxed">
                    {w.description}
                  </p>

                  {/* Bullets */}
                  <ul className="mb-6 space-y-2">
                    {w.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-[#333333]">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#E60000]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Footer row */}
                  <div className="flex items-end justify-between border-t border-black/5 pt-4">
                    <div>
                      <div className="font-mono text-lg font-bold text-[#101010]">
                        {w.price}
                      </div>
                      {w.priceNote && (
                        <div className="text-xs text-[#999999]">{w.priceNote}</div>
                      )}
                    </div>
                    <div className="flex gap-2 flex-wrap justify-end max-w-[60%]">
                      {w.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-black/5 px-2 py-1 text-[11px] font-medium text-[#666666]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              );

              return (
                <motion.div
                  key={w.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  {disabled ? (
                    <div className="block h-full">{CardInner}</div>
                  ) : (
                    <Link to={w.href} className="block h-full">
                      {CardInner}
                    </Link>
                  )}
                </motion.div>
              );
            })}

            {/* Placeholder "Скоро больше" */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: widgetsList.length * 0.05 }}
              className="md:col-span-2"
            >
              <Card className="flex flex-col items-center justify-center gap-3 p-10 bg-white border-dashed border-black/15 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 text-[#666666]">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-[#101010]">
                  Скоро — больше виджетов
                </h3>
                <p className="max-w-xl text-sm text-[#666666]">
                  Работаем над расширением каталога: BPMN-триггеры, AI-скоринг лидов,
                  аналитические дашборды, интеграции с 1С и мессенджерами. Хотите
                  предложить свой сценарий?
                </p>
                <Link
                  to="/support"
                  className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#E60000] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#c50000]"
                >
                  Написать нам
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Legal note */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center text-sm text-[#666666]">
          Использование любого виджета регулируется{' '}
          <Link to="/legal/offer" className="text-[#E60000] hover:underline">
            публичной офертой
          </Link>{' '}
          и{' '}
          <Link to="/legal/privacy" className="text-[#E60000] hover:underline">
            политикой конфиденциальности
          </Link>
          .
        </div>
      </section>
    </div>
  );
}
