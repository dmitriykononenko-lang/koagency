'use client';

import { Smartphone, Zap, BarChart, ArrowRight, Check, Brain, Play, Trophy, Target, User, Settings, TrendingUp, Briefcase } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../lib/i18n/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export function Training() {
  const { t } = useLanguage();
  const [currentScreen, setCurrentScreen] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <Smartphone className="w-6 h-6 text-primary" />,
      titleKey: 'training.features.convenience.title',
      descKey: 'training.features.convenience.description'
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      titleKey: 'training.features.interactive.title',
      descKey: 'training.features.interactive.description'
    },
    {
      icon: <BarChart className="w-6 h-6 text-primary" />,
      titleKey: 'training.features.progress.title',
      descKey: 'training.features.progress.description'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative bg-background text-foreground transition-colors duration-300">
      {/* Background decoration - visible only in dark mode */}
      <div className="absolute inset-0 pointer-events-none dark:opacity-100 opacity-0 transition-opacity duration-300">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono mb-6 border border-primary/20">
              TELEGRAM MINI APP
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-foreground">
              {t('training.title')}
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t('training.description')}
            </p>

            <div className="grid gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 border border-border">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t(feature.titleKey)}</h3>
                    <p className="text-sm text-muted-foreground">{t(feature.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
              {t('training.cta')}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Visual Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative w-[300px] sm:w-[350px] aspect-[9/19] bg-white dark:bg-[#000000] rounded-[3rem] border-[8px] border-gray-100 dark:border-[#222222] shadow-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 transition-colors duration-300">
              {/* Mockup Screen Content */}
              <div className="absolute inset-0 flex flex-col text-gray-900 dark:text-white bg-gray-50 dark:bg-[#050505] transition-colors duration-300">
                {/* Status Bar */}
                <div className="h-12 bg-white/80 dark:bg-[#050505] backdrop-blur-md flex items-center justify-between px-6 pt-2 z-20 sticky top-0 border-b border-gray-100 dark:border-white/5 transition-colors duration-300">
                  <div className="text-xs font-mono text-gray-500 dark:text-white/90">9:41</div>
                  <div className="flex gap-1">
                    <div className="w-4 h-2.5 bg-gray-900 dark:bg-white/90 rounded-sm transition-colors duration-300" />
                    <div className="w-2.5 h-2.5 bg-gray-900 dark:bg-white/90 rounded-full transition-colors duration-300" />
                  </div>
                </div>

                {/* Dynamic App Content */}
                <div className="flex-1 relative overflow-hidden bg-gray-50 dark:bg-gradient-to-b dark:from-[#050505] dark:to-[#111111] transition-colors duration-300">
                  <AnimatePresence mode="wait">
                    {currentScreen === 0 && <DashboardScreen key="dashboard" />}
                    {currentScreen === 1 && <QuizScreen key="quiz" />}
                    {currentScreen === 2 && <SuccessScreen key="success" />}
                  </AnimatePresence>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -right-4 top-20 w-24 h-24 bg-primary rounded-full blur-2xl opacity-10 dark:opacity-30 animate-pulse dark:mix-blend-screen transition-opacity duration-300" />
            <div className="absolute -left-4 bottom-20 w-32 h-32 bg-blue-600 rounded-full blur-2xl opacity-5 dark:opacity-20 dark:mix-blend-screen transition-opacity duration-300" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DashboardScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="h-full flex flex-col p-5"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/20 flex items-center justify-center border border-blue-100 dark:border-blue-500/50 dark:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-colors duration-300">
            <span className="font-bold text-blue-600 dark:text-blue-400 text-xs">AMO</span>
          </div>
          <div>
            <div className="text-xs text-gray-500 dark:text-white/60 font-medium">Training Center</div>
            <div className="font-bold text-sm text-gray-900 dark:text-white">AmoCRM Academy</div>
          </div>
        </div>
        <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#1a1a1a] flex items-center justify-center border border-gray-100 dark:border-white/10 shadow-sm transition-colors duration-300">
          <User className="w-4 h-4 text-gray-600 dark:text-white/90" />
        </div>
      </div>

      <div className="bg-white dark:bg-[#151515] rounded-2xl p-4 mb-6 border border-gray-100 dark:border-white/10 shadow-sm dark:shadow-lg dark:shadow-black/20 transition-colors duration-300">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-white/60">Your Progress</span>
          <span className="text-xs font-bold text-primary">75%</span>
        </div>
        <div className="h-2 w-full bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden mb-2 transition-colors duration-300">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '75%' }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-full bg-primary rounded-full dark:shadow-[0_0_10px_rgba(var(--primary),0.5)]" 
          />
        </div>
        <p className="text-[10px] text-gray-400 dark:text-white/50 font-medium">3 courses in progress</p>
      </div>

      <h3 className="text-sm font-bold mb-3 text-gray-900 dark:text-white/90">Select Role</h3>
      
      <div className="space-y-3 overflow-y-auto pb-4 no-scrollbar">
        {/* Manager Track */}
        <div className="bg-white dark:bg-[#1a1a1a] p-3 rounded-xl border border-gray-100 dark:border-white/10 flex items-center gap-3 hover:border-blue-200 dark:hover:bg-[#252525] hover:shadow-sm transition-all cursor-pointer group">
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
            <Briefcase className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold mb-0.5 text-gray-900 dark:text-white dark:group-hover:text-blue-400 transition-colors">Manager</div>
            <div className="text-[10px] text-gray-500 dark:text-white/50">Sales, Deals, Tasks</div>
          </div>
          <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center dark:shadow-[0_0_10px_rgba(var(--primary),0.3)]">
             <div className="w-2.5 h-2.5 bg-primary rounded-full" />
          </div>
        </div>

        {/* Head Track */}
        <div className="bg-white dark:bg-[#1a1a1a] p-3 rounded-xl border border-gray-100 dark:border-white/10 flex items-center gap-3 hover:border-purple-200 dark:hover:bg-[#252525] hover:shadow-sm transition-all cursor-pointer group">
          <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-105 transition-transform">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold mb-0.5 text-gray-900 dark:text-white dark:group-hover:text-purple-400 transition-colors">Head of Sales</div>
            <div className="text-[10px] text-gray-500 dark:text-white/50">Analytics, KPIs, Control</div>
          </div>
          <div className="w-6 h-6 rounded-full border-2 border-gray-100 dark:border-white/10" />
        </div>

        {/* Admin Track */}
        <div className="bg-white dark:bg-[#1a1a1a] p-3 rounded-xl border border-gray-100 dark:border-white/10 flex items-center gap-3 hover:border-orange-200 dark:hover:bg-[#252525] hover:shadow-sm transition-all cursor-pointer group">
          <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-500/20 flex items-center justify-center text-orange-600 dark:text-orange-400 group-hover:scale-105 transition-transform">
            <Settings className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold mb-0.5 text-gray-900 dark:text-white dark:group-hover:text-orange-400 transition-colors">Administrator</div>
            <div className="text-[10px] text-gray-500 dark:text-white/50">Setup, Rights, Automations</div>
          </div>
          <div className="w-6 h-6 rounded-full border-2 border-gray-100 dark:border-white/10" />
        </div>
      </div>

      <div className="mt-auto pt-2">
         <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-10 text-xs font-bold shadow-lg shadow-primary/20 dark:shadow-[0_0_15px_rgba(var(--primary),0.4)] dark:hover:shadow-[0_0_25px_rgba(var(--primary),0.6)] transition-all border border-transparent dark:border-primary/20">
           Continue Learning
         </Button>
      </div>
    </motion.div>
  );
}

function QuizScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="h-full flex flex-col p-5"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="h-1 flex-1 bg-primary rounded-full dark:shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
        <div className="h-1 flex-1 bg-primary rounded-full dark:shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
        <div className="h-1 flex-1 bg-gray-200 dark:bg-white/10 rounded-full" />
        <div className="h-1 flex-1 bg-gray-200 dark:bg-white/10 rounded-full" />
      </div>

      <div className="mb-8">
        <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block dark:drop-shadow-[0_0_10px_rgba(var(--primary),0.5)]">Quiz: AmoCRM Basics</span>
        <h3 className="text-lg font-bold leading-tight text-gray-900 dark:text-white">
          Where can you find all your active deals?
        </h3>
      </div>

      <div className="space-y-3">
        {['Dashboard', 'Pipeline (Воронка)', 'Settings', 'Mail'].map((option, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-4 rounded-xl border text-sm font-medium cursor-pointer transition-all ${
              i === 1 
                ? 'bg-primary/10 border-primary text-primary shadow-sm dark:bg-primary/20 dark:border-primary/50 dark:shadow-[0_0_15px_rgba(var(--primary),0.2)]' 
                : 'bg-white border-gray-100 hover:border-gray-300 text-gray-600 hover:bg-gray-50 dark:bg-[#1a1a1a] dark:border-white/10 dark:hover:border-white/20 dark:text-white/80 dark:hover:bg-[#252525]'
            }`}
          >
            {option}
          </motion.div>
        ))}
      </div>

      <div className="mt-auto">
         <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-12 text-sm font-bold shadow-lg shadow-primary/20 dark:shadow-[0_0_15px_rgba(var(--primary),0.4)] dark:border border-transparent dark:border-primary/20">
           Check Answer
         </Button>
      </div>
    </motion.div>
  );
}

function SuccessScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.4 }}
      className="h-full flex flex-col p-5 items-center justify-center text-center"
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 12, delay: 0.2 }}
        className="w-24 h-24 rounded-full bg-green-50 dark:bg-green-500/20 flex items-center justify-center mb-6 border border-green-100 dark:border-green-500/50 shadow-sm dark:shadow-[0_0_30px_rgba(34,197,94,0.3)]"
      >
        <Check className="w-12 h-12 text-green-600 dark:text-green-400" />
      </motion.div>

      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Manager Track</h3>
      <p className="text-gray-500 dark:text-white/60 mb-8 text-sm">You've completed the "Sales Pipeline" module successfully.</p>

      <div className="grid grid-cols-2 gap-4 w-full mb-8">
        <div className="bg-white dark:bg-[#1a1a1a] p-4 rounded-2xl border border-gray-100 dark:border-white/10 flex flex-col items-center shadow-sm dark:shadow-lg">
          <Target className="w-6 h-6 text-primary mb-2 dark:drop-shadow-[0_0_8px_rgba(var(--primary),0.6)]" />
          <div className="text-xl font-bold text-gray-900 dark:text-white">100%</div>
          <div className="text-[10px] text-gray-400 dark:text-white/50 uppercase font-bold">Correct</div>
        </div>
        <div className="bg-white dark:bg-[#1a1a1a] p-4 rounded-2xl border border-gray-100 dark:border-white/10 flex flex-col items-center shadow-sm dark:shadow-lg">
          <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2 dark:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
          <div className="text-xl font-bold text-gray-900 dark:text-white">Master</div>
          <div className="text-[10px] text-gray-400 dark:text-white/50 uppercase font-bold">Level</div>
        </div>
      </div>

      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-12 text-sm font-bold shadow-lg shadow-primary/20 dark:shadow-[0_0_15px_rgba(var(--primary),0.4)] dark:hover:shadow-[0_0_25px_rgba(var(--primary),0.6)] transition-all border border-transparent dark:border-primary/20">
        Next Lesson
      </Button>
    </motion.div>
  );
}