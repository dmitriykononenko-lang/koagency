'use client';

import { Link } from '@/lib/router-shim';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { Card } from '../ui/card';
import { casesList } from '@/data/cases';

export function CasesIndexPage() {
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
              200+ внедрений · 4 отраслевых кейса
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-3xl font-bold text-[#101010] sm:text-4xl lg:text-5xl"
          >
            Кейсы клиентов
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl text-base text-[#666666] sm:text-lg"
          >
            Реальные внедрения amoCRM, Kommo и AI-агентов в e-commerce, строительстве,
            образовании и B2B. Метрики, стек, сроки, отзывы.
          </motion.p>
        </div>
      </section>

      {/* Cases grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2">
            {casesList.map((c, idx) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <Link to={`/cases/${c.slug}`} className="block h-full">
                  <Card className="group h-full p-8 bg-white border-black/10 shadow-sm hover:shadow-lg hover:border-[#E60000]/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                    {/* Head */}
                    <div className="mb-6 flex items-start justify-between">
                      <div>
                        <div className="mb-1 font-mono text-xs uppercase tracking-wider text-[#999999]">
                          {c.industry}
                        </div>
                        <h2 className="text-xl font-semibold text-[#101010]">
                          {c.company}
                        </h2>
                      </div>
                      <ArrowUpRight className="h-6 w-6 text-[#666666] group-hover:text-[#E60000] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>

                    {/* Metrics row */}
                    <div className="mb-6 grid grid-cols-3 gap-3 border-t border-b border-black/5 py-4">
                      {[c.hero.metric1, c.hero.metric2, c.hero.metric3].map((m, i) => (
                        <div key={i}>
                          <div className="font-mono text-xl font-bold text-[#E60000] sm:text-2xl">
                            {m.value}
                          </div>
                          <div className="mt-1 text-xs text-[#666666]">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tagline */}
                    <div className="mb-4 flex items-start gap-2 text-sm text-[#101010]">
                      <TrendingUp className="h-4 w-4 shrink-0 text-[#E60000] mt-0.5" />
                      <span className="font-medium">{c.hero.tagline}</span>
                    </div>

                    <p className="mb-6 text-sm leading-relaxed text-[#666666]">
                      {c.hero.subtitle}
                    </p>

                    {/* Tags */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {c.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-[#f5f5f5] px-3 py-1 font-mono text-xs uppercase tracking-wide text-[#101010]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Foot */}
                    <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-4 text-xs text-[#666666]">
                      <span>Срок: {c.timeline}</span>
                      <span className="font-mono text-[#E60000]">{c.price}</span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-[#101010] sm:text-3xl">
            Хотите такие же результаты?
          </h2>
          <p className="mb-8 text-[#666666]">
            Первый аудит и техническое задание — бесплатно. Ответим на все вопросы и
            покажем, как это будет работать в вашем бизнесе.
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
    </div>
  );
}
