'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@/lib/router-shim';
import { SpotlightCard } from '../ui/spotlight-card';
import { GlitchText } from '../ui/glitch-text';
import { CipherReveal } from '../ui/cipher-reveal';
import { MagneticButton } from '../ui/magnetic-button';
import { GridBackground } from '../ui/grid-background';
import { Database, FileSpreadsheet, ArrowRight, Zap, ShieldAlert } from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';

export function ExcelAmoPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const painPoints = [
    {
      title: "Потеря данных",
      desc: "Ручной перенос приводит к ошибкам в 34% случаев. Клиенты теряются в таблицах.",
      icon: ShieldAlert
    },
    {
      title: "Хаос в процессах",
      desc: "Отсутствие истории касаний. Менеджеры забывают перезвонить.",
      icon: FileSpreadsheet
    },
    {
      title: "Нет аналитики",
      desc: "Excel не покажет воронку продаж и эффективность менеджеров в реальном времени.",
      icon: Database
    }
  ];

  const benefits = [
    "Полный перенос базы контактов и компаний",
    "Сохранение истории сделок и примечаний",
    "Настройка кастомных полей под вашу нишу",
    "Дедупликация (удаление повторов)",
    "Обучение команды работе в новой системе"
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      <GridBackground 
        className="opacity-10 -z-10 fixed inset-0"
        highlightedSquares={[[5, 5], [5, 6], [20, 10], [21, 10]]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center mb-20 mt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-4 mb-6 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
          >
            <FileSpreadsheet className="w-4 h-4 text-green-600" />
            <ArrowRight className="w-4 h-4 text-slate-400" />
            <div className="w-4 h-4 rounded bg-[#0077FF] flex items-center justify-center text-[10px] text-white font-bold">am</div>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight text-slate-900 dark:text-white">
            Трансформация <br className="hidden md:block" />
            <span className="text-slate-400">Legacy</span> → <GlitchText text="System" className="text-[#E60000]" />
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Миграция из Excel в amoCRM без потерь. <br />
            Превращаем статические таблицы в динамическую систему продаж.
          </p>

          <Link to="/calculator-amocrm">
            <MagneticButton className="bg-[#E60000] text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-[#cc0000] transition-colors inline-flex items-center gap-2">
              Рассчитать стоимость <ArrowRight className="w-5 h-5" />
            </MagneticButton>
          </Link>
        </div>

        {/* Problem vs Solution */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {painPoints.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <SpotlightCard className="h-full" spotlightColor="rgba(230, 0, 0, 0.2)">
                <div className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4 text-[#E60000]">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{item.desc}</p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Main Feature Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-white">
              Протокол <GlitchText text="Миграции" className="text-[#E60000]" />
            </h2>
            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    <CipherReveal text={benefit} delay={0.2} />
                  </span>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>Среднее время внедрения: 2-4 дня</span>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#E60000]/20 to-blue-500/20 blur-3xl opacity-30" />
            <Card className="relative bg-slate-900 border-slate-800 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E60000] to-blue-500" />
              <CardContent className="p-8 font-mono text-sm">
                <div className="flex justify-between text-slate-500 mb-4">
                  <span>status: migrating...</span>
                  <span>98%</span>
                </div>
                <div className="space-y-2">
                  <div className="flex gap-4">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-300">Reading 'clients_2024.xlsx'...</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-300">Parsing contacts structure...</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-300">Detecting duplicates...</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-blue-500">➜</span>
                    <span className="text-white">Injecting into amoCRM API...</span>
                  </div>
                </div>
                <div className="mt-6 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-[#E60000]"
                    initial={{ width: "0%" }}
                    animate={{ width: "98%" }}
                    transition={{ duration: 2, ease: "circOut" }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Bottom */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Готовы переехать в систему?</h2>
          <p className="text-slate-500 mb-8">
            Мы бережно перенесем каждый контакт и сделку. Ваши данные под защитой NDA.
          </p>
          <Link to="/calculator-amocrm">
             <MagneticButton className="w-full sm:w-auto bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-xl font-medium hover:opacity-90 transition-opacity">
               Начать миграцию
             </MagneticButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
