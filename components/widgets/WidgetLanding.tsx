'use client';

import { Link } from '@/lib/router-shim';
import { ArrowUpRight, Check } from 'lucide-react';
import { PRIMARY_EMAIL } from '@/lib/contacts';
import { widgetsData } from '@/data/widgets';
import { AMO_MARKET_NOTE, AMO_MARKET_URL, widgetPages, type WidgetPageConfig } from '@/data/widgetPages';
import { WidgetDemo } from './WidgetDemos';

const idx = 'font-mono text-xs uppercase tracking-wider text-[#666]';

function SectionHead({ n, label, title, subtitle }: { n: string; label: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-10 grid gap-4 md:grid-cols-[4fr_8fr] md:items-end md:gap-10">
      <span className={idx}>
        <b className="font-medium text-[#E60000]">{n}</b> / {label}
      </span>
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-[#101010] sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-3 text-[#666]">{subtitle}</p>}
      </div>
    </div>
  );
}

function isExternal(href: string) {
  return href.startsWith('http');
}

export function WidgetLanding({ slug }: { slug: string }) {
  const w: WidgetPageConfig = widgetPages[slug];
  const ext = isExternal(w.installUrl);

  return (
    <div className="min-h-screen bg-white text-[#101010]">
      {/* Первый экран */}
      <section className="border-b border-black/5 bg-gradient-to-b from-[#fff7f7] to-white px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-[#666]">
              <Link to="/widgets" className="hover:text-[#E60000]">
                Виджеты
              </Link>{' '}
              / {w.name}
            </div>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E60000]" />
              <span className="font-mono text-[11px] uppercase tracking-wider">Виджет для amoCRM · {w.status}</span>
            </div>
            <h1 className="mt-5 mb-5 text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-[56px]">
              {w.titleStart}
              <span className="text-[#E60000]">{w.titleAccent}</span>
              {w.titleEnd}
            </h1>
            <p className="mb-7 max-w-xl text-lg leading-relaxed text-[#333]">{w.lead}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={w.installUrl}
                {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="inline-flex items-center gap-2 rounded-full bg-[#E60000] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_18px_-8px_rgba(230,0,0,0.6)] transition-colors hover:bg-[#c40000]"
              >
                {w.primaryCta}
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#how"
                className="inline-flex items-center rounded-full border-[1.5px] border-[#101010] px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-[#101010] hover:text-white"
              >
                Как это работает
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-[#666]">
              {w.checks.map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-[#E60000]" />
                  {c}
                </span>
              ))}
            </div>
          </div>
          <WidgetDemo kind={w.demo} />
        </div>
      </section>

      {/* Без виджета и с виджетом */}
      <section className="border-b border-black/5 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHead n="01" label="Зачем" title={w.why.title} subtitle={w.why.subtitle} />
          <div className="grid gap-4 md:grid-cols-2">
            {[w.why.bad, w.why.good].map(([title, items], i) => (
              <div key={title} className={`rounded-2xl bg-white p-7 ${i ? 'border-[1.5px] border-[#101010]' : 'border border-black/10'}`}>
                <span className={`font-mono text-[11px] uppercase ${i ? 'text-[#E60000]' : 'text-[#888]'}`}>
                  {i ? 'С виджетом' : 'Без виджета'}
                </span>
                <h3 className="mt-2 mb-4 text-xl font-semibold">{title}</h3>
                <ul className="space-y-2 text-[15px]">
                  {items.map((it) => (
                    <li key={it} className="flex gap-3">
                      <span className={i ? 'text-[#E60000]' : 'text-[#aaa]'}>{i ? '✓' : '–'}</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Возможности */}
      <section className="border-b border-black/5 bg-[#f5f5f5] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHead n="02" label="Возможности" title="Что умеет" />
          <div className="grid border-t border-l border-black/10 sm:grid-cols-2 lg:grid-cols-3">
            {w.features.map(([t, d], i) => (
              <div key={t} className="border-r border-b border-black/10 bg-white p-7 transition-colors hover:bg-[#fffafa]">
                <span className="font-mono text-[11px] text-[#E60000]">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 mb-2 text-[17px] font-semibold">{t}</h3>
                <p className="text-sm leading-relaxed text-[#666]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Шаги */}
      <section id="how" className="scroll-mt-24 border-b border-black/5 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHead n="03" label="Как начать" title="Три шага" />
          <div className="relative grid gap-8 md:grid-cols-3 md:gap-0">
            <div className="absolute top-4 right-0 left-0 hidden h-px bg-black/10 md:block" />
            {w.steps.map(([t, d], i) => (
              <div key={t} className="relative md:pr-8">
                <div
                  className={`mb-5 grid h-8 w-8 place-items-center rounded-full border-[1.5px] font-mono text-xs ${
                    i === 0 ? 'border-[#E60000] bg-[#E60000] text-white' : 'border-[#101010] bg-white'
                  }`}
                >
                  0{i + 1}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{t}</h3>
                <p className="text-sm text-[#666]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Стоимость */}
      <section className="border-b border-black/5 bg-[#f5f5f5] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            n="04"
            label="Стоимость"
            title={w.pricing.free ? 'Бесплатно' : w.pricing.plans ? 'Тарифы' : 'Цена в amoМаркете'}
            subtitle={w.pricing.note}
          />
          {w.pricing.free ? (
            <div className="rounded-2xl border border-black/10 border-l-4 border-l-[#E60000] bg-white p-7">
              <span className="font-mono text-[11px] uppercase text-[#888]">Без оплаты</span>
              <p className="mt-1 text-lg font-semibold">Виджет бесплатный: устанавливаете и пользуетесь без ограничений по сроку</p>
            </div>
          ) : w.pricing.plans ? (
            <>
              <div className="grid overflow-hidden rounded-2xl border border-black/10 bg-white md:grid-cols-3">
                {w.pricing.plans.map(([period, price, note], i) => (
                  <div
                    key={period}
                    className={`border-black/10 p-7 ${i < 2 ? 'border-b md:border-r md:border-b-0' : ''} ${i === 1 ? 'bg-[#101010] text-white' : ''}`}
                  >
                    <span className={`font-mono text-[11px] uppercase ${i === 1 ? 'text-[#aaa]' : 'text-[#888]'}`}>{period}</span>
                    <p className="mt-3 text-3xl font-bold tracking-tight">{price}</p>
                    <p className={`mt-1 text-sm ${i === 1 ? 'text-[#bbb]' : 'text-[#666]'}`}>{note}</p>
                  </div>
                ))}
              </div>
              {w.pricing.payNote && <p className="mt-3 text-sm text-[#666]">{w.pricing.payNote}</p>}
            </>
          ) : (
            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-black/10 border-l-4 border-l-[#E60000] bg-white p-7 sm:flex-row sm:items-center">
              <div>
                <span className="font-mono text-[11px] uppercase text-[#888]">Оплата через amoМаркет</span>
                <p className="mt-1 text-lg font-semibold">{AMO_MARKET_NOTE}</p>
              </div>
              <a
                href={AMO_MARKET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#E60000] px-5 py-3 text-sm font-semibold text-white hover:bg-[#c40000]"
              >
                Открыть amoМаркет <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          )}
          {w.data && (
            <div className="mt-5 rounded-2xl border border-black/10 bg-white p-7">
              <h3 className="mb-2 font-semibold">{w.data.title}</h3>
              <p className="text-sm leading-relaxed text-[#444]">{w.data.text}</p>
              {w.data.link && (
                <a href={w.data.link.href} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#E60000] hover:underline">
                  {w.data.link.label} <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Вопросы */}
      <section className="border-b border-black/5 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHead n="05" label="Вопросы" title="Частые вопросы" />
          <div className="border-t border-black/10">
            {w.faq.map(([q, a], i) => (
              <details key={q} open={i === 0} className="group border-b border-black/10 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[17px] font-semibold">
                  {q}
                  <span className="font-mono text-xl text-[#E60000] group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 max-w-3xl text-[15px] text-[#666]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Поддержка и другие виджеты */}
      <section id="support" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[7fr_5fr]">
          <div>
            <SectionHead n="06" label="Поддержка" title="Поддержка и документы" />
            <div className="border-t border-black/10">
              {w.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  {...(isExternal(l.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center justify-between border-b border-black/10 py-4 text-[15px] transition-colors hover:text-[#E60000]"
                >
                  {l.label}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ))}
              <a href={`mailto:${PRIMARY_EMAIL}`} className="flex items-center justify-between border-b border-black/10 py-4 text-[15px] hover:text-[#E60000]">
                Почта <span className="font-mono text-sm">{PRIMARY_EMAIL}</span>
              </a>
            </div>
          </div>
          <div>
            <span className={idx}>Другие виджеты</span>
            <div className="mt-4 grid gap-3">
              {w.related.map((s) => {
                const r = widgetsData[s];
                if (!r) return null;
                return (
                  <Link key={s} to={r.href} className="rounded-xl border border-black/10 p-5 transition-colors hover:border-[#101010]">
                    <span className="font-mono text-[10.5px] uppercase text-[#888]">{r.platform}</span>
                    <b className="mt-1 block">{r.title}</b>
                    <span className="text-sm text-[#666]">{r.tagline}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
