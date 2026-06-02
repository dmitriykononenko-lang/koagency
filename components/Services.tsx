'use client';

import { Card } from './ui/card';
import { Settings, Bot, Headphones, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useIsMobile } from './ui/use-mobile';

const services = [
  {
    icon: Settings,
    title: 'Внедрение amoCRM и Kommo',
    description: 'Полная настройка CRM под ваш бизнес-процесс. Автоматизация воронки продаж, интеграции с другими сервисами, обучение команды.',
    features: ['Настройка воронок', 'Интеграции', 'Обучение команды', 'Миграция данных']
  },
  {
    icon: Bot,
    title: 'AI-квалификаторы',
    description: 'Внедрение искусственного интеллекта для автоматического отбора и квалификации лидов. Экономьте время менеджеров на обработку нецелевых заявок.',
    features: ['Автоматический отбор лидов', 'Оценка качества заявок', 'Приоритизация', 'Предиктивная аналитика']
  },
  {
    icon: Headphones,
    title: 'Техническая поддержка',
    description: 'Круглосуточная поддержка ваших CRM аккаунтов. Решаем проблемы, оптимизируем процессы, консультируем по возникающим вопросам.',
    features: ['Поддержка 24/7', 'Решение проблем', 'Консультации', 'Оптимизация процессов']
  },
  {
    icon: Zap,
    title: 'Автоматизация процессов',
    description: 'Создание автоматических сценариев и триггеров для повышения эффективности работы. Минимизация ручного труда и человеческих ошибок.',
    features: ['Цифровые воронки', 'Триггеры и сценарии', 'Email/SMS рассылки', 'Chatbot интеграции']
  }
];

const TiltCard = ({ service, index }: { service: any, index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      className="h-full"
    >
      <motion.div
        whileHover={!isMobile ? { y: -5 } : undefined}
        transition={{ type: "spring", stiffness: 300 }}
        className="h-full relative"
      >
        <Card 
          className="h-full p-6 sm:p-8 bg-card border border-border/50 shadow-sm overflow-hidden relative group transition-colors duration-500"
        >
            {/* 1. HOLO GRID BACKGROUND (Reveals on hover) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
            
            {/* 2. CORNER BRACKETS (Tech UI) - CSS Borders */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 m-2" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 m-2" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 m-2" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 m-2" />

            {/* 3. SCANNER BEAM */}
            {!isMobile && (
              <motion.div 
                  animate={isHovered ? { top: ["0%", "100%"], opacity: [0, 1, 0] } : { opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent z-10 pointer-events-none shadow-[0_0_15px_var(--primary)]"
              />
            )}

            {/* Content Container with slight Z-lift for parallax */}
            <div className="relative z-10 transform-style-3d translate-z-10">
                {/* Icon */}
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 border border-primary/20 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                    <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Title */}
                <h3 className="mb-3 text-foreground font-semibold text-xl group-hover:text-primary transition-colors duration-300">
                    {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2">
                    {service.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        <div className="w-1.5 h-1.5 bg-primary/50 rounded-full mr-3 group-hover:bg-primary group-hover:shadow-[0_0_5px_var(--primary)] transition-all duration-300" />
                        {feature}
                    </li>
                    ))}
                </ul>
            </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export function Services() {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-foreground text-3xl md:text-4xl font-bold"
          >
            Наши услуги
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Комплексные решения для автоматизации вашего бизнеса
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 perspective-[2000px]">
          {services.map((service, index) => (
            <TiltCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Industries */}
        <div className="mt-24">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8 text-muted-foreground font-mono uppercase text-sm tracking-wider flex items-center justify-center gap-4"
          >
            <span className="h-[1px] w-12 bg-border" />
             Работаем с индустриями
            <span className="h-[1px] w-12 bg-border" />
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['E-commerce', 'B2B услуги', 'Образование', 'Digital-агентства', 'Финтех', 'Недвижимость', 'Здравоохранение', 'IT-компании'].map((industry, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + (idx * 0.05) }}
                whileHover={{ scale: 1.05, backgroundColor: "var(--primary)", color: "white", borderColor: "var(--primary)" }}
                className="px-4 py-2 bg-card border border-border rounded-full text-sm text-foreground cursor-default transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              >
                {industry}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}