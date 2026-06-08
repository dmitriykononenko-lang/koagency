'use client';

import { Button } from './ui/button';
import { ArrowRight, Calculator, Check, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from '@/lib/router-shim';

import { CyberGrid } from './ui/cyber-grid';
import { GlitchText } from './ui/glitch-text';
import { CipherReveal } from './ui/cipher-reveal';
import { MagneticButton } from './ui/magnetic-button';

export function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } },
  };

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[80vh] flex items-center bg-[#f5f5f5]">
      {/* Tech Background */}
      <CyberGrid />

      {/* Background subtle gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#E60000]/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Split layout: text + mockup */}
        <div className="grid lg:grid-cols-12 gap-10 items-center mb-16">
          {/* Left: текст */}
          <div className="lg:col-span-7">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-black/10 shadow-sm mb-6 hover:border-[#E60000]/50 transition-colors cursor-default group"
            >
              <CipherReveal
                text="To create order"
                delay={0.5}
                className="text-xs sm:text-sm font-mono text-[#E60000] uppercase tracking-wider group-hover:text-[#ff0000]"
              />
              <div className="w-1 h-1 bg-[#E60000] rounded-full" />
              <CipherReveal
                text="Out of chaos"
                delay={1.5}
                className="text-xs sm:text-sm font-mono text-[#101010] uppercase tracking-wider"
              />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              className="mb-6 text-[#101010] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight"
            >
              Автоматизация продаж с{' '}
              <span className="relative inline-block">
                <GlitchText text="amoCRM, Kommo и AI" className="text-[#E60000]" enableInterval={true} />
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 1, ease: 'easeInOut' }}
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#E60000]/30"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                </motion.svg>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-[#666666] mb-6 max-w-2xl"
            >
              Внедряем CRM системы, настраиваем AI-квалификаторов для автоматического отбора клиентов
              и обеспечиваем техническую поддержку вашего бизнеса.
            </motion.p>

            {/* Trust badges inline — slider-ai стиль */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-x-5 gap-y-2 mb-7 text-sm text-[#101010]"
            >
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#E60000]" />
                <span className="font-medium">Партнёр amoCRM</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#E60000]" />
                <span className="font-medium">200+ внедрений</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#E60000]" />
                <span className="font-medium">9 лет на рынке</span>
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-4"
            >
              <MagneticButton>
                <Link to="/calculator" className="block">
                  <Button
                    size="lg"
                    className="group w-full sm:w-auto bg-[#E60000] hover:bg-[#cc0000] text-white relative overflow-hidden shadow-[0_0_20px_rgba(230,0,0,0.3)] hover:shadow-[0_0_30px_rgba(230,0,0,0.5)] transition-shadow duration-300"
                  >
                    <span className="relative z-10 flex items-center">
                      <Calculator className="w-4 h-4 mr-2" />
                      Рассчитать стоимость
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                  className="w-full sm:w-auto border-[#101010] text-[#101010] hover:bg-[#101010] hover:text-white transition-all"
                >
                  Получить консультацию
                </Button>
              </MagneticButton>
            </motion.div>

            {/* Price hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-sm text-[#666666]"
            >
              От <span className="font-semibold text-[#101010]">80 000 ₽</span> за внедрение под ключ
              · Точный расчёт за 1 минуту
            </motion.p>
          </div>

          {/* Right: мокап результата калькулятора */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            <Link to="/calculator" className="block group">
              <div className="relative bg-white rounded-3xl border border-black/8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.12)] overflow-hidden hover:shadow-[0_30px_80px_-20px_rgba(230,0,0,0.18)] transition-shadow duration-500">
                {/* Header bar */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-black/6 bg-[#fafafa]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                    <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                    <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="text-[10px] uppercase tracking-wider font-mono text-[#999]">
                    Калькулятор внедрения
                  </div>
                  <div className="w-12" />
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                  {/* Параметры */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#666]">amoCRM Профессиональный</span>
                      <span className="font-medium text-[#101010]">5 чел.</span>
                    </div>
                    <div className="h-px bg-black/5" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#666]">Интеграция с 1С</span>
                      <Check className="w-4 h-4 text-[#E60000]" />
                    </div>
                    <div className="h-px bg-black/5" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#666]">WhatsApp Business</span>
                      <Check className="w-4 h-4 text-[#E60000]" />
                    </div>
                    <div className="h-px bg-black/5" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#666]">Обучение команды</span>
                      <Check className="w-4 h-4 text-[#E60000]" />
                    </div>
                  </div>

                  {/* Результат */}
                  <div className="pt-4 border-t border-black/8">
                    <div className="text-xs uppercase tracking-wider text-[#999] mb-1 font-mono">
                      Итого под ключ
                    </div>
                    <div className="flex items-baseline justify-between">
                      <div className="text-3xl md:text-4xl font-bold text-[#101010] font-mono tracking-tight">
                        247 600 ₽
                      </div>
                      <div className="text-xs text-[#999]">≈ 2 недели</div>
                    </div>
                  </div>

                  {/* CTA внутри карточки */}
                  <div className="pt-2 flex items-center justify-between text-sm text-[#E60000] group-hover:text-[#cc0000] transition-colors">
                    <span className="font-medium">Посчитать для своего бизнеса</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* «Live» индикатор */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/30">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-green-700">
                    Live
                  </span>
                </div>
              </div>

              {/* Микро-tip под мокапом */}
              <div className="mt-3 text-center text-xs text-[#999] flex items-center justify-center gap-1.5">
                <Star className="w-3 h-3 text-[#E60000] fill-[#E60000]" />
                Реальные цены без скрытых платежей
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Stats (full-width row) */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto"
        >
          {[
            { value: '200+', label: 'Внедрений', sublabel: 'За 9 лет' },
            { value: '340%', label: 'Средний ROI', sublabel: 'За 6 месяцев' },
            { value: '24/7', label: 'Поддержка', sublabel: 'Без выходных' },
            { value: '15 мин', label: 'Ответ', sublabel: 'Время реакции' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{
                y: -5,
                borderColor: 'rgba(230,0,0,0.3)',
                boxShadow: '0 10px 30px -5px rgba(0,0,0,0.05)',
              }}
              className="bg-white border border-black/10 rounded-2xl p-4 shadow-sm transition-colors"
            >
              <div className="text-[#E60000] mb-1 font-mono text-xl sm:text-2xl font-semibold">
                {stat.value}
              </div>
              <div className="text-sm text-[#101010] font-medium">{stat.label}</div>
              <div className="text-xs text-[#999999] mt-0.5">{stat.sublabel}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust badges (без кликов, social proof line) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-10 flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-sm text-[#666666]"
        >
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>Гарантия 30 дней</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>Первый аудит бесплатно</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>Без предоплаты</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
