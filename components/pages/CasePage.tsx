'use client';

import { Link } from '@/lib/router-shim';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Check, Quote, TrendingUp } from 'lucide-react';
import { Card } from '../ui/card';
import type { CaseStudy } from '@/data/cases';
import { casesList } from '@/data/cases';

interface Props {
  caseStudy: CaseStudy;
}

export function CasePage({ caseStudy: c }: Props) {
  const otherCases = casesList.filter((x) => x.slug !== c.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="pt-24 px-4 sm:px-6 lg:px-8 bg-[#f5f5f5] border-b border-black/5">
        <div className="mx-auto max-w-5xl pb-4">
          <Link
            to="/cases"
            className="inline-flex items-center gap-2 text-sm text-[#666666] hover:text-[#E60000] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Все кейсы
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#f5f5f5] px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white border border-black/10 px-3 py-1.5 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E60000]" />
              <span className="font-mono text-xs uppercase tracking-wider text-[#101010]">
                {c.industry}
              </span>
            </div>

            <h1 className="mb-4 text-3xl font-bold text-[#101010] sm:text-4xl lg:text-5xl">
              {c.company}
            </h1>

            <p className="mb-3 text-lg font-semibold text-[#E60000] sm:text-xl">
              {c.hero.tagline}
            </p>

            <p className="mb-10 max-w-3xl text-base text-[#666666] sm:text-lg leading-relaxed">
              {c.hero.subtitle}
            </p>

            {/* Metrics */}
            <div className="grid gap-4 sm:grid-cols-3">
              {[c.hero.metric1, c.hero.metric2, c.hero.metric3].map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                >
                  <Card className="p-6 bg-white border-black/10 shadow-sm hover:shadow-md transition-shadow">
                    <div className="font-mono text-3xl font-bold text-[#E60000] sm:text-4xl">
                      {m.value}
                    </div>
                    <div className="mt-2 text-sm text-[#666666]">{m.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Challenge */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <div className="mb-3 font-mono text-xs uppercase tracking-wider text-[#999999]">
                Задача
              </div>
              <h2 className="text-2xl font-bold text-[#101010] sm:text-3xl">
                Что было до нас
              </h2>
            </div>
            <div className="md:col-span-2">
              <p className="mb-6 text-base leading-relaxed text-[#101010] sm:text-lg">
                {c.challenge}
              </p>
              <ul className="space-y-3">
                {c.challengeBullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#666666]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E60000]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f5f5f5]">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-3 mb-12">
            <div>
              <div className="mb-3 font-mono text-xs uppercase tracking-wider text-[#999999]">
                Решение
              </div>
              <h2 className="text-2xl font-bold text-[#101010] sm:text-3xl">
                Что сделали
              </h2>
            </div>
            <div className="md:col-span-2">
              <p className="text-base leading-relaxed text-[#101010] sm:text-lg">
                {c.solution}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {c.solutionSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Card className="p-6 bg-white border-black/10 shadow-sm">
                  <div className="flex gap-4">
                    <div className="shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E60000] font-mono text-sm font-bold text-white">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-[#101010]">{step.title}</h3>
                      <p className="text-sm leading-relaxed text-[#666666]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Stack */}
          <div className="mt-12">
            <div className="mb-4 font-mono text-xs uppercase tracking-wider text-[#999999]">
              Стек
            </div>
            <div className="flex flex-wrap gap-2">
              {c.stack.map((s, i) => (
                <span
                  key={i}
                  className="rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-medium text-[#101010]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <div className="mb-3 font-mono text-xs uppercase tracking-wider text-[#999999]">
                Результаты
              </div>
              <h2 className="text-2xl font-bold text-[#101010] sm:text-3xl">
                Что получили
              </h2>
            </div>
            <div className="md:col-span-2">
              <ul className="space-y-4">
                {c.results.map((r, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E60000]/10">
                      <Check className="h-4 w-4 text-[#E60000]" />
                    </div>
                    <span className="text-base text-[#101010]">{r}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#101010] text-white">
        <div className="mx-auto max-w-4xl">
          <Quote className="mb-6 h-10 w-10 text-[#E60000]" />
          <p className="mb-8 text-2xl font-medium leading-relaxed sm:text-3xl">
            {c.quote.text}
          </p>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E60000] font-mono text-lg font-bold text-white">
              {c.quote.author.charAt(0)}
            </div>
            <div>
              <div className="font-semibold">{c.quote.author}</div>
              <div className="text-sm text-white/70">
                {c.quote.role} · {c.company}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project details */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-6 bg-white border-black/10 shadow-sm text-center">
              <div className="mb-2 font-mono text-xs uppercase tracking-wider text-[#999999]">
                Срок
              </div>
              <div className="text-2xl font-bold text-[#101010]">{c.timeline}</div>
            </Card>
            <Card className="p-6 bg-white border-black/10 shadow-sm text-center">
              <div className="mb-2 font-mono text-xs uppercase tracking-wider text-[#999999]">
                Стоимость
              </div>
              <div className="text-2xl font-bold text-[#E60000]">{c.price}</div>
            </Card>
            <Card className="p-6 bg-white border-black/10 shadow-sm text-center">
              <div className="mb-2 font-mono text-xs uppercase tracking-wider text-[#999999]">
                Отрасль
              </div>
              <div className="text-2xl font-bold text-[#101010]">{c.industry}</div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f5f5f5]">
        <div className="mx-auto max-w-3xl text-center">
          <TrendingUp className="mx-auto mb-4 h-10 w-10 text-[#E60000]" />
          <h2 className="mb-4 text-2xl font-bold text-[#101010] sm:text-3xl">
            Обсудим ваш проект?
          </h2>
          <p className="mb-8 text-[#666666]">
            Первый аудит и техническое задание — бесплатно. Расскажем, как это будет
            работать именно в вашем бизнесе.
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#E60000] px-8 py-4 text-base font-semibold text-white shadow-[0_0_20px_rgba(230,0,0,0.3)] transition-shadow hover:bg-[#cc0000] hover:shadow-[0_0_30px_rgba(230,0,0,0.5)]"
          >
            Получить консультацию
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Other cases */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-2xl font-bold text-[#101010] sm:text-3xl">
            Другие кейсы
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {otherCases.map((o) => (
              <Link key={o.slug} to={`/cases/${o.slug}`} className="block">
                <Card className="group h-full p-6 bg-white border-black/10 shadow-sm hover:shadow-md hover:border-[#E60000]/30 transition-all">
                  <div className="mb-2 font-mono text-xs uppercase tracking-wider text-[#999999]">
                    {o.industry}
                  </div>
                  <h3 className="mb-3 font-semibold text-[#101010]">{o.company}</h3>
                  <p className="text-sm text-[#666666] mb-4 line-clamp-3">
                    {o.hero.tagline}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-[#E60000] group-hover:gap-3 transition-all">
                    Смотреть кейс
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
