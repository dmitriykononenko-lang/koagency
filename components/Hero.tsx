'use client';

import { Button } from './ui/button';
import {
  ArrowRight,
  Calculator,
  Check,
  Sliders,
  Sparkles,
  TrendingUp,
  Database,
  Headphones,
  Puzzle,
  GraduationCap,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from '@/lib/router-shim';

import { MagneticButton } from './ui/magnetic-button';
import { HandWrittenTitle } from './ui/hand-writing-text';
import DisplayCards from './ui/display-cards';

// Карточки-веер (21st.dev), наполнены реальными этапами ko:agency
const HERO_CARDS = [
  {
    icon: <Sliders className="size-4 text-white" />,
    title: 'Внедрение под ключ',
    description: 'amoCRM / Kommo за 2 недели',
    date: 'Этап 1',
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-4 text-white" />,
    title: 'AI-квалификация',
    description: 'Автоотбор горячих лидов',
    date: 'Этап 2',
    className:
      "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Puzzle className="size-4 text-white" />,
    title: 'Виджеты amoМаркета',
    description: 'Свои виджеты для CRM',
    date: 'Продукт',
    className:
      "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Database className="size-4 text-white" />,
    title: '1С · МойСклад',
    description: 'Двухсторонняя синхронизация',
    date: 'Интеграция',
    className:
      "[grid-area:stack] translate-x-48 translate-y-32 hover:translate-y-20 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <GraduationCap className="size-4 text-white" />,
    title: 'Обучение команды',
    description: 'База знаний и регламенты',
    date: 'Онбординг',
    className:
      "[grid-area:stack] translate-x-64 translate-y-40 hover:translate-y-28 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <TrendingUp className="size-4 text-white" />,
    title: '+47% конверсия',
    description: 'Измеримо за 30 дней',
    date: 'Результат',
    className: '[grid-area:stack] translate-x-80 translate-y-48 hover:translate-y-36',
  },
];

const STATS = [
  { value: '200+', label: 'Внедрений', sublabel: 'За 9 лет' },
  { value: '340%', label: 'Средний ROI', sublabel: 'За 6 месяцев' },
  { value: '24/7', label: 'Поддержка', sublabel: 'Без выходных' },
  { value: '15 мин', label: 'Ответ', sublabel: 'Время реакции' },
];

export function Hero() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-[#f5f5f5] px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      {/* Мягкий фирменный блик */}
      <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-[520px] w-[1000px] -translate-x-1/2 rounded-full bg-[#E60000]/[0.06] blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* ───── Left: текст ───── */}
          <div className="lg:col-span-7">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#E60000]" />
              <span className="font-mono text-xs uppercase tracking-wider text-[#101010] sm:text-sm">
                Партнёр amoCRM · 9 лет на рынке
              </span>
            </motion.div>

            {/* Headline с обводкой от руки */}
            <div className="-mx-4 mb-2 sm:-mx-2">
              <HandWrittenTitle
                title="Автоматизация продаж"
                className="!max-w-none !py-8 md:!py-10"
                titleClassName="text-[#101010] !text-4xl sm:!text-5xl lg:!text-6xl justify-center lg:justify-start lg:pl-2"
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-3xl font-semibold tracking-tight text-[#E60000] sm:text-4xl lg:text-5xl"
            >
              amoCRM · Kommo · AI
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-6 max-w-2xl text-base text-[#666666] sm:text-lg md:text-xl"
            >
              Внедряем CRM под ключ, настраиваем AI-квалификаторов для автоматического отбора
              клиентов и обеспечиваем техническую поддержку вашего бизнеса.
            </motion.p>

            {/* Trust badges inline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="mb-7 mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#101010]"
            >
              {['Партнёр amoCRM', '200+ внедрений', '9 лет на рынке'].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-[#E60000]" />
                  <span className="font-medium">{t}</span>
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="mb-4 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            >
              <MagneticButton>
                <Link to="/calculator" className="block">
                  <Button
                    size="lg"
                    className="group relative w-full overflow-hidden bg-[#E60000] text-white shadow-[0_0_20px_rgba(230,0,0,0.3)] transition-shadow duration-300 hover:bg-[#cc0000] hover:shadow-[0_0_30px_rgba(230,0,0,0.5)] sm:w-auto"
                  >
                    <span className="relative z-10 flex items-center">
                      <Calculator className="mr-2 h-4 w-4" />
                      Рассчитать стоимость
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </Button>
                </Link>
              </MagneticButton>

              <MagneticButton>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={scrollToContact}
                  className="w-full border-[#101010] text-[#101010] transition-all hover:bg-[#101010] hover:text-white sm:w-auto"
                >
                  Получить консультацию
                </Button>
              </MagneticButton>
            </motion.div>

            {/* Price hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="text-sm text-[#666666]"
            >
              От <span className="font-semibold text-[#101010]">80 000 ₽</span> за внедрение под
              ключ · Точный расчёт за 1 минуту
            </motion.p>
          </div>

          {/* ───── Right: веер карточек ───── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
            className="flex min-h-[320px] items-center justify-center lg:col-span-5"
          >
            <DisplayCards cards={HERO_CARDS} />
          </motion.div>
        </div>

        {/* ───── Stats row ───── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } },
              }}
              whileHover={{
                y: -5,
                borderColor: 'rgba(230,0,0,0.3)',
                boxShadow: '0 10px 30px -5px rgba(0,0,0,0.05)',
              }}
              className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm transition-colors"
            >
              <div className="mb-1 font-mono text-xl font-semibold text-[#E60000] sm:text-2xl">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-[#101010]">{stat.label}</div>
              <div className="mt-0.5 text-xs text-[#999999]">{stat.sublabel}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ───── Trust line ───── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-[#666666]"
        >
          {['Гарантия 30 дней', 'Первый аудит бесплатно', 'Без предоплаты'].map((t) => (
            <div key={t} className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>{t}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
