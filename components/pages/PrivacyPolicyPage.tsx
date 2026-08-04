'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { GlitchText } from '../ui/glitch-text';
import { CipherReveal } from '../ui/cipher-reveal';
import { GridBackground } from '../ui/grid-background';
import { ShieldCheck, Lock, Eye, FileText, Server } from 'lucide-react';

export function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: ShieldCheck,
      title: "1. Общие положения",
      content: `Настоящая политика конфиденциальности (далее — Политика) действует в отношении всей информации, которую «ko:agency» может получить о Пользователе во время использования им сайта. Мы гарантируем полную защиту ваших цифровых отпечатков и персональных данных с использованием современных протоколов шифрования.`
    },
    {
      icon: Eye,
      title: "2. Сбор данных",
      content: `Мы собираем только те данные, которые необходимы для корректной работы сервисов и обратной связи: имя, телефон, email. Техническая информация (IP, cookies) собирается в обезличенном виде для анализа производительности системы.`
    },
    {
      icon: Server,
      title: "3. Хранение и защита",
      content: `Ваши данные хранятся на защищенных серверах. Мы применяем многоуровневую систему защиты от несанкционированного доступа, изменения, раскрытия или уничтожения предоставленной информации. Доступ к данным имеют только уполномоченные сотрудники.`
    },
    {
      icon: FileText,
      title: "4. Передача третьим лицам",
      content: `Мы не передаем ваши персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством, или когда это необходимо для предоставления услуги (например, интеграция с CRM-системой по вашему запросу).`
    },
    {
      icon: Lock,
      title: "5. Изменение политики",
      content: `«ko:agency» оставляет за собой право вносить изменения в настоящую Политику. Новая редакция Политики вступает в силу с момента ее размещения, если иное не предусмотрено новой редакцией Политики.`
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <GridBackground 
        className="opacity-10 -z-10 fixed inset-0"
        highlightedSquares={[
          [2, 2], [2, 3], [35, 5], [36, 5]
        ]}
      />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              <GlitchText text="Политика" className="text-slate-900 dark:text-white" />
              <span className="text-[#E60000] block sm:inline sm:ml-3">
                <GlitchText text="Конфиденциальности" className="text-[#E60000]" />
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
              Протокол защиты данных пользователей v.2.0
            </p>
          </motion.div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white/80 dark:bg-[#1A1A1A]/90 backdrop-blur-md border-slate-200 dark:border-slate-800 hover:border-[#E60000]/50 transition-colors group">
                <CardContent className="p-6 md:p-8 flex gap-6">
                  <div className="hidden md:flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-[#E60000]/10 transition-colors">
                      <section.icon className="w-6 h-6 text-slate-400 group-hover:text-[#E60000] transition-colors" />
                    </div>
                    <div className="w-px h-full bg-slate-200 dark:bg-slate-800 my-4 group-hover:bg-[#E60000]/20 transition-colors" />
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-3">
                      <section.icon className="w-6 h-6 text-[#E60000] md:hidden" />
                      <CipherReveal text={section.title} delay={0.5 + index * 0.2} />
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center text-sm text-slate-400"
        >
          <p>Последнее обновление: {new Date().toLocaleDateString()}</p>
          <p className="mt-2">
            По всем вопросам касательно данных: <a href="mailto:privacy@koagency.me" className="text-[#E60000] hover:underline">privacy@koagency.me</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
