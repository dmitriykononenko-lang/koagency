'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@/lib/router-shim';
import { SpotlightCard } from '../ui/spotlight-card';
import { GlitchText } from '../ui/glitch-text';
import { CipherReveal } from '../ui/cipher-reveal';
import { MagneticButton } from '../ui/magnetic-button';
import { GridBackground } from '../ui/grid-background';
import { SEOHead } from '../SEO/SEOHead';
import { 
  Building2, 
  Shield, 
  Zap, 
  Users, 
  Lock, 
  Headphones,
  Rocket,
  Code,
  CheckCircle2,
  ArrowRight,
  Trophy,
  Target,
  Gauge,
  Network,
  Star,
  Quote,
  Check,
  X,
  ChevronDown,
  Award,
  FileCheck,
  ShieldCheck,
  TrendingUp,
  Clock,
  Sparkles
} from 'lucide-react';
import { cn } from '../ui/utils';

export function EnterprisePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const enterpriseFeatures = [
    {
      title: "Мульти-холдинговая структура",
      desc: "Централизованное управление CRM для нескольких компаний с раздельной аналитикой и единым контролем.",
      icon: Building2
    },
    {
      title: "Повышенная безопасность",
      desc: "Корпоративный SSO, двухфакторная аутентификация, аудит действий и шифрование данных.",
      icon: Shield
    },
    {
      title: "Выделенный сервер",
      desc: "Приватная инфраструктура с гарантией 99.99% uptime и приоритетной технической поддержкой.",
      icon: Zap
    },
    {
      title: "Безлимитные пользователи",
      desc: "Без ограничений по количеству сотрудников. Расширяйте команду без доплат за лицензии.",
      icon: Users
    },
    {
      title: "Кастомная разработка",
      desc: "API-интеграции с 1С, SAP, корпоративными порталами и legacy-системами.",
      icon: Code
    },
    {
      title: "Dedicated Success Team",
      desc: "Персональный менеджер проекта + техлид. Ответ на обращение в течение 15 минут.",
      icon: Headphones
    }
  ];

  const benefits = [
    {
      icon: Trophy,
      title: "Масштабируемость",
      desc: "От 50 до 5000+ пользователей"
    },
    {
      icon: Target,
      title: "Точность прогнозов",
      desc: "AI-модели на ваших данных"
    },
    {
      icon: Gauge,
      title: "SLA 99.99%",
      desc: "Гарантированная доступность"
    },
    {
      icon: Network,
      title: "Интеграции",
      desc: "Подключение любых систем"
    }
  ];

  const steps = [
    {
      num: "01",
      title: "Discovery Session",
      desc: "Глубокий аудит текущих процессов и выявление точек роста"
    },
    {
      num: "02",
      title: "Архитектура решения",
      desc: "Проектирование инфраструктуры с учетом нагрузки и требований безопасности"
    },
    {
      num: "03",
      title: "Поэтапное внедрение",
      desc: "Пилот на отделе → масштабирование на холдинг с минимизацией рисков"
    },
    {
      num: "04",
      title: "Continuous Optimization",
      desc: "Ежеквартальные ревью и доработки на основе метрик использования"
    }
  ];

  const caseStudies = [
    {
      company: "Ритейл-холдинг",
      industry: "Розничная торговля",
      users: "850+ пользователей",
      result: "+47% конверсия в сделку",
      period: "за 6 месяцев",
      quote: "Полностью автоматизировали процессы продаж в 12 магазинах",
      author: "Михаил Петров",
      role: "Коммерческий директор"
    },
    {
      company: "Телеком-оператор",
      industry: "Телекоммуникации",
      users: "1200+ пользователей",
      result: "−62% время обработки",
      period: "заявок",
      quote: "Окупилось за 4 месяца благодаря оптимизации бизнес-процессов",
      author: "Елена Смирнова",
      role: "Head of Operations"
    },
    {
      company: "Финтех-стартап",
      industry: "Финансовые услуги",
      users: "320+ пользователей",
      result: "×3.4 рост выручки",
      period: "в первый год",
      quote: "Идеальное решение для быстрорастущего бизнеса с высокими требованиями",
      author: "Дмитрий Волков",
      role: "CEO & Founder"
    }
  ];

  const stats = [
    { value: "2500+", label: "Пользователей обслужено" },
    { value: "99.99%", label: "Гарантированный uptime" },
    { value: "15 мин", label: "Время ответа поддержки" },
    { value: "50+", label: "Enterprise клиентов" }
  ];

  const trustBadges = [
    { icon: ShieldCheck, title: "ISO 27001", desc: "Сертифицирован" },
    { icon: FileCheck, title: "SOC 2 Type II", desc: "Проверка пройдена" },
    { icon: Lock, title: "GDPR", desc: "Соответствие" },
    { icon: Award, title: "99.99% SLA", desc: "Гарантия" }
  ];

  const comparisonFeatures = [
    { name: "Количество пользователей", business: "До 50", enterprise: "Безлимитно" },
    { name: "Выделенный сервер", business: false, enterprise: true },
    { name: "Приоритетная поддержка", business: "Email", enterprise: "24/7 Dedicated team" },
    { name: "Кастомные интеграции", business: "Ограничено", enterprise: "Unlimited" },
    { name: "SLA гарантия", business: "95%", enterprise: "99.99%" },
    { name: "On-site обучение", business: false, enterprise: true },
    { name: "Персональный менеджер", business: false, enterprise: true },
    { name: "API Rate Limit", business: "1000/час", enterprise: "Unlimited" }
  ];

  const faqs = [
    {
      q: "Какой минимальный срок контракта для Enterprise?",
      a: "Минимальный срок контракта — 12 месяцев. Это позволяет полностью реализовать потенциал системы и обеспечить ROI."
    },
    {
      q: "Возможна ли кастомизация под наши специфические процессы?",
      a: "Да, Enterprise пакет включает полную кастомизацию. Мы адаптируем систему под ваши уникальные бизнес-процессы, включая разработку специальных модулей и интеграций."
    },
    {
      q: "Как происходит миграция данных из текущей системы?",
      a: "Миграция включена в Enterprise пакет. Наша команда проведет полный аудит данных, разработает план миграции и выполнит перенос с минимальным простоем в работе."
    },
    {
      q: "Что входит в SLA 99.99%?",
      a: "SLA гарантирует доступность системы 99.99% времени (максимум 52 минуты простоя в год). При нарушении — финансовая компенсация согласно договору."
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      <SEOHead
        title="Enterprise CRM решения для холдингов | ko:agency"
        description="Корпоративная инфраструктура CRM для холдингов и крупного бизнеса. Выделенная поддержка 24/7, безлимитные интеграции, SLA 99.99%. От 50 до 5000+ пользователей."
        keywords="enterprise crm, корпоративная crm, внедрение crm для холдингов, crm для крупного бизнеса, amocrm enterprise, корпоративное решение crm"
      />
      
      <GridBackground 
        className="opacity-10 -z-10 fixed inset-0"
        highlightedSquares={[[8, 8], [8, 9], [25, 12], [26, 12]]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center mb-32 mt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
          >
            <Building2 className="w-4 h-4 text-[#E60000]" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Enterprise Solutions</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight text-slate-900 dark:text-white">
            <GlitchText text="Enterprise" className="text-[#E60000]" /> <br className="hidden md:block" />
            <span className="text-slate-400">CRM Ecosystem</span>
          </h1>
          
          <div className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#E60000]/10 border border-[#E60000]/20"
                >
                  <Shield className="w-4 h-4 text-[#E60000]" />
                  <span className="font-medium text-slate-900 dark:text-white">Полный контроль</span>
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#E60000]/10 border border-[#E60000]/20"
                >
                  <Lock className="w-4 h-4 text-[#E60000]" />
                  <span className="font-medium text-slate-900 dark:text-white">Максимальная безопасность</span>
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#E60000]/10 border border-[#E60000]/20"
                >
                  <TrendingUp className="w-4 h-4 text-[#E60000]" />
                  <span className="font-medium text-slate-900 dark:text-white">Неограниченный масштаб</span>
                </motion.span>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-center"
              >
                <CipherReveal 
                  text="Корпоративное решение для холдингов и компаний с распределенной структурой"
                  scrambleSpeed={20}
                />
              </motion.p>
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/calculator-amocrm">
              <MagneticButton className="bg-[#E60000] text-white px-8 py-4 rounded-xl font-medium hover:bg-[#cc0000] transition-colors inline-flex items-center gap-2">
                Рассчитать стоимость <ArrowRight className="w-5 h-5" />
              </MagneticButton>
            </Link>
            <MagneticButton className="bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white px-8 py-4 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-white/10 transition-colors border border-slate-200 dark:border-white/10">
              Запросить презентацию
            </MagneticButton>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#E60000] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white">
              Сертификаты и соответствия
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Соответствуем международным стандартам безопасности
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBadges.map((badge, i) => (
              <SpotlightCard key={i} spotlightColor="rgba(230, 0, 0, 0.1)">
                <div className="p-6 text-center">
                  <badge.icon className="w-10 h-10 text-[#E60000] mx-auto mb-3" />
                  <div className="font-bold text-slate-900 dark:text-white mb-1">
                    {badge.title}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    {badge.desc}
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </motion.div>

        {/* Enterprise Features Grid */}
        <div className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              Возможности уровня <GlitchText text="Enterprise" className="text-[#E60000]" />
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Архитектура для компаний, которые не идут на компромиссы
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enterpriseFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <SpotlightCard className="h-full" spotlightColor="rgba(230, 0, 0, 0.15)">
                  <div className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-[#E60000]/10 flex items-center justify-center mb-4 text-[#E60000]">
                      <feature.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                    {hoveredFeature === i && (
                      <div className="mt-4">
                        <MagneticButton className="bg-[#E60000] text-white px-4 py-2 rounded-xl font-medium hover:bg-[#cc0000] transition-colors inline-flex items-center gap-2 text-sm">
                          Узнать подробнее <ArrowRight className="w-5 h-5" />
                        </MagneticButton>
                      </div>
                    )}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {benefits.map((benefit, i) => (
              <SpotlightCard key={i} spotlightColor="rgba(230, 0, 0, 0.1)">
                <div className="p-6 text-center">
                  <benefit.icon className="w-8 h-8 text-[#E60000] mx-auto mb-3" />
                  <div className="font-bold text-slate-900 dark:text-white mb-1">
                    {benefit.title}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    {benefit.desc}
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </motion.div>

        {/* Implementation Process */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              Процесс внедрения
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Методология, проверенная на сложных проектах
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <SpotlightCard className="h-full" spotlightColor="rgba(230, 0, 0, 0.15)">
                  <div className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="text-5xl font-bold text-[#E60000]/20 dark:text-[#E60000]/30 select-none">
                        {step.num}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                          {step.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Case Studies */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              <GlitchText text="Кейсы" className="text-[#E60000]" /> Enterprise-клиентов
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Результаты, которые говорят сами за себя
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((caseItem, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <SpotlightCard className="h-full" spotlightColor="rgba(230, 0, 0, 0.2)">
                  <div className="p-6">
                    <div className="text-xs uppercase tracking-wider text-[#E60000] mb-2">
                      {caseItem.industry}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                      {caseItem.company}
                    </h3>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                      {caseItem.users}
                    </div>
                    <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                      <div className="text-3xl font-bold text-[#E60000] mb-1">
                        {caseItem.result}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {caseItem.period}
                      </div>
                    </div>
                    <div className="mt-4">
                      <Quote className="w-5 h-5 text-[#E60000] mb-2" />
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {caseItem.quote}
                      </p>
                      <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                        {caseItem.author}, {caseItem.role}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* What's Included Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <SpotlightCard spotlightColor="rgba(230, 0, 0, 0.1)">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
                    Что входит в <GlitchText text="Enterprise" className="text-[#E60000]" /> пакет
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      "Выделенный аккаунт-менеджер 24/7",
                      "Unlimited API calls и интеграции",
                      "Кастомные дашборды и отчеты",
                      "Приоритетная очередь разработки",
                      "On-site обучение команды",
                      "Квартальные стратегические сессии",
                      "Миграция данных из любых систем",
                      "SLA с финансовыми гарантиями"
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#E60000] flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 dark:text-slate-300 text-sm">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="w-full md:w-64 bg-gradient-to-br from-[#E60000] to-[#b00000] p-8 rounded-2xl text-white shadow-2xl"
                  >
                    <Rocket className="w-12 h-12 mb-4" />
                    <div className="text-sm opacity-90 mb-2">Стартовая стоимость</div>
                    <div className="text-4xl font-bold mb-1">от ₽2.5M</div>
                    <div className="text-sm opacity-75 mb-6">первый год внедрения</div>
                    <Link to="/calculator-amocrm" className="block">
                      <button className="w-full bg-white text-[#E60000] py-3 rounded-lg font-medium hover:bg-slate-100 transition-colors">
                        Точный расчет
                      </button>
                    </Link>
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <div className="flex items-center gap-2 text-xs opacity-75">
                        <Clock className="w-4 h-4" />
                        <span>Старт через 2 недели</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              <GlitchText text="Enterprise" className="text-[#E60000]" /> vs Business
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Сравните возможности и выберите подходящий пакет
            </p>
          </div>
          
          <SpotlightCard spotlightColor="rgba(230, 0, 0, 0.1)">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <th className="text-left p-4 font-bold text-slate-900 dark:text-white">Возможность</th>
                    <th className="text-center p-4 font-bold text-slate-900 dark:text-white">Business</th>
                    <th className="text-center p-4 font-bold text-[#E60000]">
                      <Sparkles className="w-5 h-5 inline mr-2" />
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-slate-100 dark:border-slate-800/50"
                    >
                      <td className="p-4 text-slate-700 dark:text-slate-300">{feature.name}</td>
                      <td className="p-4 text-center">
                        {typeof feature.business === 'boolean' ? (
                          feature.business ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-slate-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-slate-600 dark:text-slate-400">{feature.business}</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {typeof feature.enterprise === 'boolean' ? (
                          feature.enterprise ? (
                            <Check className="w-5 h-5 text-[#E60000] mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-slate-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-[#E60000] font-medium">{feature.enterprise}</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              Часто задаваемые вопросы
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Ответы на популярные вопросы о Enterprise решении
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <SpotlightCard key={i} spotlightColor="rgba(230, 0, 0, 0.1)">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-6 flex items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                      {faq.q}
                    </h3>
                    <motion.div
                      initial={false}
                      animate={{ height: openFaq === i ? 'auto' : 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-slate-600 dark:text-slate-400 pr-4">
                        {faq.a}
                      </p>
                    </motion.div>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-[#E60000] flex-shrink-0 transition-transform",
                      openFaq === i && "rotate-180"
                    )}
                  />
                </button>
              </SpotlightCard>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Готовы к трансформации?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              Оставьте заявку на консультацию с Enterprise Solutions Architect
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton className="bg-[#E60000] text-white px-10 py-5 rounded-xl font-medium hover:bg-[#cc0000] transition-colors inline-flex items-center gap-2 text-lg">
                Запланировать встречу <ArrowRight className="w-5 h-5" />
              </MagneticButton>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-6">
              Ответим в течение 2 часов в рабочее время
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}