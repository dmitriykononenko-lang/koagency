'use client';

import { motion } from 'framer-motion';
import { Check, Award } from 'lucide-react';

const STATS = [
  { value: '2+ года', label: 'подключаем клиентов и сопровождаем интеграции' },
  { value: 'ТОП-10', label: 'среди партнёров Wazzup по СНГ' },
  { value: '1 день', label: 'на подключение Wazzup и настройку в CRM' },
];

const BENEFITS = [
  'Приоритетная поддержка от Wazzup',
  'Скидки на лицензии для клиентов',
  'Первый доступ к новым фичам',
];

export function WazzupPartner() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8">
      {/* Мягкий фон */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,211,102,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#f5f5f5] px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#666666]">
              Партнёрство
            </span>
          </div>
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-[#101010] sm:text-4xl lg:text-5xl">
            Мы — официальный партнёр{' '}
            <span className="whitespace-nowrap text-[#25D366]">Wazzup</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#666666] sm:text-lg">
            Подключаем WhatsApp, Telegram, Instagram, Avito и другие мессенджеры к amoCRM/Kommo
            через Wazzup — без танцев с бубном.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Карточка сертификата */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="relative h-full overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-br from-[#f8f8f8] to-white p-8 shadow-sm">
              {/* Wazzup badge */}
              <div className="mb-6 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-3 py-1 text-xs font-semibold text-white">
                  <Award className="h-3.5 w-3.5" />
                  Сертифицированный партнёр
                </div>
                <span className="font-mono text-xs text-[#999999]">№ WZ-2024-KO</span>
              </div>

              {/* Аватар + имя */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#E60000] to-[#8b0000] text-2xl font-bold text-white shadow-lg">
                    ДК
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#25D366]">
                    <Check className="h-4 w-4 text-white" strokeWidth={3} />
                  </div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-[#101010]">Дмитрий Кононенко</div>
                  <div className="text-sm text-[#666666]">Founder, ko:agency</div>
                  <div className="mt-1 font-mono text-xs uppercase tracking-wider text-[#25D366]">
                    Wazzup Partner
                  </div>
                </div>
              </div>

              {/* Подпись + Wazzup лого */}
              <div className="mt-6 flex items-end justify-between border-t border-dashed border-black/10 pt-6">
                <div>
                  <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-[#999999]">
                    Действителен до
                  </div>
                  <div className="font-mono text-sm text-[#101010]">31.12.2027</div>
                </div>
                <div className="flex items-center gap-1.5 text-xl font-bold tracking-tight">
                  <span className="text-[#25D366]">wa</span>
                  <span className="text-[#101010]">zzup!</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Правая колонка: статы + бенефиты */}
          <div className="lg:col-span-7">
            {/* Статы */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.value}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-colors hover:border-[#25D366]/40"
                >
                  <div className="mb-2 font-mono text-2xl font-bold text-[#E60000] sm:text-3xl">
                    {s.value}
                  </div>
                  <div className="text-sm leading-relaxed text-[#666666]">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Бенефиты партнёрства */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 rounded-2xl border border-black/10 bg-[#101010] p-8 text-white"
            >
              <div className="mb-4 font-mono text-xs uppercase tracking-widest text-[#25D366]">
                Что это даёт вам
              </div>
              <ul className="space-y-3">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#25D366]">
                      <Check className="h-3 w-3 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-sm text-white/90 sm:text-base">{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
