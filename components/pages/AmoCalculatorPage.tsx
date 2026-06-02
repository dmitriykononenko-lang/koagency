'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { GridBackground } from '../ui/grid-background';
import { Check, Calculator, Info, Printer, Copy, ExternalLink, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '../ui/use-mobile';

type PackageType = 'start' | 'growth' | 'enterprise';

export function AmoCalculatorPage() {
  const [users, setUsers] = useState([5]);
  const [pkg, setPkg] = useState<PackageType>('growth');
  const [licenseTariff, setLicenseTariff] = useState<PackageType>('growth');
  const [addons, setAddons] = useState({
    whatsapp: true,
    telephony: false,
    roistat: false,
    ones: false,
    training: true
  });
  const [period, setPeriod] = useState(12);
  const isMobile = useIsMobile();

  const licenseRates = {
    start: 499,
    growth: 999,
    enterprise: 1499
  };

  const calculatePrice = () => {
    let base = 15000;
    
    // Package multiplier
    const multipliers = {
      start: 1,
      growth: 1.5,
      enterprise: 2.5
    };
    base *= multipliers[pkg];

    // User licenses (approximate monthly implementation impact)
    const userCost = users[0] * 2500;

    // Addons
    let addonCost = 0;
    if (addons.whatsapp) addonCost += 15000;
    if (addons.telephony) addonCost += 20000;
    if (addons.roistat) addonCost += 25000;
    if (addons.ones) addonCost += 40000;
    if (addons.training) addonCost += 10000;

    const implementationTotal = Math.round(base + userCost + addonCost);
    
    // License calculation
    const monthlyRate = licenseRates[licenseTariff];
    const licenseTotal = monthlyRate * users[0] * period;

    return { implementation: implementationTotal, license: licenseTotal };
  };

  const costs = calculatePrice();

  const handleCopy = () => {
    const date = new Date().toLocaleDateString('ru-RU');
    const text = `
Расчет внедрения amoCRM от ${date}
Пользователей: ${users[0]}
Период лицензии: ${period} мес.
Тариф лицензии: ${licenseTariff}
Пакет внедрения: ${pkg}

Стоимость внедрения: ${costs.implementation.toLocaleString('ru-RU')} ₽
Стоимость лицензий: ${costs.license.toLocaleString('ru-RU')} ₽

Итого: ${(costs.implementation + costs.license).toLocaleString('ru-RU')} ₽
    `.trim();
    
    navigator.clipboard.writeText(text);
    toast.success("Расчет скопирован в буфер обмена");
  };

  const handlePrint = () => {
    window.print();
  };

  const features = {
    start: ['Базовая настройка воронки', 'Подключение почты', 'Импорт базы'],
    growth: ['Автоматизация воронок', 'Интеграция с сайтом', 'Настройка KPI', 'Базовые отчеты'],
    enterprise: ['Сложные бизнес-процессы', 'Сквозная аналитика', 'ERP интеграции', 'Персональный менеджер']
  };

  return (
    <div className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto print:p-0 print:max-w-none">
      {/* Grid Background for Amo Calculator */}
      <GridBackground 
        className="opacity-20 -z-10"
        highlightedSquares={[
          [10, 5], [11, 5], // Top leftish
          [25, 2], [26, 2], [27, 2], // Top right
          [5, 15], [5, 16], // Left side
          [30, 25], [31, 25] // Bottom right
        ]}
      />

      <style>{`
        @media print {
          body { background: white; color: black; }
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          .print-break-inside { break-inside: avoid; }
          /* Force light mode colors for print */
          .bg-slate-900, .dark .bg-slate-900 { background-color: white !important; color: black !important; }
          .text-white, .dark .text-white { color: black !important; }
          .text-slate-400, .dark .text-slate-400 { color: #666 !important; }
          .border-slate-800 { border-color: #ddd !important; }
        }
      `}</style>
      <div className="text-center mb-16 no-print">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Рассчитайте стоимость <span className="text-[#E60000]">внедрения amoCRM</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Конфигуратор тарифов и услуг внедрения для amoCRM
          </p>
        </motion.div>
      </div>

      <div className="hidden print-only mb-8">
        <div className="flex justify-between items-center border-b border-black pb-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-black">Коммерческое предложение</h1>
            <p className="text-gray-600">Внедрение amoCRM</p>
          </div>
          <div className="text-right">
            <div className="font-bold">ko:agency</div>
            <div className="text-sm text-gray-500">{new Date().toLocaleDateString('ru-RU')}</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* License Configuration */}
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5, delay: 0.1 }}
          >
          <Card className="bg-white/80 md:backdrop-blur-xl border-slate-200 dark:bg-slate-900/80 dark:border-slate-800 print-break-inside hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>1. Настройка лицензии</CardTitle>
                  <CardDescription>Выберите тариф и количество пользователей</CardDescription>
                </div>
                <a 
                  href="https://www.amocrm.ru/buy/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-slate-500 hover:text-[#E60000] flex items-center gap-1 transition-colors no-print"
                >
                  Официальные тарифы
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Tariff Selection */}
              <div className="space-y-3">
                <Label>Тариф лицензии</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(['start', 'growth', 'enterprise'] as const).map((tariff) => (
                    <motion.div
                      key={tariff}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setLicenseTariff(tariff)}
                      className={`cursor-pointer relative flex flex-col items-center justify-between rounded-lg border-2 p-4 transition-all ${
                        licenseTariff === tariff
                          ? 'border-[#E60000] bg-red-50/10'
                          : 'border-slate-200 bg-transparent hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-bold text-sm mb-1">
                        {tariff === 'start' ? 'Базовый' : tariff === 'growth' ? 'Расширенный' : 'Профессиональный'}
                      </div>
                      <div className="text-xs text-slate-500">
                        {licenseRates[tariff]} ₽/мес
                      </div>
                      {licenseTariff === tariff && (
                        <motion.div layoutId="active-tariff-dot" className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E60000]" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Users Slider */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <Label>Количество пользователей</Label>
                  <motion.div 
                     key={users[0]}
                     initial={{ scale: 1.2, color: '#E60000' }}
                     animate={{ scale: 1, color: 'currentColor' }}
                  >
                    <Badge variant="outline" className="text-lg px-3 py-1">{users[0]} сотр.</Badge>
                  </motion.div>
                </div>
                <Slider
                  defaultValue={[5]}
                  max={100}
                  min={1}
                  step={1}
                  value={users}
                  onValueChange={setUsers}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2">
                  <span>1</span>
                  <span>25</span>
                  <span>50</span>
                  <span>75</span>
                  <span>100+</span>
                </div>
              </div>

              {/* Period Selection */}
              <div className="space-y-3">
                <Label>Период оплаты</Label>
                <div className="grid grid-cols-3 gap-4">
                  {[6, 12, 24].map((m) => (
                    <motion.button
                      key={m}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPeriod(m)}
                      className={`py-2 px-4 rounded-lg border transition-all text-sm font-medium relative overflow-hidden ${
                        period === m
                          ? 'border-[#E60000] bg-red-50/10 text-[#E60000]'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {m} мес.
                      {period === m && <motion.div layoutId="period-glow" className="absolute inset-0 bg-[#E60000]/5" />}
                    </motion.button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>

          {/* Implementation Package */}
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5, delay: 0.3 }}
          >
          <Card className="bg-white/80 md:backdrop-blur-xl border-slate-200 dark:bg-slate-900/80 dark:border-slate-800 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>2. Уровень внедрения</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 pt-2">
              {['start', 'growth', 'enterprise'].map((type) => (
                <motion.div
                  key={type}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`relative flex items-start space-x-4 rounded-lg border p-4 transition-all cursor-pointer ${
                    pkg === type ? 'border-[#E60000] bg-red-50/10 ring-1 ring-[#E60000]' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                  onClick={() => setPkg(type as PackageType)}
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium uppercase tracking-wide text-sm flex items-center gap-2">
                          {type === 'start' ? 'Быстрый старт' : type === 'growth' ? 'Комплексное внедрение' : 'Корпоративное решение'}
                           {type === 'growth' && (
                              <span className="text-[10px] bg-[#E60000] text-white px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                 <Sparkles className="w-2 h-2" /> ХИТ
                              </span>
                           )}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Включает настройку и обучение
                        </p>
                      </div>
                      {pkg === type && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><Check className="h-5 w-5 text-[#E60000]" /></motion.div>}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {features[type as PackageType].map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${pkg === type ? 'bg-[#E60000]' : 'bg-slate-300'}`} />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
          </motion.div>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.5 }}
            >
            <Card className="bg-[#101010] text-white border-slate-800 shadow-2xl overflow-hidden relative">
              {/* Animated background blobs */}
              {!isMobile && (
                <motion.div 
                   animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.1, 0.15, 0.1] 
                   }}
                   transition={{ duration: 4, repeat: Infinity }}
                   className="absolute top-0 right-0 w-64 h-64 bg-[#E60000] opacity-10 blur-[80px]" 
                />
              )}
              
              <CardHeader>
                <CardTitle className="text-white">Итоговая оценка</CardTitle>
                <CardDescription className="text-slate-400">Примерная стоимость проекта (amoCRM)</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6 relative z-10">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-slate-400 mb-1">Стоимость внедрения</div>
                    <motion.div 
                       key={costs.implementation}
                       initial={{ opacity: 0.5 }}
                       animate={{ opacity: 1 }}
                       className="text-2xl font-bold font-mono"
                    >
                      {costs.implementation.toLocaleString('ru-RU')} ₽
                    </motion.div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-slate-400 mb-1">Лицензии ({period} мес.)</div>
                    <motion.div 
                       key={costs.license}
                       initial={{ opacity: 0.5 }}
                       animate={{ opacity: 1 }}
                       className="text-2xl font-bold font-mono text-[#E60000]"
                    >
                      {costs.license.toLocaleString('ru-RU')} ₽
                    </motion.div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="text-sm text-slate-400 mb-1">Итого</div>
                    <motion.div 
                       key={costs.implementation + costs.license}
                       initial={{ scale: 1.1, color: '#ffffff' }}
                       animate={{ scale: 1, color: '#ffffff' }}
                       className="text-4xl font-bold font-mono"
                    >
                      {(costs.implementation + costs.license).toLocaleString('ru-RU')} ₽
                    </motion.div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 no-print">
                  <Button variant="outline" onClick={handleCopy} className="bg-transparent border-slate-700 text-white hover:bg-slate-800 hover:text-white transition-colors">
                    <Copy className="w-4 h-4 mr-2" />
                    Копировать
                  </Button>
                  <Button variant="outline" onClick={handlePrint} className="bg-transparent border-slate-700 text-white hover:bg-slate-800 hover:text-white transition-colors">
                    <Printer className="w-4 h-4 mr-2" />
                    PDF
                  </Button>
                </div>

                <div className="space-y-4 border-t border-white/10 pt-4">
                  <h4 className="font-medium text-sm uppercase text-slate-400">Дополнительные опции</h4>
                  
                  <div className="space-y-3">
                    <AnimatePresence>
                    {[
                      { id: 'whatsapp', label: 'WhatsApp Business API' },
                      { id: 'telephony', label: 'Интеграция телефонии' },
                      { id: 'roistat', label: 'Сквозная аналитика' },
                      { id: 'ones', label: 'Интеграция с 1С' },
                      { id: 'training', label: 'Обучение сотрудников' }
                    ].map((item) => (
                       <motion.div key={item.id} layout className="flex items-center space-x-2">
                          <Checkbox 
                            id={item.id} 
                            checked={addons[item.id as keyof typeof addons]}
                            onCheckedChange={(c) => setAddons(prev => ({...prev, [item.id]: !!c}))}
                            className="border-slate-600 data-[state=checked]:bg-[#E60000] data-[state=checked]:border-[#E60000]"
                          />
                          <label htmlFor={item.id} className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-slate-300">
                            {item.label}
                          </label>
                       </motion.div>
                    ))}
                    </AnimatePresence>
                  </div>
                </div>

                <Button className="w-full bg-[#E60000] hover:bg-[#cc0000] text-white h-12 text-lg relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                  <Calculator className="mr-2 h-5 w-5 relative z-10" />
                  <span className="relative z-10">Заказать внедрение</span>
                </Button>
                
                <div className="flex gap-2 text-xs text-slate-500 bg-white/5 p-3 rounded-lg">
                  <Info className="h-4 w-4 flex-shrink-0 text-[#E60000]" />
                  <p>
                    Расчет является предварительным. Точная стоимость фиксируется в коммерческом предложении после аудита.
                  </p>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
