'use client';

import { Card } from './ui/card';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, useScroll, useSpring, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// -- HELPERS --

const CYBER_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const CipherReveal = ({ text, className }: { text: string, className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 3; // Speed of reveal
    }, 30);

    return () => clearInterval(interval);
  }, [isInView, text]);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
};

const steps = [
  {
    number: '01',
    title: 'Аудит',
    description: 'Анализируем текущие процессы, выявляем узкие места и определяем точки роста. Составляем карту "как есть" и "как должно быть".',
    duration: '1-2 дня',
    deliverables: ['Карта процессов', 'План оптимизации', 'Расчет ROI']
  },
  {
    number: '02',
    title: 'Проектирование',
    description: 'Разрабатываем техническую архитектуру CRM. Прописываем логику работы полей, статусов, триггеров и интеграций.',
    duration: '3-5 дней',
    deliverables: ['Техническое задание', 'Схема воронок', 'План интеграций']
  },
  {
    number: '03',
    title: 'Внедрение',
    description: 'Техническая магия. Настраиваем CRM, подключаем телефонию, мессенджеры, сайт и 1С. Тестируем работу системы.',
    duration: '1-3 недели',
    deliverables: ['Настроенная CRM', 'Интеграции', 'AI-квалификатор']
  },
  {
    number: '04',
    title: 'Обучение',
    description: 'Не просто отдаем доступы, а учим продавать в новой системе. Проводим тренинги для менеджеров и РОПа.',
    duration: '2-3 дня',
    deliverables: ['Обученная команда', 'Документация', 'Видео-инструкции']
  },
  {
    number: '05',
    title: 'Поддержка',
    description: 'Не бросаем после запуска. Следим за работой системы, корректируем процессы и помогаем новым сотрудникам.',
    duration: 'Постоянно',
    deliverables: ['Техподдержка 24/7', 'Консультации', 'Доработки']
  }
];

// -- VISUAL COMPONENTS --

// 1. 3D HOLO CUBE (Opposite Element)
const HoloCube = () => (
  <div className="relative w-32 h-32 flex items-center justify-center perspective-[800px]">
    {/* Grid Base */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ef444420_1px,transparent_1px),linear-gradient(to_bottom,#ef444420_1px,transparent_1px)] bg-[size:14px_14px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)] transform rotate-x-60 opacity-0 animate-in fade-in duration-700" />
    
    {/* Rotating Cube */}
    <motion.div
      initial={{ scale: 0, rotateX: 0, rotateY: 0 }}
      whileInView={{ scale: 1, rotateX: 45, rotateY: 45 }}
      transition={{ duration: 1.5, ease: "backOut" }}
      viewport={{ once: true }}
      className="relative w-12 h-12 transform-style-3d animate-[spin_10s_linear_infinite]"
    >
      {/* Cube Faces */}
      {[
        "translateZ(24px)", "translateZ(-24px)",
        "rotateY(90deg) translateZ(24px)", "rotateY(90deg) translateZ(-24px)",
        "rotateX(90deg) translateZ(24px)", "rotateX(90deg) translateZ(-24px)"
      ].map((transform, i) => (
        <div 
          key={i}
          className="absolute inset-0 border border-red-500/60 bg-red-500/10 backdrop-blur-sm shadow-[0_0_10px_rgba(239,68,68,0.2)] backface-visible"
          style={{ transform }}
        />
      ))}
    </motion.div>
  </div>
);

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden transition-colors duration-300">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.border)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20 dark:opacity-100" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-block mb-4 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono uppercase tracking-wider"
          >
             Workflow
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-6 text-foreground text-4xl md:text-5xl font-bold tracking-tight"
          >
            Как мы <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">строим систему</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground"
          >
            Превращаем хаос в упорядоченный механизм продаж за 5 шагов
          </motion.p>
        </div>

        {/* Process Steps Container */}
        <div ref={containerRef} className="relative">
          
          {/* CENTRAL SPINE (Desktop) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-border/30 -translate-x-1/2 hidden md:block" />
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 hidden md:flex flex-col justify-between py-8 opacity-20">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className="w-3 h-[1px] bg-foreground/50 -ml-[5px]" />
              ))}
          </div>

          {/* Active Line */}
          <motion.div 
            style={{ scaleY }}
            className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/0 via-primary to-red-500 origin-top -translate-x-1/2 hidden md:block z-10 shadow-[0_0_15px_rgba(239,68,68,0.4)]" 
          />
          
          {/* Moving Head (Separate element to avoid distortion) */}
          <motion.div
             style={{ top: useTransform(scaleY, [0, 1], ["0%", "100%"]) }}
             className="absolute left-1/2 w-12 h-12 -ml-6 -mt-6 hidden md:flex items-center justify-center z-20"
          >
             {/* Core Diamond */}
             <div className="relative w-4 h-4 bg-[#ef4444] rotate-45 shadow-[0_0_20px_#ef4444] ring-2 ring-background z-10 flex items-center justify-center">
                <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]" />
             </div>
             {/* Outer Rings */}
             <div className="absolute inset-0 border border-red-500/30 rotate-45 scale-50 animate-ping" />
             <div className="absolute inset-0 bg-red-500/10 blur-xl rounded-full" />
          </motion.div>

          {/* LEFT LINE (Mobile) */}
          <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-border/50 md:hidden" />
          <motion.div 
            style={{ scaleY }}
            className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary to-red-500 origin-top md:hidden z-10 shadow-[0_0_10px_rgba(239,68,68,0.5)]" 
          />

          <div className="space-y-24 md:space-y-32">
            {steps.map((step, index) => {
               const isEven = index % 2 === 1;
               return (
                <motion.div
                  key={index}
                  initial="idle"
                  whileInView="active"
                  viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
                  className={`relative md:flex ${isEven ? 'md:flex-row-reverse' : ''} items-center group/step`}
                >
                  {/* 1. OPPOSITE SIDE: Holo Cube */}
                  <div className="hidden md:flex md:w-1/2 justify-center items-center opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-700 delay-300">
                     <motion.div
                       variants={{
                         idle: { opacity: 0, scale: 0.8 },
                         active: { opacity: 1, scale: 1 }
                       }}
                       transition={{ duration: 0.5, delay: 0.4 }}
                     >
                        <HoloCube />
                     </motion.div>
                  </div>

                  {/* 2. CENTER: Node & Horizontal Beam */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                     {/* The Dot */}
                     <motion.div 
                        variants={{
                          idle: { scale: 1, backgroundColor: "transparent" },
                          active: { scale: 1.2, backgroundColor: "#ef4444" }
                        }}
                        className="relative w-4 h-4 bg-background border-2 border-primary rounded-full shadow-[0_0_10px_var(--primary)] z-20 transition-colors duration-300"
                     >
                        <div className="absolute inset-0.5 bg-primary rounded-full animate-pulse" />
                     </motion.div>

                     {/* Horizontal Laser Beam */}
                     <motion.div
                        variants={{
                           idle: { scaleX: 0, opacity: 0 },
                           active: { scaleX: 1, opacity: 1 }
                        }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] bg-red-500 w-[50vw] max-w-[200px] shadow-[0_0_15px_#ef4444] -z-10
                           ${isEven ? 'left-2 origin-left' : 'right-2 origin-right'}
                        `}
                     />
                  </div>

                  {/* 3. CONTENT SIDE: The Card */}
                  <div className={`pl-16 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-24' : 'md:pl-24'} relative`}>
                    <motion.div 
                      variants={{
                        idle: { x: isEven ? 50 : -50, opacity: 0 },
                        active: { x: 0, opacity: 1 }
                      }}
                      transition={{ duration: 0.5 }}
                      className="group relative"
                    >
                      {/* Card Background with Blur */}
                      <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted/0 rounded-2xl blur-sm -z-10" />
                      
                      <Card 
                        className="p-8 bg-card border border-border relative overflow-hidden transition-all duration-500
                          group-hover/step:border-red-500/80 group-hover/step:shadow-[0_0_30px_-5px_rgba(239,68,68,0.4)]"
                      >
                        {/* 1. NOISE TEXTURE (Cyberpunk Grain) */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

                        {/* 2. CONNECTION SOCKET (Where the laser hits) */}
                        <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-6 border border-border bg-background z-20 flex flex-col justify-between py-1 transition-colors duration-300 group-hover/step:border-red-500 group-hover/step:shadow-[0_0_10px_#ef4444]
                            ${isEven ? '-right-[7px] rounded-l-sm border-r-0' : '-left-[7px] rounded-r-sm border-l-0'}
                        `}>
                           <div className={`w-full h-[2px] bg-muted-foreground/30 group-hover/step:bg-red-500 transition-colors`} />
                           <div className={`w-full h-[2px] bg-muted-foreground/30 group-hover/step:bg-red-500 transition-colors`} />
                        </div>

                        {/* Electric Overlay Flash */}
                        <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover/step:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen" />

                        {/* Giant Background Number */}
                        <div className="absolute -right-4 -top-8 text-[100px] font-bold text-muted-foreground/5 font-mono select-none pointer-events-none group-hover/step:text-red-500/10 transition-colors duration-500">
                           {step.number}
                        </div>

                        <div className="relative z-10 space-y-6">
                           <div className="space-y-2">
                              <h3 className="text-foreground font-bold text-2xl flex items-center gap-3 group-hover/step:text-red-500 transition-colors duration-300">
                                 <CipherReveal text={step.title} />
                                 <ArrowRight className="w-5 h-5 text-muted-foreground -rotate-45 group-hover/step:rotate-0 group-hover/step:text-red-500 transition-all duration-300" />
                              </h3>
                              <p className="text-muted-foreground leading-relaxed">
                                 {step.description}
                              </p>
                           </div>
                           
                           {/* Deliverables */}
                           <div className="space-y-3 pt-4 border-t border-border group-hover/step:border-red-500/20 transition-colors duration-500">
                              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Результат этапа:</div>
                              <div className="flex flex-wrap gap-3">
                                 {step.deliverables.map((item, idx) => (
                                    <div key={idx} className="cursor-default flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-border transition-all duration-300 hover:border-red-500/50 hover:bg-red-500/10 hover:text-foreground group-hover/step:border-red-500/30 group-hover/step:bg-red-500/5">
                                       <CheckCircle2 className="w-4 h-4 text-primary group-hover/step:text-red-500 transition-colors" />
                                       <span>{item}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>

                           {/* Duration Badge */}
                           <div className="absolute top-0 right-0 overflow-hidden rounded-bl-xl opacity-0 group-hover/step:opacity-100 transition-all duration-300 -translate-y-full group-hover/step:translate-y-0 z-20">
                              <div className="bg-primary group-hover/step:bg-red-600 text-primary-foreground text-[10px] font-bold px-3 py-1 transition-colors duration-300">
                                {step.duration}
                              </div>
                           </div>
                        </div>
                      </Card>
                    </motion.div>
                  </div>
                </motion.div>
               );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mt-32 text-center"
        >
          <div className="inline-flex flex-col items-center gap-6 p-8 rounded-3xl bg-card border border-border relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
             
             <h3 className="text-2xl font-bold text-foreground relative z-10">
               Готовы навести порядок?
             </h3>
             <p className="text-muted-foreground max-w-md relative z-10">
               Первый шаг — это аудит. Мы бесплатно разберем ваши процессы и покажем точки роста.
             </p>
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => {
                 const element = document.getElementById('contact');
                 if (element) element.scrollIntoView({ behavior: 'smooth' });
               }}
               className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-all shadow-[0_10px_40px_-10px_var(--primary)] relative z-10"
             >
               Записаться на аудит
             </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}