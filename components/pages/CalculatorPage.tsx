'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Badge } from '../ui/badge';
import { Check, Calculator, Info, Printer, Copy, ExternalLink, Globe, MessageCircle, Puzzle, Users, Smartphone, Mail, LayoutTemplate, Plus, Minus, QrCode, ShieldCheck, Percent, Gift, Zap, Box, Layers, Wrench, X, Star, HelpCircle, Calendar, Clock, TrendingUp, Send, ArrowRight, FileText, CheckCircle2, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { GridBackground } from '../ui/grid-background';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Switch } from '../ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";

import { GlitchText } from '../ui/glitch-text';
import { CipherReveal } from '../ui/cipher-reveal';
import { MagneticButton } from '../ui/magnetic-button';
import { LeadForm } from '../LeadForm';
import { TooltipInfo } from '../ui/tooltip-info';
import { InfoCard } from '../ui/info-card';

type CrmType = 'amocrm' | 'kommo';
type LicenseType = 'start' | 'growth' | 'enterprise';
type OnesTariffType = 'base' | 'prof' | 'corp';
type ImplPackageType = 'base' | 'standard' | 'custom';

export function CalculatorPage() {
  const [crm, setCrm] = useState<CrmType>('amocrm');
  const [users, setUsers] = useState([0]);
  const [userInputValue, setUserInputValue] = useState("0");
  const [licenseTariff, setLicenseTariff] = useState<LicenseType>('growth');
  const [period, setPeriod] = useState(12);
  const [avgSalary, setAvgSalary] = useState(60000); // For ROI calc

  // Implementation Package
  const [implPackage, setImplPackage] = useState<ImplPackageType>('standard');

  // Messenger Subscription Period
  const [messengerPeriod, setMessengerPeriod] = useState(12);

  // Fast Decision Discount
  const [fastDecision, setFastDecision] = useState(false);

  // Lead Form Modal
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  // Previous values for Toast notifications
  const [prevUsers, setPrevUsers] = useState<number | null>(null);
  const [prevCrm, setPrevCrm] = useState<CrmType | null>(null);

  // 1. Sources (Custom Mode Only)
  const [sources, setSources] = useState({
    site: false,
    landing: false,
    email: true,
    calls: false,
  });

  // 2. Messengers (Counts)
  const [messengers, setMessengers] = useState({
    whatsapp_grey: 0,
    waba: 0,
    telegram: 0,
    vk: 0,
    avito: 0,
    facebook_lead: 0,
    messenger: 0,
  });

  // 3. Widgets & Integrations
  const [widgets, setWidgets] = useState({
    ones: false, // 1C
    roistat: false,
    docs: false, // Documents
    training: true,
    telegramBot: false, // Telegram bot (free)
  });

  // 1C Tariff State
  const [onesTariff, setOnesTariff] = useState<OnesTariffType>('base');

  // Add-ons Section Collapsed State
  const [addonsExpanded, setAddonsExpanded] = useState(false);

  // amoCRM Additional Options
  const [amoCrmOptions, setAmoCrmOptions] = useState({
    superFields: false,   // Супер-поля (только Growth и Enterprise)
    fileStorage: false,   // Файловое пространство (все тарифы)
  });

  // Sync input with slider
  useEffect(() => {
    setUserInputValue(users[0].toString());
  }, [users]);

  // Auto-disable superFields when switching to Start tariff
  useEffect(() => {
    if (licenseTariff === 'start' && amoCrmOptions.superFields) {
      setAmoCrmOptions(prev => ({ ...prev, superFields: false }));
    }
  }, [licenseTariff]);

  // Toast notifications for important changes
  useEffect(() => {
    if (prevUsers !== null && prevUsers !== users[0] && users[0] > 0) {
      const word = users[0] === 1 ? 'пользователя' : users[0] < 5 ? 'пользователей' : 'пользователей';
      toast.info(`💼 Пересчитано для ${users[0]} ${word}`);
    }
    setPrevUsers(users[0]);
  }, [users[0]]);

  useEffect(() => {
    if (prevCrm !== null && prevCrm !== crm) {
      const crmName = crm === 'amocrm' ? 'amoCRM' : 'Kommo';
      toast.info(`🔄 Переключено на ${crmName}`);
    }
    setPrevCrm(crm);
  }, [crm]);

  // Reset unavailable messengers when switching CRM
  useEffect(() => {
    if (crm === 'amocrm') {
      // Reset Facebook and Messenger for amoCRM
      setMessengers(prev => ({
        ...prev,
        facebook_lead: 0,
        messenger: 0,
      }));
    } else {
      // Reset Avito and VK for Kommo
      setMessengers(prev => ({
        ...prev,
        avito: 0,
        vk: 0,
      }));
    }
  }, [crm]);

  // Auto-adjust period for Kommo Advanced if current period is not supported
  useEffect(() => {
    if (crm === 'kommo' && licenseTariff === 'enterprise') {
      const supportedPeriods = [6, 9, 12, 24];
      if (!supportedPeriods.includes(period)) {
        setPeriod(12); // Default to 12 months
      }
    }
  }, [crm, licenseTariff, period]);

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUserInputValue(val);
    const num = parseInt(val);
    if (!isNaN(num) && num >= 0 && num <= 100) {
      setUsers([num]);
    }
  };

  const licenseRates = {
    amocrm: {
      start: 599,
      growth: 1199,
      enterprise: 1699
    },
    kommo: {
      start: 15,
      growth: 25,
      enterprise: 45
    }
  };

  const onesRates = {
    base: { total: 100000, setup: 82000, licenseYearly: 18000 },
    prof: { total: 150000, setup: 132000, licenseYearly: 18000 },
    corp: { total: 200000, setup: 182000, licenseYearly: 18000 }
  };

  // Package Definitions
  const implPackages = {
    base: {
      name: 'Базовый',
      price: 60000,
      timeline: '3-5 рабочих дней',
      desc: 'Старт работы',
      features: [
        { name: 'Базовая настройка CRM', included: true },
        { name: 'Подключение Email', included: true },
        { name: 'Импорт базы клиентов', included: true },
        { name: 'Обучение (1 час)', included: true },
        { name: 'Телефония', included: false },
        { name: 'Настройка мессенджеров', included: false },
      ]
    },
    standard: {
      name: 'Бизнес',
      price: 90000,
      timeline: '7-10 рабочих дней',
      desc: 'Отдел продаж под ключ',
      features: [
        { name: 'Все из тарифа Базовый', included: true },
        { name: 'Интеграция с телефонией', included: true },
        { name: 'Подключение сайта / заявок', included: true },
        { name: 'Настройка мессенджеров', included: true, note: 'Только работы. Лицензии оплачиваются отдельно.' },
        { name: 'Автоматизация задач', included: true },
        { name: 'Расширенное обучение', included: true },
      ]
    },
    custom: {
      name: 'Кастом',
      price: 150000, // Includes pre-project research
      timeline: 'от 14 рабочих дней',
      desc: 'Индивидуальный проект',
      features: [
        { name: 'Предпроектное исследование', included: true },
        { name: 'Техническая основа', included: true },
        { name: 'Выбор услуг', included: true },
        { name: 'Сложные интеграции', included: true },
        { name: 'Персональное ТЗ', included: true },
      ]
    }
  };

  // USD Exchange Rate
  const USD_RATE = 90; // 1 USD = 90 RUB

  // Helper function to convert RUB to USD for Kommo
  const convertToUSD = (rubAmount: number) => {
    return Math.round(rubAmount / USD_RATE);
  };

  // Helper function to format price with currency symbol
  const formatPrice = (price: number | string, withSymbol: boolean = true): string => {
    if (typeof price === 'string') return price; // Already formatted
    const symbol = crm === 'kommo' ? '$' : '₽';
    return withSymbol ? `${price.toLocaleString()} ${symbol}` : price.toLocaleString();
  };

  // Radist Pricing Logic
  const getMessengerPrice = (service: keyof typeof messengers, months: number, count: number) => {
    let baseMonthly = 0;
    // Facebook Lead и Messenger бесплатные для Kommo
    if (['facebook_lead', 'messenger'].includes(service) && crm === 'kommo') {
      baseMonthly = 0;
    } else if (service === 'waba') {
      baseMonthly = 5000;
    } else if (['whatsapp_grey', 'avito', 'telegram', 'vk'].includes(service)) {
      baseMonthly = 4000;
    } else if (['facebook_lead', 'messenger'].includes(service)) {
      baseMonthly = 4000;
    } else {
      baseMonthly = 2000;
    }

    let volumeDiscount = 0;
    if (['waba', 'whatsapp_grey', 'telegram'].includes(service)) {
        if (count >= 20) volumeDiscount = 0.50;
        else if (count >= 10) volumeDiscount = 0.40;
        else if (count >= 5) volumeDiscount = 0.30;
        else if (count >= 2) volumeDiscount = 0.20;
    }

    let periodDiscount = 0;
    if (months >= 12) periodDiscount = 0.20;
    else if (months >= 6) periodDiscount = 0.15;
    else if (months >= 3) periodDiscount = 0.10;

    let monthlyWithVolume = baseMonthly * (1 - volumeDiscount);
    let finalMonthly = monthlyWithVolume * (1 - periodDiscount);

    if (service === 'avito') finalMonthly = baseMonthly * (1 - periodDiscount);

    const total = finalMonthly * months;
    const totalDiscount = 1 - (finalMonthly / baseMonthly);

    return {
      monthly: finalMonthly,
      total: total,
      baseMonthly: baseMonthly,
      discount: totalDiscount,
      volumeDiscount: volumeDiscount,
      periodDiscount: periodDiscount
    };
  };

  // Avito Logic - первый аккаунт бесплатный
  const calculateAvitoTotal = (count: number, months: number) => {
    if (count === 0) return 0;
    if (count === 1) return 0; // Первый аккаунт бесплатно
    const basePrice = getMessengerPrice('avito', months, 1).total;
    const extraAccounts = Math.max(0, count - 3);
    const extraCost = extraAccounts * 100 * months;
    return basePrice + extraCost;
  };

  const getPaidMonths = (selectedPeriod: number, system: CrmType) => {
    if (system === 'amocrm') {
      if (selectedPeriod === 6) return 6;   // 6 мес → оплата 6 мес
      if (selectedPeriod === 12) return 10; // 12 мес → оплата 10 мес (2 мес бонус от amoCRM)
      if (selectedPeriod === 24) return 18; // 24 мес → оплата 18 мес (6 мес бонус от amoCRM)
    }
    return selectedPeriod;
  };

  const getTotalDuration = (selectedPeriod: number, system: CrmType) => {
    if (system === 'amocrm') {
      // Итого = оплаченные месяцы + бонусы от amoCRM + 1 от партнера
      if (selectedPeriod === 6) return 7;   // 6 + 0 + 1 = 7 мес
      if (selectedPeriod === 12) return 13; // 10 + 2 + 1 = 13 мес 
      if (selectedPeriod === 24) return 25; // 18 + 6 + 1 = 25 мес
    }
    if (system === 'kommo') {
      // Kommo: фиксированные пакеты с +1 месяц в подарок
      if (selectedPeriod === 6) return 7;   // 6 + 1 = 7 мес
      if (selectedPeriod === 9) return 10;  // 9 + 1 = 10 мес
      if (selectedPeriod === 12) return 13; // 12 + 1 = 13 мес
      if (selectedPeriod === 24) return 25; // 24 + 1 = 25 мес
    }
    return selectedPeriod;
  };

  // Kommo Advanced Package Pricing
  const getKommoAdvancedPrice = (selectedPeriod: number) => {
    if (selectedPeriod === 6) return 150;
    if (selectedPeriod === 9) return 200;
    if (selectedPeriod === 12) return 250;
    if (selectedPeriod === 24) return 450;
    return 0;
  };

  const currency = crm === 'kommo' ? 'USD' : 'RUB';
  const currencySymbol = crm === 'kommo' ? '$' : '₽';

  const calculatePrice = () => {
    // 1. Implementation Cost
    let implCost = 0;

    if (implPackage === 'base') {
      implCost = implPackages.base.price;
    } else if (implPackage === 'standard') {
      implCost = implPackages.standard.price;
    } else {
      // Custom Constructor Logic
      implCost = implPackages.custom.price; // Base technical setup
      if (sources.site) implCost += 10000;
      if (sources.landing) implCost += 5000;
      if (sources.email) implCost += 5000;
      if (sources.calls) implCost += 15000; 
      if (widgets.training) implCost += 15000;

      // Messenger SETUP costs (Custom mode only - Standard includes setup)
      if (messengers.whatsapp_grey > 0) implCost += messengers.whatsapp_grey * 10000;
      if (messengers.waba > 0) implCost += messengers.waba * 20000;
      if (messengers.telegram > 0) implCost += messengers.telegram * 8000;
      if (messengers.vk > 0) implCost += messengers.vk * 8000;
      if (messengers.avito > 0) implCost += messengers.avito * 10000;
      if (messengers.facebook_lead > 0) implCost += messengers.facebook_lead * 8000;
      if (messengers.messenger > 0) implCost += messengers.messenger * 8000;
    }

    // Extra Add-ons (Apply to ALL packages)
    if (widgets.ones) implCost += onesRates[onesTariff].setup;
    if (widgets.roistat) implCost += 40000;
    if (widgets.docs) implCost += 15000;

    // Users setup cost
    if (implPackage === 'custom') {
       implCost += users[0] * 1000;
    }
    
    // 2. CRM License
    let licenseTotal = 0;
    if (users[0] > 0) {
      if (crm === 'kommo' && licenseTariff === 'enterprise') {
        // Kommo Advanced использует фиксированные пакетные цены
        licenseTotal = getKommoAdvancedPrice(period);
      } else {
        const monthlyRate = licenseRates[crm][licenseTariff];
        const paidMonths = getPaidMonths(period, crm);
        licenseTotal = monthlyRate * users[0] * paidMonths;
      }
    }

    // amoCRM Additional Options (Супер-поля и Файловое пространство)
    let amoCrmOptionsTotal = 0;
    if (crm === 'amocrm' && users[0] > 0) {
      const totalDuration = getTotalDuration(period, crm); // Используем полный период с бонусами
      if (amoCrmOptions.superFields) amoCrmOptionsTotal += 999 * totalDuration;
      if (amoCrmOptions.fileStorage) amoCrmOptionsTotal += 999 * totalDuration;
    }

    // 3. Services (Subscriptions)
    let servicesSubTotal = 0;
    Object.entries(messengers).forEach(([key, count]) => {
      if (count > 0) {
        if (key === 'avito') {
          servicesSubTotal += calculateAvitoTotal(count, messengerPeriod);
        } else {
          const priceData = getMessengerPrice(key as keyof typeof messengers, messengerPeriod, count);
          servicesSubTotal += priceData.total * count;
        }
      }
    });

    if (widgets.ones) servicesSubTotal += 1500 * messengerPeriod;

    const discountAmount = fastDecision ? implCost * 0.10 : 0;
    const finalImplCost = implCost - discountAmount;

    // Convert to USD for Kommo
    if (crm === 'kommo') {
      return { 
        implementationRaw: convertToUSD(implCost),
        implementation: convertToUSD(finalImplCost), 
        implementationDiscount: convertToUSD(discountAmount),
        license: licenseTotal, // Already in USD
        amoCrmOptions: 0, // Not applicable for Kommo
        messengerSubscription: convertToUSD(servicesSubTotal) 
      };
    }

    return { 
      implementationRaw: implCost,
      implementation: finalImplCost, 
      implementationDiscount: discountAmount,
      license: licenseTotal, 
      amoCrmOptions: amoCrmOptionsTotal,
      messengerSubscription: servicesSubTotal 
    };
  };

  const costs = calculatePrice();
  const paidMonthsLicense = getPaidMonths(period, crm);
  const totalDurationLicense = getTotalDuration(period, crm);

  // ROI Calculation
  // Assume 20% efficiency gain
  // Monthly Savings = Users * AvgSalary * 0.20
  const monthlySavings = users[0] * avgSalary * 0.20;
  const totalInvestment = costs.implementation + costs.messengerSubscription + (crm === 'amocrm' ? costs.license + costs.amoCrmOptions : (costs.license * 90)); // Rough USD convert for ROI
  const paybackMonths = totalInvestment / monthlySavings;

  const updateMessenger = (key: keyof typeof messengers, delta: number) => {
    setMessengers(prev => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta)
    }));
  };

  const generateText = () => {
    const date = new Date().toLocaleDateString('ru-RU');
    const currency = crm === 'amocrm' ? '₽' : '$';
    
    let text = `КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ\nДата: ${date}\nCRM: ${crm === 'amocrm' ? 'amoCRM' : 'Kommo'}\n`;
    text += `Пакет внедрения: ${implPackages[implPackage].name}\n`;
    text += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    
    // Внедрение и настройка
    text += `\n📦 ВНЕДРЕНИЕ И НАСТРОЙКА\n`;
    lineItems.forEach(item => {
      const itemPrice = crm === 'kommo' && typeof item.price === 'number' ? `${item.price.toLocaleString()} $` : `${typeof item.price === 'number' ? item.price.toLocaleString() : item.price} ₽`;
      const itemTotal = crm === 'kommo' ? `${item.total.toLocaleString()} $` : `${item.total.toLocaleString()} ₽`;
      text += `  • ${item.name}\n    ${itemPrice} × ${item.quantity} ${item.unit} = ${itemTotal}\n`;
    });
    
    // Абонентская плата
    const subs = getSubItems();
    if (subs.length > 0) {
      text += `\n💳 АБОНЕНТСКАЯ ПЛАТА\n`;
      subs.forEach(item => {
        const itemTotal = typeof item.total === 'number' ? (typeof item.price === 'string' && item.price.includes('$') ? `${item.total.toLocaleString()} $` : `${item.total.toLocaleString()} ₽`) : item.total;
        text += `  • ${item.name}\n    ${item.price} × ${item.quantity} = ${itemTotal}\n`;
      });
    }
    
    // Итоги
    text += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `\n💰 ИТОГО:\n`;
    text += `  Внедрение: ${costs.implementation.toLocaleString()} ₽`;
    if (fastDecision) {
      text += ` (скидка -10%)`;
    }
    text += `\n`;
    
    if (users[0] > 0) {
      text += `  Лицензии (${totalDurationLicense} мес): ${costs.license.toLocaleString()} ${currencySymbol}\n`;
    }
    
    if (costs.amoCrmOptions > 0) {
      text += `  Доп. опции amoCRM (${totalDurationLicense} мес): ${costs.amoCrmOptions.toLocaleString()} ₽\n`;
    }
    
    if (costs.messengerSubscription > 0) {
      text += `  Абонплата мессенджеры (${messengerPeriod} мес): ${costs.messengerSubscription.toLocaleString()} ₽\n`;
    }
    
    text += `\n  ═══════════════════════════════\n`;
    const totalRub = costs.implementation + costs.messengerSubscription + (crm === 'amocrm' ? costs.license + costs.amoCrmOptions : 0);
    text += `  ВСЕГО: ${totalRub.toLocaleString()} ₽`;
    if (crm === 'kommo') {
      text += ` + ${costs.license.toLocaleString()} $`;
    }
    text += `\n`;
    
    // Условия
    text += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `\n📋 УСЛОВИЯ:\n`;
    text += `  • Срок внедрения: 2-4 недели\n`;
    text += `  • Техподдержка: включена\n`;
    text += `  • Обучение сотрудников: включено\n`;
    
    text += `\n\n📞 Контакты: ko:agency\n`;
    
    return text.trim();
  };
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateText());
    toast.success("Расчет скопирован");
  };

  const handleSendToManager = () => {
    const text = encodeURIComponent(generateText());
    window.open(`https://wa.me/?text=${text}`, '_blank');
  }

  const handleShare = () => {
    // Create shareable URL with configuration
    const config = btoa(JSON.stringify({
      crm,
      users: users[0],
      licenseTariff,
      period,
      implPackage,
      messengers,
      messengerPeriod,
      fastDecision
    }));
    const url = `${window.location.origin}${window.location.pathname}?config=${config}`;
    navigator.clipboard.writeText(url);
    toast.success("Ссылка на конфигурацию скопирована!");
  }

  const handlePrint = () => window.print();

  // Generate Line Items for Table
  const getLineItems = () => {
    const items: Array<{name: string, price: number, quantity: number, unit: string, total: number, isDiscount?: boolean}> = [];
    
    // Helper to convert price if Kommo
    const priceConvert = (rubPrice: number) => crm === 'kommo' ? convertToUSD(rubPrice) : rubPrice;

    // Implementation Base
    if (implPackage === 'base') {
       const price = priceConvert(implPackages.base.price);
       items.push({ name: 'Пакет внедрения «Базовый»', price, quantity: 1, unit: 'пак', total: price });
    } else if (implPackage === 'standard') {
       const price = priceConvert(implPackages.standard.price);
       items.push({ name: 'Пакет внедрения «Бизнес»', price, quantity: 1, unit: 'пак', total: price });
    } else {
       // Custom
       const basePrice = priceConvert(150000);
       const userSetupPrice = priceConvert(1000);
       items.push({ name: 'Базовая настройка «Кастом» (включая предпроектное исследование)', price: basePrice, quantity: 1, unit: 'проект', total: basePrice });
       items.push({ name: 'Настройка прав пользователей', price: userSetupPrice, quantity: users[0], unit: 'чел', total: userSetupPrice * users[0] });
       if (sources.site) {
         const price = priceConvert(10000);
         items.push({ name: 'Интеграция с сайтом', price, quantity: 1, unit: 'шт', total: price });
       }
       if (sources.landing) {
         const price = priceConvert(5000);
         items.push({ name: 'Интеграция с лендингом', price, quantity: 1, unit: 'шт', total: price });
       }
       if (sources.email) {
         const price = priceConvert(5000);
         items.push({ name: 'Подключение Email', price, quantity: 1, unit: 'шт', total: price });
       }
       if (sources.calls) {
         const price = priceConvert(15000);
         items.push({ name: 'Настройка телефонии', price, quantity: 1, unit: 'шт', total: price });
       }
       if (widgets.training) {
         const price = priceConvert(15000);
         items.push({ name: 'Обучение сотрудников', price, quantity: 1, unit: 'шт', total: price });
       }

       // Messenger Setups (Only separate in Custom)
        if (messengers.whatsapp_grey > 0) {
          const price = priceConvert(10000);
          items.push({ name: 'WhatsApp (QR) настройка', price, quantity: messengers.whatsapp_grey, unit: 'акк', total: price * messengers.whatsapp_grey });
        }
        if (messengers.waba > 0) {
          const price = priceConvert(20000);
          items.push({ name: 'WABA настройка', price, quantity: messengers.waba, unit: 'акк', total: price * messengers.waba });
        }
        if (messengers.telegram > 0) {
          const price = priceConvert(8000);
          items.push({ name: 'Telegram настройка', price, quantity: messengers.telegram, unit: 'акк', total: price * messengers.telegram });
        }
        if (messengers.vk > 0) {
          const price = priceConvert(8000);
          items.push({ name: 'VK настройка', price, quantity: messengers.vk, unit: 'акк', total: price * messengers.vk });
        }
        if (messengers.avito > 0) {
          const price = priceConvert(10000);
          items.push({ name: 'Avito настройка', price, quantity: messengers.avito, unit: 'акк', total: price * messengers.avito });
        }
        if (messengers.facebook_lead > 0) {
          const price = priceConvert(8000);
          items.push({ name: 'Facebook Lead настройка', price, quantity: messengers.facebook_lead, unit: 'акк', total: price * messengers.facebook_lead });
        }
        if (messengers.messenger > 0) {
          const price = priceConvert(8000);
          items.push({ name: 'Messenger настройка', price, quantity: messengers.messenger, unit: 'акк', total: price * messengers.messenger });
        }
    }

    // Add-ons (Universal)
    if (widgets.ones) {
      const setupCost = onesRates[onesTariff].setup;
      const tName = onesTariff === 'base' ? 'Базовый' : onesTariff === 'prof' ? 'Проф' : 'Корп';
      items.push({ name: `Интеграция с 1С (${tName})`, price: setupCost, quantity: 1, unit: 'шт', total: setupCost });
    }
    if (widgets.roistat) items.push({ name: 'Настро��ка Roistat', price: 40000, quantity: 1, unit: 'шт', total: 40000 });
    if (widgets.docs) items.push({ name: 'Генерация документов', price: 15000, quantity: 1, unit: 'шт', total: 15000 });
    
    return items;
  };

  // Get Subscriptions
  const getSubItems = () => {
     const items: Array<{name: string, price: string | number, quantity: number | string, unit: string, total: number, discount: number, volumeDisc: number, periodDisc: number}> = [];
     
     // Helper for currency conversion in subscriptions
     const subPriceConvert = (rubPrice: number) => crm === 'kommo' ? convertToUSD(rubPrice) : rubPrice;
     
     // Calculate license duration (needed for amoCRM options as well)
     const totalDurationLicense = getTotalDuration(period, crm);
     const paidMonths = getPaidMonths(period, crm);
     
     // CRM Licenses
     if (users[0] > 0) {
       const currencySymbol = crm === 'amocrm' ? '₽' : '$';
       const tariffName = licenseTariff === 'start' ? 'Старт' : licenseTariff === 'growth' ? 'Рост' : 'Продвинутый';
       
       if (crm === 'kommo' && licenseTariff === 'enterprise') {
         // Kommo Advanced - пакетная цена
         const packagePrice = getKommoAdvancedPrice(period);
         items.push({ 
           name: `Лицензия Kommo (${tariffName}) - пакет ${period} мес`, 
           price: `${packagePrice} $`, 
           quantity: `${totalDurationLicense} мес (+1 в подарок)`, 
           unit: 'пак', 
           discount: 0, 
           volumeDisc: 0, 
           periodDisc: 0, 
           total: packagePrice 
         });
       } else {
         // Стандартная логика для amoCRM и Kommo Start/Growth
         const monthlyRate = licenseRates[crm][licenseTariff];
         const licenseTotal = monthlyRate * users[0] * paidMonths;
         
         items.push({ 
           name: `Лицензия ${crm === 'amocrm' ? 'amoCRM' : 'Kommo'} (${tariffName})`, 
           price: `${monthlyRate} ${currencySymbol}`, 
           quantity: `${users[0]} польз · ${paidMonths} мес`, 
           unit: 'лиц', 
           discount: 0, 
           volumeDisc: 0, 
           periodDisc: 0, 
           total: licenseTotal 
         });
       }
     }
     
     Object.entries(messengers).forEach(([key, count]) => {
      if (count > 0) {
        const priceData = getMessengerPrice(key as keyof typeof messengers, messengerPeriod, count);
        if (key === 'avito') {
           // Первый аккаунт бесплатный
           if (count === 1) {
             items.push({ name: 'Абон. плата Avito (1-й бесплатно)', price: 0, quantity: `1 акк · ${messengerPeriod} мес`, unit: 'акк', discount: 0, volumeDisc: 0, periodDisc: 0, total: 0 });
           } else {
             items.push({ name: 'Абон. плата Avito (база)', price: priceData.monthly, quantity: `1 пак · ${messengerPeriod} мес`, unit: 'пак', discount: priceData.discount, volumeDisc: 0, periodDisc: priceData.periodDiscount, total: priceData.total });
             const extra = Math.max(0, count - 3);
             if (extra > 0) items.push({ name: 'Абон. плата Avito (дп)', price: 100, quantity: `${extra} акк · ${messengerPeriod} мес`, unit: 'акк', discount: 0, volumeDisc: 0, periodDisc: 0, total: extra * 100 * messengerPeriod });
           }
        } else {
          const nameMap = { 
            whatsapp_grey: 'WhatsApp (QR)', 
            waba: 'WABA', 
            telegram: 'Telegram', 
            vk: 'VK',
            facebook_lead: 'Facebook Lead',
            messenger: 'Messenger'
          };
          const name = nameMap[key as keyof typeof nameMap];
          // Facebook Lead и Messenger бесплатны для Kommo
          if ((key === 'facebook_lead' || key === 'messenger') && crm === 'kommo') {
            items.push({ name: `Абон. плата ${name} (бесплатно)`, price: 0, quantity: `${count} акк · ${messengerPeriod} мес`, unit: 'акк', discount: 0, volumeDisc: 0, periodDisc: 0, total: 0 });
          } else {
            const finalPrice = crm === 'kommo' ? convertToUSD(priceData.monthly) : priceData.monthly;
            const finalTotal = crm === 'kommo' ? convertToUSD(priceData.total * count) : priceData.total * count;
            items.push({ name: `Абон. плата ${name}`, price: finalPrice, quantity: count, unit: `акк · ${messengerPeriod} мес`, discount: priceData.discount, volumeDisc: priceData.volumeDiscount, periodDisc: priceData.periodDiscount, total: finalTotal });
          }
        }
      }
    });
    if (widgets.ones) {
      const price = crm === 'kommo' ? convertToUSD(1500) : 1500;
      const total = crm === 'kommo' ? convertToUSD(1500 * messengerPeriod) : 1500 * messengerPeriod;
      items.push({ name: 'Лицензия 1С', price, quantity: `${messengerPeriod} мес`, unit: 'лиц', discount: 0, volumeDisc: 0, periodDisc: 0, total });
    }
    
    // amoCRM Additional Options
    if (crm === 'amocrm') {
      if (amoCrmOptions.fileStorage) {
        items.push({ name: 'Файловое пространство amoCRM', price: 999, quantity: `${totalDurationLicense} мес`, unit: 'подписка', discount: 0, volumeDisc: 0, periodDisc: 0, total: 999 * totalDurationLicense });
      }
      if (amoCrmOptions.superFields && licenseTariff !== 'start') {
        items.push({ name: 'Супер-поля amoCRM', price: 999, quantity: `${totalDurationLicense} мес`, unit: 'подписка', discount: 0, volumeDisc: 0, periodDisc: 0, total: 999 * totalDurationLicense });
      }
    }
    
    return items;
  }

  const lineItems = getLineItems();
  const subItems = getSubItems();

  // Calculate Total for Sticky Footer
  const totalOneTime = costs.implementation;
  const totalRecurring = costs.messengerSubscription + (crm === 'amocrm' ? 0 : 0); // Recurring usually doesn't include license in one sum if standard logic, but here we sum it for total display if needed.
  // Actually, let's just show the "Check Amount" (Implementation) + "License/Services" text or just the main total.
  // Let's show the Grand Total Implementation + License (if Amo) + amoCRM Options + Services
  const grandTotal = costs.implementation + costs.messengerSubscription + (crm === 'amocrm' ? costs.license + costs.amoCrmOptions : 0);

  return (
    <TooltipProvider>
    <div className="relative overflow-hidden py-8 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto print:p-8 print:max-w-none print:w-full pb-32 md:pb-16">
      {/* Grid Background for Calculator */}
      <GridBackground 
        className="opacity-20 -z-10"
        highlightedSquares={[
          [2, 2], [2, 3], // Top left corner
          [35, 5], [36, 5], // Top rightish
          [10, 25], [11, 25], [12, 25], // Middle area
          [25, 40], [25, 41] // Bottom area
        ]}
      />

      <style>{`
        @media print {
          @page { margin: 1cm; }
          body { background: white !important; color: black !important; -webkit-print-color-adjust: exact; }
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          .print-break-inside { break-inside: avoid; }
          button, input, .checkbox-root { display: none; }
          table { width: 100% !important; border-collapse: collapse !important; }
          th, td { border-bottom: 1px solid #ddd !important; color: black !important; padding: 8px 4px !important; }
          th { font-weight: bold !important; }
          .rounded-lg, .rounded-md, .rounded-xl { border-radius: 0 !important; }
          .border { border: none !important; }
          .shadow-2xl, .shadow-sm, .backdrop-blur-xl { box-shadow: none !important; backdrop-filter: none !important; background: transparent !important; }
        }
      `}</style>

      {/* Mobile Sticky Footer */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-50 pb-safe shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] no-print">
         <div className="flex items-center justify-between gap-4">
            <div>
               <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Итого к оплате</div>
               <div className="font-bold text-xl text-slate-900 leading-none mt-1 flex items-center gap-1">
                  <CipherReveal text={grandTotal.toLocaleString()} /> ₽
                  {crm === 'kommo' && <span className="text-xs text-slate-400 block font-normal">+ {costs.license} $</span>}
               </div>
            </div>
            <MagneticButton>
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 0 0 0 rgba(230, 0, 0, 0.4)',
                    '0 0 0 10px rgba(230, 0, 0, 0)',
                    '0 0 0 0 rgba(230, 0, 0, 0)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Button onClick={() => setLeadFormOpen(true)} className="bg-[#E60000] hover:bg-[#cc0000] text-white rounded-xl shadow-lg shadow-red-500/20 h-12 px-6">
                   <FileText className="w-5 h-5 mr-2" />
                   Получить КП
                </Button>
              </motion.div>
            </MagneticButton>
         </div>
      </div>

      {/* Screen Header */}
      <div className="text-center mb-8 md:mb-12 no-print">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-900 dark:text-white">
            <GlitchText text="Калькулятор внедрения" className="text-slate-900 dark:text-white" />
            <span className="text-[#E60000] block sm:inline sm:ml-3">
               <GlitchText text="CRM системы" className="text-[#E60000]" />
            </span>
          </h1>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
            Соберите свою конфигурацию и получите точный расчет стоимости за 1 минуту
          </p>
        </motion.div>
      </div>

      {/* Print Header */}
      <div className="hidden print-only mb-8">
        <div className="flex justify-between items-end border-b-2 border-black pb-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-black mb-1">КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ</h1>
            <p className="text-gray-600">Внедрение и настройка CRM-системы</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-[#E60000]">ko:agency</div>
            <div className="text-sm text-gray-500">Дата: {new Date().toLocaleDateString('ru-RU')}</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-700">Прогресс заполнения</span>
          <span className="text-sm font-bold text-[#E60000]">
            {Math.round((
              (users[0] > 0 ? 25 : 0) + 
              (implPackage ? 25 : 0) + 
              (Object.values(messengers).some(v => v > 0) ? 25 : 0) + 
              (fastDecision ? 25 : 0)
            ))}%
          </span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#E60000] to-red-500"
            initial={{ width: 0 }}
            animate={{ 
              width: `${
                (users[0] > 0 ? 25 : 0) + 
                (implPackage ? 25 : 0) + 
                (Object.values(messengers).some(v => v > 0) ? 25 : 0) + 
                (fastDecision ? 25 : 0)
              }%` 
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-500">
          <span className={users[0] > 0 ? 'text-green-600 font-medium' : ''}>
            {users[0] > 0 ? '✓' : '○'} Пользователи
          </span>
          <span className={implPackage ? 'text-green-600 font-medium' : ''}>
            {implPackage ? '✓' : '○'} Пакет
          </span>
          <span className={Object.values(messengers).some(v => v > 0) ? 'text-green-600 font-medium' : ''}>
            {Object.values(messengers).some(v => v > 0) ? '✓' : '○'} Мессенджеры
          </span>
          <span className={fastDecision ? 'text-green-600 font-medium' : ''}>
            {fastDecision ? '✓' : '○'} Скидка
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8 interactive-section">
        <div className="lg:col-span-2 space-y-10">
          
          {/* Required Fields Reminder */}
          {users[0] === 0 && (
            <InfoCard variant="warning">
              <strong>Начните здесь!</strong> Укажите количество сотрудников для расчета стоимости внедрения CRM.
            </InfoCard>
          )}

          {/* 1. System Choice */}
          <section className="space-y-4">
             <h2 className="text-xl font-bold flex items-center gap-3 text-slate-800">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm text-slate-500">1</div>
                Платформа и Пользов��тели
             </h2>
             <Card className="bg-white/80 backdrop-blur-xl border-slate-200">
               <CardContent className="p-6 space-y-6">
                  {/* CRM Select */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCrm('amocrm')} 
                      className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center justify-between relative overflow-hidden ${crm === 'amocrm' ? 'border-[#E60000] bg-red-50/10' : 'border-slate-100 hover:bg-slate-50'}`}
                    >
                       <div className="relative z-10">
                          <div className="font-bold text-lg flex items-center gap-2">amoCRM</div>
                          <div className="text-xs text-slate-500">Оплата в рублях</div>
                       </div>
                       {crm === 'amocrm' && (
                         <>
                           <motion.div layoutId="active-crm-glow" className="absolute inset-0 bg-[#E60000]/5" />
                           <Check className="w-5 h-5 text-[#E60000] relative z-10" />
                         </>
                       )}
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCrm('kommo')} 
                      className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center justify-between relative overflow-hidden ${crm === 'kommo' ? 'border-[#E60000] bg-red-50/10' : 'border-slate-100 hover:bg-slate-50'}`}
                    >
                       <div className="relative z-10">
                          <div className="font-bold text-lg">Kommo</div>
                          <div className="text-xs text-slate-500">Оплата в долларах</div>
                       </div>
                       {crm === 'kommo' && (
                         <>
                           <motion.div layoutId="active-crm-glow" className="absolute inset-0 bg-[#E60000]/5" />
                           <Check className="w-5 h-5 text-[#E60000] relative z-10" />
                         </>
                       )}
                    </motion.div>
                  </div>

                  {/* License Tariff Selection (amoCRM only) */}
                  {crm === 'amocrm' && users[0] > 0 && (
                    <div className="pt-4">
                      <Label className="mb-3 block text-sm font-medium text-slate-600 flex items-center gap-2">
                        Тариф лицензии
                        <TooltipInfo content={
                          <div>
                            <p className="font-bold mb-2">Тарифы amoCRM:</p>
                            <ul className="space-y-1 text-xs">
                              <li><strong>Старт:</strong> до 3 воронок, базовый API</li>
                              <li><strong>Рост:</strong> до 10 воронок, Супер-поля, полный API</li>
                              <li><strong>Продвинутый:</strong> неогр. воронок, расширенная аналитика</li>
                            </ul>
                          </div>
                        } />
                      </Label>
                      <div className="grid grid-cols-3 gap-3">
                        {(['start', 'growth', 'enterprise'] as LicenseType[]).map(tariff => (
                          <div
                            key={tariff}
                            onClick={() => setLicenseTariff(tariff)}
                            className={`cursor-pointer p-3 rounded-lg border-2 transition-all text-center relative ${
                              licenseTariff === tariff
                                ? 'border-[#E60000] bg-red-50 shadow-md ring-2 ring-red-100'
                                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            {tariff === 'growth' && (
                              <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-1.5 py-0.5 border-0">
                                🔥 Популярный
                              </Badge>
                            )}
                            <div className="font-semibold text-sm">
                              {tariff === 'start' && 'Старт'}
                              {tariff === 'growth' && 'Рост'}
                              {tariff === 'enterprise' && 'Продвинутый'}
                            </div>
                            <div className="text-xs text-slate-500 mt-1">
                              {tariff === 'start' && '699 ₽/мес'}
                              {tariff === 'growth' && '1 199 ₽/мес'}
                              {tariff === 'enterprise' && '1 599 ₽/мес'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Users & Period */}
                  <div className="grid sm:grid-cols-2 gap-8 pt-2">
                     <div>
                        <Label className="mb-3 block text-sm font-medium text-slate-600">
                          Количество сотрудников 
                          <span className="text-xs text-slate-400 ml-2">(0 = без лицензий)</span>
                        </Label>
                        <div className="flex gap-4 items-center">
                           <div className="flex-1">
                              <Slider value={users} onValueChange={setUsers} min={0} max={50} step={1} className="py-2" />
                              {/* Метки на слайдере */}
                              <div className="flex justify-between text-xs text-slate-400 mt-1 px-1">
                                <span>0</span>
                                <span>10</span>
                                <span>25</span>
                                <span>50</span>
                              </div>
                           </div>
                           <Input 
                              type="number" 
                              value={userInputValue} 
                              onChange={handleUserInputChange}
                              onFocus={(e) => e.target.select()}
                              className="w-16 text-center font-bold h-10" 
                           />
                        </div>
                     </div>
                     <div>
                        <Label className="mb-3 block text-sm font-medium text-slate-600">
                          Период оплаты {users[0] > 0 ? 'лицензии' : 'сервисов'}
                        </Label>
                        <div className="flex bg-slate-100 p-1 rounded-lg">
                          {(crm === 'kommo' && licenseTariff === 'enterprise' ? [6, 9, 12, 24] : [6, 12, 24]).map(m => {
                             // Calculate implicit discount display
                             let label = '';
                             if (crm === 'amocrm') {
                               label = m === 12 ? '+2 мес' : m === 24 ? '+6 мес' : '';
                             } else if (crm === 'kommo' && licenseTariff === 'enterprise') {
                               label = '+1 мес';
                             }
                             return (
                               <div key={m} onClick={() => setPeriod(m)} className={`flex-1 relative text-center py-2 text-sm font-medium rounded-md cursor-pointer transition-all ${period === m ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>
                                  {m} мес
                                  {label && period !== m && <div className="absolute -top-2 right-0 text-[9px] text-green-600 bg-green-100 px-1 rounded-full whitespace-nowrap">{label}</div>}
                               </div>
                             );
                          })}
                        </div>
                        <div className="text-[10px] text-right mt-1">
                           {crm === 'amocrm' && users[0] > 0 && (
                             <>
                               {period === 6 && <span className="text-slate-400">Оплата 6 мес → получите 7 мес (1 мес от партнера)</span>}
                               {period === 12 && (
                                 <div className="space-y-0.5">
                                   <div className="text-slate-400">Оплата 10 мес → получите 13 мес (2+1 мес в подарок)</div>
                                   <div className="text-green-600 font-medium flex items-center justify-end gap-1">
                                     <Gift className="w-3 h-3" />
                                     Экономия: ~{Math.round(licenseRates[crm][licenseTariff] * users[0] * 3).toLocaleString()} ₽
                                   </div>
                                 </div>
                               )}
                               {period === 24 && (
                                 <div className="space-y-0.5">
                                   <div className="text-slate-400">Оплата 18 мес → получите 25 мес (6+1 мес в подарок)</div>
                                   <div className="text-green-600 font-medium flex items-center justify-end gap-1">
                                     <Gift className="w-3 h-3" />
                                     Экономия: ~{Math.round(licenseRates[crm][licenseTariff] * users[0] * 7).toLocaleString()} ₽
                                   </div>
                                 </div>
                               )}
                             </>
                           )}
                           {crm === 'kommo' && licenseTariff === 'enterprise' && users[0] > 0 && (
                             <>
                               {period === 6 && (
                                 <div className="text-slate-400">
                                   150$ за 6 мес → получите 7 мес (+1 в подарок)
                                 </div>
                               )}
                               {period === 9 && (
                                 <div className="text-slate-400">
                                   200$ за 9 мес → получите 10 мес (+1 в подарок)
                                 </div>
                               )}
                               {period === 12 && (
                                 <div className="text-slate-400">
                                   250$ за 12 мес → получите 13 мес (+1 в подарок)
                                 </div>
                               )}
                               {period === 24 && (
                                 <div className="text-slate-400">
                                   450$ за 24 мес → получите 25 мес (+1 в подарок)
                                 </div>
                               )}
                             </>
                           )}
                        </div>
                     </div>

                     {/* amoCRM Additional Options */}
                     {crm === 'amocrm' && users[0] > 0 && (
                       <div className="mt-6 pt-6 border-t border-slate-200">
                         <Label className="mb-3 block text-sm font-medium text-slate-600">Дополнительные опции amoCRM</Label>
                         <div className="space-y-3">
                           {/* File Storage - доступно всем */}
                           <div className="flex items-start space-x-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                             <Checkbox 
                               id="fileStorage" 
                               checked={amoCrmOptions.fileStorage}
                               onCheckedChange={(checked) => setAmoCrmOptions(prev => ({ ...prev, fileStorage: checked as boolean }))}
                             />
                             <div className="flex-1">
                               <label htmlFor="fileStorage" className="text-sm font-medium cursor-pointer flex items-center gap-2">
                                 Файловое пространство
                                 <Badge variant="outline" className="text-xs">999 ₽/мес</Badge>
                               </label>
                               <p className="text-xs text-slate-500 mt-1">
                                 Расширенное хранилище файлов для всех тарифов
                               </p>
                               {amoCrmOptions.fileStorage && (
                                 <p className="text-xs text-green-600 mt-1 font-medium">
                                   Итого: {(999 * totalDurationLicense).toLocaleString()} ₽ ({totalDurationLicense} мес)
                                 </p>
                               )}
                             </div>
                           </div>

                           {/* Super Fields - только Growth и Enterprise */}
                           <div className={`flex items-start space-x-3 p-3 rounded-lg border transition-colors ${
                             licenseTariff === 'start' 
                               ? 'border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed' 
                               : 'border-slate-200 hover:bg-slate-50'
                           }`}>
                             <Checkbox 
                               id="superFields" 
                               checked={amoCrmOptions.superFields}
                               disabled={licenseTariff === 'start'}
                               onCheckedChange={(checked) => setAmoCrmOptions(prev => ({ ...prev, superFields: checked as boolean }))}
                             />
                             <div className="flex-1">
                               <label htmlFor="superFields" className={`text-sm font-medium flex items-center gap-2 ${licenseTariff === 'start' ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                                 Супер-поля
                                 <Badge variant="outline" className="text-xs">999 ₽/мес</Badge>
                                 {licenseTariff === 'start' && (
                                   <Badge variant="secondary" className="text-xs">Требуется Рост или Продвинутый</Badge>
                                 )}
                               </label>
                               <p className="text-xs text-slate-500 mt-1">
                                 Расширенные поля для тарифов Рост и Продвинутый
                               </p>
                               {amoCrmOptions.superFields && licenseTariff !== 'start' && (
                                 <p className="text-xs text-green-600 mt-1 font-medium">
                                   Итого: {(999 * totalDurationLicense).toLocaleString()} ₽ ({totalDurationLicense} мес)
                                 </p>
                               )}
                             </div>
                           </div>
                         </div>
                       </div>
                     )}
                  </div>
               </CardContent>
             </Card>
          </section>

          {/* 2. Packages */}
          <section className="space-y-4">
             <h2 className="text-xl font-bold flex items-center gap-3 text-slate-800">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm text-slate-500">2</div>
                Пакет внедрения
             </h2>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Card: BASE */}
                <motion.div 
                   whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
                   whileTap={{ scale: 0.98 }}
                   onClick={() => setImplPackage('base')} 
                   className={`relative group rounded-2xl border-2 p-6 cursor-pointer bg-white transition-colors ${implPackage === 'base' ? 'border-slate-800 ring-1 ring-slate-800' : 'border-slate-100 hover:border-slate-300'}`}
                >
                   <div className="mb-4">
                      <h3 className="font-bold text-lg">Базовый</h3>
                      <p className="text-xs text-slate-500 mb-3 h-8">{implPackages.base.desc}</p>
                      <div className="text-2xl font-bold text-slate-900">60 000 ₽</div>
                   </div>
                   <div className="mb-4 flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-50 p-2 rounded">
                      <Clock className="w-3 h-3" /> {implPackages.base.timeline}
                   </div>
                   <ul className="space-y-2.5">
                      {implPackages.base.features.map((f, i) => (
                         <li key={i} className={`flex items-start gap-2 text-xs leading-tight ${f.included ? 'text-slate-700' : 'text-slate-300'}`}>
                            {f.included ? <Check className="w-3.5 h-3.5 mt-0.5 text-green-600 shrink-0" /> : <X className="w-3.5 h-3.5 mt-0.5 shrink-0" />}
                            <span>{f.name}</span>
                         </li>
                      ))}
                   </ul>
                </motion.div>

                {/* Card: BUSINESS */}
                <motion.div 
                   whileHover={{ y: -8, boxShadow: "0 20px 40px -10px rgba(230, 0, 0, 0.15)" }}
                   whileTap={{ scale: 0.98 }}
                   onClick={() => setImplPackage('standard')} 
                   className={`relative rounded-2xl border-2 p-6 cursor-pointer bg-white transition-colors ${implPackage === 'standard' ? 'border-[#E60000] ring-1 ring-[#E60000] z-10' : 'border-slate-100 hover:border-red-200'}`}
                >
                   <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E60000] text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg z-20">
                      <Star className="w-3 h-3 fill-white" /> ХИТ ПРОДАЖ
                   </div>
                   {/* Animated sheen effect */}
                   {implPackage === 'standard' && (
                      <motion.div 
                        initial={{ x: '-100%', opacity: 0 }}
                        animate={{ x: '100%', opacity: 0.5 }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", repeatDelay: 1 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none"
                      />
                   )}
                   <div className="mb-4 relative z-10">
                      <h3 className="font-bold text-lg text-[#E60000]">Бизнес</h3>
                      <p className="text-xs text-slate-500 mb-3 h-8">{implPackages.standard.desc}</p>
                      <div className="text-2xl font-bold text-slate-900">90 000 ₽</div>
                   </div>
                   <div className="mb-4 flex items-center gap-2 text-xs font-medium text-red-700 bg-red-50 p-2 rounded relative z-10">
                      <Clock className="w-3 h-3" /> {implPackages.standard.timeline}
                   </div>
                   <ul className="space-y-2.5 relative z-10">
                      {implPackages.standard.features.map((f, i) => (
                         <li key={i} className={`flex items-start gap-2 text-xs leading-tight ${f.included ? 'text-slate-900 font-medium' : 'text-slate-300'}`}>
                            {f.included ? <Check className="w-3.5 h-3.5 mt-0.5 text-[#E60000] shrink-0" /> : <X className="w-3.5 h-3.5 mt-0.5 shrink-0" />}
                            <span className="flex flex-col">
                               {f.name}
                               {f.note && <span className="text-[9px] text-slate-400 font-normal mt-0.5">{f.note}</span>}
                            </span>
                         </li>
                      ))}
                   </ul>
                </motion.div>

                {/* Card: CUSTOM */}
                <motion.div 
                   whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
                   whileTap={{ scale: 0.98 }}
                   onClick={() => setImplPackage('custom')} 
                   className={`relative rounded-2xl border-2 p-6 cursor-pointer bg-white transition-colors ${implPackage === 'custom' ? 'border-slate-800 ring-1 ring-slate-800' : 'border-slate-100 hover:border-slate-300'}`}
                >
                   <div className="mb-4">
                      <h3 className="font-bold text-lg">Кастом</h3>
                      <p className="text-xs text-slate-500 mb-3 h-8">{implPackages.custom.desc}</p>
                      <div className="text-2xl font-bold text-slate-900"><span className="text-sm font-normal text-slate-400">от </span>150 000 ₽</div>
                   </div>
                   <div className="mb-4 flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-50 p-2 rounded">
                      <Clock className="w-3 h-3" /> {implPackages.custom.timeline}
                   </div>
                   <ul className="space-y-2.5">
                      {implPackages.custom.features.map((f, i) => (
                         <li key={i} className="flex items-start gap-2 text-xs leading-tight text-slate-700">
                            <Check className="w-3.5 h-3.5 mt-0.5 text-slate-800 shrink-0" />
                            <span>{f.name}</span>
                         </li>
                      ))}
                   </ul>
                </motion.div>
             </div>

             {/* Custom Constructor Panel */}
             <AnimatePresence>
                {implPackage === 'custom' && (
                   <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                   >
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mt-2 relative">
                         <div className="absolute top-0 left-8 -translate-y-1/2 w-4 h-4 bg-slate-50 border-t border-l border-slate-200 rotate-45"></div>
                         <h4 className="font-bold mb-4 flex items-center gap-2 text-slate-700 text-sm uppercase tracking-wider">
                            <Wrench className="w-4 h-4" />
                            Добавьте услуги
                         </h4>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className={`p-4 rounded-lg border cursor-pointer transition-all flex items-center justify-between group ${sources.site ? 'bg-white border-slate-800 shadow-md' : 'bg-white/50 border-slate-200 hover:border-slate-300'}`} onClick={() => setSources(p => ({...p, site: !p.site}))}>
                               <div className="flex items-center gap-3">
                                  <Checkbox checked={sources.site} />
                                  <span className="font-medium text-sm">Сайт / Квиз</span>
                               </div>
                               <Badge variant="secondary">10 000 ₽</Badge>
                            </div>
                            <div className={`p-4 rounded-lg border cursor-pointer transition-all flex items-center justify-between group ${sources.landing ? 'bg-white border-slate-800 shadow-md' : 'bg-white/50 border-slate-200 hover:border-slate-300'}`} onClick={() => setSources(p => ({...p, landing: !p.landing}))}>
                               <div className="flex items-center gap-3">
                                  <Checkbox checked={sources.landing} />
                                  <span className="font-medium text-sm">Лендинг</span>
                               </div>
                               <Badge variant="secondary">5 000 ₽</Badge>
                            </div>
                            <div className={`p-4 rounded-lg border cursor-pointer transition-all flex items-center justify-between group ${sources.email ? 'bg-white border-slate-800 shadow-md' : 'bg-white/50 border-slate-200 hover:border-slate-300'}`} onClick={() => setSources(p => ({...p, email: !p.email}))}>
                               <div className="flex items-center gap-3">
                                  <Checkbox checked={sources.email} />
                                  <span className="font-medium text-sm">Email-рассылки</span>
                               </div>
                               <Badge variant="secondary">5 000 ₽</Badge>
                            </div>
                            <div className={`p-4 rounded-lg border cursor-pointer transition-all flex items-center justify-between group ${sources.calls ? 'bg-white border-slate-800 shadow-md' : 'bg-white/50 border-slate-200 hover:border-slate-300'}`} onClick={() => setSources(p => ({...p, calls: !p.calls}))}>
                               <div className="flex items-center gap-3">
                                  <Checkbox checked={sources.calls} />
                                  <span className="font-medium text-sm">Телефония</span>
                               </div>
                               <Badge variant="secondary">15 000 ₽</Badge>
                            </div>
                            <div className={`p-4 rounded-lg border cursor-pointer transition-all flex items-center justify-between group ${widgets.training ? 'bg-white border-slate-800 shadow-md' : 'bg-white/50 border-slate-200 hover:border-slate-300'}`} onClick={() => setWidgets(p => ({...p, training: !p.training}))}>
                               <div className="flex items-center gap-3">
                                  <Checkbox checked={widgets.training} />
                                  <span className="font-medium text-sm">Обучение сотрудников</span>
                               </div>
                               <Badge variant="secondary">15 000 ₽</Badge>
                            </div>
                         </div>
                      </div>
                   </motion.div>
                )}
             </AnimatePresence>
          </section>

          {/* 3. Add-ons */}
          <section className="space-y-4">
             <div 
               onClick={() => setAddonsExpanded(!addonsExpanded)}
               className="flex items-center justify-between cursor-pointer group hover:bg-slate-50 p-4 rounded-lg transition-colors"
             >
               <h2 className="text-xl font-bold flex items-center gap-3 text-slate-800">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm text-slate-500">3</div>
                  Дополнительные модули
                  {(widgets.ones || widgets.roistat || widgets.docs) && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {[widgets.ones, widgets.roistat, widgets.docs].filter(Boolean).length} выбрано
                    </Badge>
                  )}
               </h2>
               <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${addonsExpanded ? 'rotate-180' : ''}`} />
             </div>
             
             <AnimatePresence>
               {addonsExpanded && (
                 <motion.div
                   initial={{ height: 0, opacity: 0 }}
                   animate={{ height: 'auto', opacity: 1 }}
                   exit={{ height: 0, opacity: 0 }}
                   transition={{ duration: 0.3 }}
                 >
                   <Card className="bg-white/80 backdrop-blur-xl border-slate-200">
                      <CardContent className="p-0 divide-y divide-slate-100">
                         {/* 1C */}
                         <div className={`p-4 transition-all ${widgets.ones ? 'bg-red-50/5' : ''}`}>
                            <div className="flex items-center gap-4">
                               <Checkbox id="w_ones" checked={widgets.ones} onCheckedChange={(c) => setWidgets(p => ({...p, ones: !!c}))} className="w-5 h-5" />
                               <div className="flex-1">
                                  <Label htmlFor="w_ones" className="font-bold text-base cursor-pointer flex items-center gap-2">
                                    Интеграция с 1С
                                    <TooltipInfo content="Двусторонняя синхронизация товаров, счетов, контрагентов между 1С и CRM. Доступны 3 тарифа." />
                                  </Label>
                                  <p className="text-xs text-slate-500">Двусторонняя синхронизация (товары, счета, контрагенты)</p>
                               </div>
                               {widgets.ones && <Badge className="bg-[#E60000]">Выбрано</Badge>}
                            </div>
                            {widgets.ones && (
                               <div className="mt-4 pl-9">
                                  <div className="grid grid-cols-3 gap-3">
                                     {['base', 'prof', 'corp'].map((t) => (
                                        <div key={t} onClick={() => setOnesTariff(t as any)} className={`text-center p-2 rounded border cursor-pointer transition-all ${onesTariff === t ? 'bg-slate-800 text-white border-slate-800 shadow-lg' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
                                           <div className="text-[10px] opacity-70 uppercase mb-1">Тариф</div>
                                           <div className="font-bold text-xs uppercase mb-1">{t}</div>
                                           <div className="text-xs font-mono">{onesRates[t as OnesTariffType].total.toLocaleString()} ₽</div>
                                        </div>
                                     ))}
                                  </div>
                               </div>
                            )}
                         </div>
                         {/* Roistat - UPDATED WITH FIX */}
                         <div className="p-4 flex items-center gap-4 hover:bg-slate-50/50 transition-colors">
                            <Checkbox id="w_roi" checked={widgets.roistat} onCheckedChange={(c) => setWidgets(p => ({...p, roistat: !!c}))} className="w-5 h-5" />
                            <div className="flex-1">
                               <div className="flex items-center gap-2">
                                  <Label htmlFor="w_roi" className="font-bold text-base cursor-pointer block">Roistat (Аналитика)</Label>
                                  <Tooltip>
                                     <TooltipTrigger>
                                        <Info className="w-4 h-4 text-slate-400" />
                                     </TooltipTrigger>
                                     <TooltipContent><p className="w-64">Система сквозной аналитики, которая показывает, с какой рекламы приходят реальные продажи.</p></TooltipContent>
                                  </Tooltip>
                               </div>
                               <p className="text-xs text-slate-500">Сквозная аналитика и коллтрекинг</p>
                            </div>
                            <div className="font-bold text-sm text-slate-600">+40 000 ₽</div>
                         </div>
                         {/* Docs */}
                         <div className="p-4 flex items-center gap-4 hover:bg-slate-50/50 transition-colors">
                            <Checkbox id="w_doc" checked={widgets.docs} onCheckedChange={(c) => setWidgets(p => ({...p, docs: !!c}))} className="w-5 h-5" />
                            <div className="flex-1">
                               <Label htmlFor="w_doc" className="font-bold text-base cursor-pointer flex items-center gap-2">
                                 Генерация документов
                                 <TooltipInfo content="Автоматическое создание договоров, КП и других документов по шаблонам прямо из CRM." />
                               </Label>
                               <p className="text-xs text-slate-500">��аблоны договоров и КП в один клик</p>
                            </div>
                            <div className="font-bold text-sm text-slate-600">+15 000 ₽</div>
                         </div>
                      </CardContent>
                   </Card>
                   
                   {/* Contextual Help */}
                   {(widgets.ones || widgets.roistat || widgets.docs) && (
                     <InfoCard variant="tip" className="mt-4">
                       <strong>Совет:</strong> Выбранные модули значительно расширят возможности CRM. Все они включают техподдержку и обновления.
                     </InfoCard>
                   )}
                 </motion.div>
               )}
             </AnimatePresence>
          </section>

          {/* 4. Communication Licenses */}
          <section className="space-y-4">
             <div className="flex justify-between items-end">
                <h2 className="text-xl font-bold flex items-center gap-3 text-slate-800">
                   <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm text-slate-500">4</div>
                   Лицензии коммуникации
                </h2>
                <div className="text-xs text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded border border-orange-100">
                   Регулярная оплата
                </div>
             </div>

             <Card className="bg-white/80 backdrop-blur-xl border-slate-200">
                <CardHeader className="pb-4 border-b border-slate-100">
                   <div className="flex justify-between items-center">
                      <div className="text-sm text-slate-500">Период оплаты:</div>
                      <div className="flex bg-slate-100 p-1 rounded-lg">
                        {[3, 6, 12].map(m => {
                           let disc = 0;
                           if (m >= 12) disc = 20;
                           else if (m >= 6) disc = 15;
                           else if (m >= 3) disc = 10;
                           return (
                            <button key={m} onClick={() => setMessengerPeriod(m)} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${messengerPeriod === m ? 'bg-white shadow text-[#E60000]' : 'text-slate-500'}`}>
                               {m} мес {disc > 0 && `(-${disc}%)`}
                            </button>
                           )
                        })}
                      </div>
                   </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                   {/* Telegram Bot - Free */}
                   <div className="p-4 rounded-xl border-2 border-dashed border-purple-300 bg-purple-50/30">
                      <div className="flex items-center gap-4">
                         <Checkbox id="w_tgbot" checked={widgets.telegramBot} onCheckedChange={(c) => setWidgets(p => ({...p, telegramBot: !!c}))} className="w-5 h-5" />
                         <div className="flex-1">
                            <Label htmlFor="w_tgbot" className="font-bold text-base cursor-pointer flex items-center gap-2 flex-wrap">
                               Telegram бот
                               <TooltipInfo content="Готовый бот для автоматизации общения с клиентами в Telegram. Включено бесплатно!" />
                               <Badge className="text-xs bg-purple-500 text-white border-0">Новинка</Badge>
                               <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">Бесплатно</Badge>
                            </Label>
                            <p className="text-xs text-slate-500 mt-1">Автоматизация общения с клиентами</p>
                         </div>
                         <div className="font-bold text-sm text-green-600">Включено</div>
                      </div>
                   </div>

                   {/* Messengers */}
                   <div>
                      <h3 className="text-sm font-medium text-slate-600 mb-3">Мессенджеры (Radist)</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(messengers)
                        .filter(([key]) => {
                          // Для amoCRM показываем все кроме facebook_lead и messenger
                          if (crm === 'amocrm') {
                            return !['facebook_lead', 'messenger'].includes(key);
                          }
                          // Для Kommo убираем avito и vk, показываем facebook_lead и messenger
                          return !['avito', 'vk'].includes(key);
                        })
                        .map(([key, count]) => {
                          const nameMap = { 
                            whatsapp_grey: 'WhatsApp (QR)', 
                            waba: 'WABA (Офиц)', 
                            telegram: 'Telegram', 
                            vk: 'ВКонтакте', 
                            avito: 'Avito',
                            facebook_lead: 'Facebook Lead',
                            messenger: 'Messenger'
                          };
                          const name = nameMap[key as keyof typeof nameMap];
                          
                          return (
                            <motion.div 
                              key={key} 
                              whileHover={{ y: -2, boxShadow: "0 4px 12px -2px rgba(0,0,0,0.1)" }}
                              className={`p-3 rounded-xl border transition-all ${count > 0 ? 'border-orange-200 bg-orange-50/30' : 'border-slate-200 hover:border-slate-300'}`}
                            >
                               <div className="flex justify-between items-center mb-3">
                                  <div className="flex items-center gap-2">
                                     <span className="font-bold text-sm">{name}</span>
                                     {key === 'waba' && (
                                       <Tooltip>
                                          <TooltipTrigger><Info className="w-3 h-3 text-slate-400" /></TooltipTrigger>
                                          <TooltipContent><p className="w-48 text-xs">Официальный API. Защита от блокировок. Требует верификации компании.</p></TooltipContent>
                                       </Tooltip>
                                     )}
                                     {key === 'avito' && count >= 1 && (
                                       <Badge variant="outline" className="text-[10px] bg-green-50 text-green-700 border-green-200">1-й бесплатно</Badge>
                                     )}
                                     {(key === 'facebook_lead' || key === 'messenger') && crm === 'kommo' && (
                                       <Badge variant="outline" className="text-[10px] bg-green-50 text-green-700 border-green-200">Бесплатно</Badge>
                                     )}
                                  </div>
                                  {count > 0 && <Badge variant="outline" className="bg-white text-orange-600 border-orange-200">{count} шт</Badge>}
                               </div>
                               <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg overflow-hidden">
                                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none hover:bg-slate-50" onClick={() => updateMessenger(key as any, -1)}><Minus className="w-3 h-3" /></Button>
                                  <motion.span 
                                    key={`${key}-${count}`}
                                    initial={{ scale: 1.3, color: '#E60000' }}
                                    animate={{ scale: 1, color: '#000000' }}
                                    transition={{ duration: 0.3 }}
                                    className="text-sm w-6 text-center font-medium"
                                  >
                                    {count}
                                  </motion.span>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none hover:bg-slate-50" onClick={() => updateMessenger(key as any, 1)}><Plus className="w-3 h-3" /></Button>
                               </div>
                            </motion.div>
                          );
                       })}
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                         <Info className="w-4 h-4" />
                         <span>Не забудьте добавить количество аккаунтов, даже если настройка включена в пакет.</span>
                      </div>
                   </div>
                </CardContent>
             </Card>
             
             {/* Savings Info */}
             {messengerPeriod === 12 && Object.values(messengers).some(v => v > 0) && (
               <InfoCard variant="success" className="mt-4">
                 <strong>��тличный выбор!</strong> При оплате за 12 месяцев вы экономите до 20% на тарифах мессенджеров.
               </InfoCard>
             )}
          </section>

          {/* Summary Section */}
          {users[0] > 0 && implPackage && (
            <section className="mt-8">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-900">
                    <CheckCircle2 className="w-5 h-5" />
                    Итоговая конфигурация
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-xs text-slate-500 mb-1">Платформа</div>
                      <div className="font-bold text-slate-900">{crm === 'amocrm' ? 'amoCRM' : 'Kommo'}</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-xs text-slate-500 mb-1">Пользователей</div>
                      <div className="font-bold text-slate-900">{users[0]} чел</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-xs text-slate-500 mb-1">Пакет</div>
                      <div className="font-bold text-slate-900">{implPackages[implPackage].name}</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-xs text-slate-500 mb-1">Мессенджеров</div>
                      <div className="font-bold text-slate-900">{Object.values(messengers).reduce((a, b) => a + b, 0)} шт</div>
                    </div>
                  </div>
                  {paybackMonths && users[0] > 0 && monthlySavings > 0 && (
                    <InfoCard variant="success">
                      <div>
                        <strong>Прогноз окупаемости:</strong> ~{paybackMonths.toFixed(1)} мес
                        <div className="text-xs mt-1">Ежемесячная экономия ~{monthlySavings.toLocaleString()} ₽</div>
                      </div>
                    </InfoCard>
                  )}
                </CardContent>
              </Card>
            </section>
          )}

        </div>

        {/* Sticky Summary & ROI */}
        <div className="lg:col-span-1">
           <div className="sticky top-24 space-y-6">
              <Card className="bg-[#101010] text-white border-slate-800 shadow-2xl overflow-hidden relative ring-1 ring-white/10">
                 {/* Animated background blobs */}
                 <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div 
                       animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.1, 0.2, 0.1],
                          rotate: [0, 10, 0]
                       }}
                       transition={{ duration: 8, repeat: Infinity }}
                       className="absolute -top-20 -right-20 w-64 h-64 bg-[#E60000] rounded-full blur-[80px]" 
                    />
                    <motion.div 
                       animate={{ 
                          scale: [1, 1.1, 1],
                          opacity: [0.05, 0.1, 0.05],
                          x: [0, -20, 0]
                       }}
                       transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                       className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600 rounded-full blur-[80px]" 
                    />
                 </div>
                 
                 <CardHeader className="relative z-10 border-b border-white/10 pb-4">
                    <CardTitle className="text-white flex items-center gap-2">
                       <Calculator className="w-5 h-5 text-[#E60000]" />
                       Итоговая смета
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                       Расчет стоимости проекта
                    </CardDescription>
                 </CardHeader>
                 
                 <CardContent className="space-y-6 relative z-10 pt-6">
                    <div className="space-y-4">
                       {/* Implementation Cost */}
                       <div className="flex justify-between items-end">
                          <div className="text-sm text-slate-400">Внедрение</div>
                          <div className="text-right">
                             {costs.implementationDiscount > 0 && (
                                <div className="text-xs text-[#E60000] line-through mb-0.5 opacity-70">
                                   {costs.implementationRaw.toLocaleString()} ₽
                                </div>
                             )}
                             <div className="text-lg font-bold font-mono">
                                <CipherReveal key={costs.implementation} text={costs.implementation.toLocaleString()} /> ₽
                             </div>
                          </div>
                       </div>
                       
                       {/* License Cost */}
                       {users[0] > 0 && (
                         <div className="flex justify-between items-end">
                            <div className="text-sm text-slate-400">
                               {crm === 'kommo' && licenseTariff === 'enterprise' ? (
                                 <>Лицензии <span className="text-xs opacity-50">(пакет {period} мес → {totalDurationLicense} мес)</span></>
                               ) : (
                                 <>Лицензии <span className="text-xs opacity-50">({totalDurationLicense} мес)</span></>
                               )}
                            </div>
                            <div className="text-right">
                               <div className="text-lg font-bold font-mono text-[#E60000]">
                                  <CipherReveal key={costs.license} text={costs.license.toLocaleString()} /> {currencySymbol}
                               </div>
                            </div>
                         </div>
                       )}

                       {/* amoCRM Options Cost */}
                       {costs.amoCrmOptions > 0 && (
                          <div className="flex justify-between items-end">
                             <div className="text-sm text-slate-400">
                                Доп. опции amoCRM <span className="text-xs opacity-50">({totalDurationLicense} мес)</span>
                             </div>
                             <div className="text-right">
                                <div className="text-lg font-bold font-mono text-[#E60000]">
                                   <CipherReveal key={costs.amoCrmOptions} text={costs.amoCrmOptions.toLocaleString()} /> ₽
                                </div>
                                <div className="text-[10px] text-slate-500 mt-1">
                                   {amoCrmOptions.superFields && "Супер-поля"}
                                   {amoCrmOptions.superFields && amoCrmOptions.fileStorage && " • "}
                                   {amoCrmOptions.fileStorage && "Файловое хранилище"}
                                </div>
                             </div>
                          </div>
                       )}

                       {/* Services Cost */}
                       {costs.messengerSubscription > 0 && (
                          <div className="flex justify-between items-end">
                             <div className="text-sm text-slate-400">
                                Сервисы <span className="text-xs opacity-50">({messengerPeriod} мес)</span>
                             </div>
                             <div className="text-right">
                                <div className="text-lg font-bold font-mono text-slate-300">
                                   <CipherReveal key={costs.messengerSubscription} text={costs.messengerSubscription.toLocaleString()} /> ₽
                                </div>
                             </div>
                          </div>
                       )}

                       {/* Total Divider */}
                       <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4" />

                       {/* Grand Total */}
                       <motion.div
                         key={grandTotal}
                         initial={{ scale: 1.1, opacity: 0.8 }}
                         animate={{ scale: 1, opacity: 1 }}
                         transition={{ duration: 0.3 }}
                       >
                          <div className="text-xs text-slate-500 uppercase tracking-widest mb-1 text-center">Итого к оплате</div>
                          <div className="flex flex-col items-center justify-center">
                             <div className="text-4xl font-bold font-mono text-white tracking-tight flex items-center gap-2">
                                <CipherReveal key={grandTotal} text={grandTotal.toLocaleString()} />
                                <span className="text-2xl text-slate-500">₽</span>
                             </div>
                             {crm === 'kommo' && (
                                <div className="text-sm text-slate-400 mt-1 font-mono">
                                   + <CipherReveal key={costs.license} text={costs.license.toString()} /> USD
                                </div>
                             )}
                          </div>
                       </motion.div>

                       {/* Fast Decision Switch */}
                       <motion.div 
                         className="bg-green-500/10 border border-green-500/20 p-3 rounded flex items-center justify-between no-print relative overflow-hidden"
                         animate={fastDecision ? { 
                           boxShadow: ['0 0 0 0 rgba(34, 197, 94, 0)', '0 0 0 10px rgba(34, 197, 94, 0)']
                         } : {}}
                         transition={{ duration: 2, repeat: fastDecision ? Infinity : 0 }}
                       >
                           <div>
                              <div className="text-sm font-bold text-green-400 flex items-center gap-2">
                                Решение сегодня
                                {fastDecision && <Badge className="bg-green-600 text-white border-0 text-[10px]">-{costs.implementationDiscount.toLocaleString()} ₽</Badge>}
                              </div>
                              <div className="text-[10px] text-green-300/70">Скидка 10% на работы</div>
                           </div>
                           <Switch checked={fastDecision} onCheckedChange={setFastDecision} className="data-[state=checked]:bg-green-500" />
                       </motion.div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 pt-2">
                       <MagneticButton className="w-full">
                          <Button onClick={() => setLeadFormOpen(true)} className="w-full bg-[#E60000] hover:bg-[#cc0000] text-white h-12 shadow-lg shadow-red-900/20 group relative overflow-hidden border-0">
                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                             <FileText className="w-5 h-5 mr-2" />
                             Получить КП на почту
                          </Button>
                       </MagneticButton>
                       
                       <div className="grid grid-cols-3 gap-2">
                          <MagneticButton className="w-full">
                             <Button variant="outline" onClick={handleSendToManager} className="w-full border-white/10 text-slate-300 hover:bg-white/5 hover:text-white hover:border-white/20 text-xs px-2">
                                <Send className="w-4 h-4 mr-1" />
                                WhatsApp
                             </Button>
                          </MagneticButton>
                          <MagneticButton className="w-full">
                             <Button variant="outline" onClick={handleCopy} className="w-full border-white/10 text-slate-300 hover:bg-white/5 hover:text-white hover:border-white/20 text-xs px-2">
                                <Copy className="w-4 h-4 mr-1" />
                                Копия
                             </Button>
                          </MagneticButton>
                          <MagneticButton className="w-full">
                             <Button variant="outline" onClick={handleShare} className="w-full border-white/10 text-slate-300 hover:bg-white/5 hover:text-white hover:border-white/20 text-xs px-2">
                                <ExternalLink className="w-4 h-4 mr-1" />
                                Ссылка
                             </Button>
                          </MagneticButton>
                       </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="pt-4 flex items-center justify-center gap-4 text-[10px] text-slate-500 uppercase tracking-wider">
                       <div className="flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-[#E60000]" />
                          Гарантия
                       </div>
                       <div className="flex items-center gap-1">
                          <Zap className="w-3 h-3 text-[#E60000]" />
                          Быстрый старт
                       </div>
                    </div>
                 </CardContent>
              </Card>
              
               {/* ROI Calculation Card */}
               <Card className="bg-white border border-slate-200 shadow-lg no-print">
                  <CardHeader className="pb-3">
                     <CardTitle className="text-base font-bold flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        Окупаемость (ROI)
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     {users[0] > 0 ? (
                       <>
                         <div className="space-y-2">
                            <Label className="text-xs text-slate-500">Средняя ЗП менеджера (₽)</Label>
                            <Input 
                               type="number" 
                               value={avgSalary} 
                               onChange={(e) => setAvgSalary(Number(e.target.value))} 
                               className="h-8 text-sm"
                            />
                         </div>
                         <div className="bg-slate-50 p-3 rounded-lg space-y-2">
                            <div className="flex justify-between text-sm">
                               <span className="text-slate-600">Экономия в месяц:</span>
                               <span className="font-bold text-green-600">~{monthlySavings.toLocaleString()} ₽</span>
                            </div>
                            <div className="flex justify-between text-sm">
                               <span className="text-slate-600">Окупаемость:</span>
                               <span className="font-bold text-slate-900">{paybackMonths.toFixed(1)} мес.</span>
                            </div>
                            <p className="text-[10px] text-slate-400 leading-tight pt-1">
                               * При росте эффективности работы отдела на 20% за счет автоматизации рутины.
                            </p>
                         </div>
                       </>
                     ) : (
                       <div className="bg-slate-50 p-4 rounded-lg text-center">
                         <p className="text-sm text-slate-500">
                           Укажите количество сотрудников для расчета окупаемости
                         </p>
                       </div>
                     )}
                  </CardContent>
               </Card>
           </div>
        </div>

      </div>

      {/* Breakdown Table */}
      <div className="mt-12 md:mt-16">
         <h3 className="text-xl font-bold mb-6 print:mb-4">Детализация расчета</h3>
         <Card className="shadow-sm border-slate-200 print:shadow-none print:border-none print:p-0 overflow-hidden">
            <CardContent className="p-0">
               <div className="overflow-x-auto">
                 <Table className="min-w-[600px]">
                    <TableHeader className="bg-slate-50">
                       <TableRow>
                          <TableHead className="w-[50%] text-slate-900 font-bold pl-6">Наименование услуги</TableHead>
                          <TableHead className="text-right text-slate-900 font-bold">Цена</TableHead>
                          <TableHead className="text-center text-slate-900 font-bold">Кол-во</TableHead>
                          <TableHead className="text-right text-slate-900 font-bold pr-6">Сумма</TableHead>
                       </TableRow>
                    </TableHeader>
                    <TableBody>
                       {/* Group 1: Implementation */}
                       <TableRow className="bg-slate-50/50"><TableCell colSpan={4} className="pl-6 text-xs font-bold text-slate-500 uppercase tracking-wider pt-4">Внедрение и Настройка</TableCell></TableRow>
                       {lineItems.map((item, i) => (
                          <TableRow key={i} className="hover:bg-slate-50/50">
                             <TableCell className="font-medium pl-6 text-slate-700 whitespace-normal">{item.name}</TableCell>
                             <TableCell className="text-right font-mono text-slate-600 whitespace-nowrap">{formatPrice(item.price)}</TableCell>
                             <TableCell className="text-center text-slate-500 text-sm whitespace-nowrap">{item.quantity} {item.unit}</TableCell>
                             <TableCell className="text-right font-bold font-mono pr-6 whitespace-nowrap">{formatPrice(item.total)}</TableCell>
                          </TableRow>
                       ))}
                       
                       {fastDecision && (
                          <TableRow className="bg-green-50/50">
                             <TableCell className="font-bold text-green-700 pl-6">✨ Скидка за быстрое решение</TableCell>
                             <TableCell></TableCell>
                             <TableCell className="text-center text-green-700 font-bold">10%</TableCell>
                             <TableCell className="text-right font-bold text-green-700 pr-6 whitespace-nowrap">-{costs.implementationDiscount.toLocaleString()} ₽</TableCell>
                          </TableRow>
                       )}

                       {/* Group 2: Licenses */}
                       {subItems.length > 0 && (
                          <TableRow className="bg-slate-50/50"><TableCell colSpan={4} className="pl-6 text-xs font-bold text-slate-500 uppercase tracking-wider pt-4">Лицензии и Подписки</TableCell></TableRow>
                       )}
                       {subItems.map((item, i) => (
                          <TableRow key={`sub-${i}`} className="hover:bg-slate-50/50">
                             <TableCell className="pl-6 whitespace-normal">
                                <span className="font-medium text-slate-700">{item.name}</span>
                                {item.discount > 0 && <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-[10px] bg-green-100 text-green-700">-{Math.round(item.discount * 100)}%</Badge>}
                             </TableCell>
                             <TableCell className="text-right font-mono text-slate-600 whitespace-nowrap">{typeof item.price === 'number' ? formatPrice(item.price) : item.price}</TableCell>
                             <TableCell className="text-center text-slate-500 text-sm whitespace-nowrap">{item.quantity}</TableCell>
                             <TableCell className="text-right font-bold font-mono text-orange-600 pr-6 whitespace-nowrap">{typeof item.total === 'number' ? formatPrice(item.total) : item.total}</TableCell>
                          </TableRow>
                       ))}

                       <TableRow className="bg-slate-900 hover:bg-slate-900">
                          <TableCell colSpan={3} className="text-right p-6 text-white font-medium text-lg">ИТОГО К ОПЛАТЕ:</TableCell>
                          <TableCell className="text-right p-6 text-white whitespace-nowrap">
                             {crm === 'amocrm' 
                                ? <span className="text-2xl font-bold font-mono">{(costs.implementation + costs.license + costs.amoCrmOptions + costs.messengerSubscription).toLocaleString()} ₽</span>
                                : <div className="flex flex-col items-end leading-tight">
                                    <span className="text-xl font-bold font-mono">{(costs.implementation + costs.messengerSubscription).toLocaleString()} ₽</span>
                                    <span className="text-sm text-slate-300 font-mono">+ {costs.license.toLocaleString()} $</span>
                                  </div>
                             }
                          </TableCell>
                       </TableRow>
                    </TableBody>
                 </Table>
               </div>
            </CardContent>
         </Card>
         <div className="hidden print-only mt-12 pt-8 border-t border-black">
            <div className="grid grid-cols-2 gap-12 text-sm">
                <div>
                   <p className="font-bold mb-2 text-black">Исполнитель:</p>
                   <p>ООО "Ко Агентство"</p>
                   <p className="mt-8 border-b border-black w-2/3"></p>
                   <p className="text-xs mt-1 text-gray-500">(подпись)</p>
                </div>
                <div>
                   <p className="font-bold mb-2 text-black">Заказчик:</p>
                   <p>_____________________</p>
                   <p className="mt-8 border-b border-black w-2/3"></p>
                   <p className="text-xs mt-1 text-gray-500">(подпись)</p>
                </div>
            </div>
         </div>
      </div>

      {/* --- NEW ROI BUSINESS SIMULATOR --- */}
      <BusinessSimulator totalCost={costs.implementation + costs.messengerSubscription + (crm === 'kommo' ? costs.license * 92 : costs.license)} />

    </div>

    {/* Lead Form Modal */}
    <LeadForm 
      open={leadFormOpen}
      onOpenChange={setLeadFormOpen}
      calculationData={{
        crm: crm.toUpperCase(),
        users: users[0],
        implPackage: implPackages[implPackage].name,
        totalCost: grandTotal,
        implementationCost: costs.implementation,
        licenseCost: costs.license,
        servicesCost: costs.messengerSubscription,
        calculationDetails: generateText()
      }}
    />

    </TooltipProvider>
  );
}

function BusinessSimulator({ totalCost }: { totalCost: number }) {
   const [leads, setLeads] = useState(100);
   const [conversion, setConversion] = useState(10); // percent
   const [check, setCheck] = useState(15000);
   const [targetConversion, setTargetConversion] = useState(15); // new absolute percent

   // Math
   const currentDeals = leads * (conversion / 100);
   const currentRevenue = currentDeals * check;

   const newDeals = leads * (targetConversion / 100);
   const newRevenue = newDeals * check;

   const profitDelta = newRevenue - currentRevenue;
   
   // Growth percentage calculation for display
   const growthPercent = conversion > 0 ? ((targetConversion - conversion) / conversion * 100) : 0;
   
   // Payback in days
   const daysToPayback = profitDelta > 0 ? Math.ceil((totalCost / (profitDelta / 30))) : 0;
   const isProfitable = daysToPayback > 0 && daysToPayback < 365;

   return (
      <section className="mt-12 md:mt-24 pt-12 md:pt-16 border-t border-slate-200 no-print">
         <div className="text-center mb-8 md:mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
               <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Зачем вам <span className="text-[#E60000]">CRM?</span>
               </h2>
               <p className="text-slate-500 max-w-2xl mx-auto">
                  Введите показатели вашего бизнеса, чтобы увидеть, сколько денег вы теряете без системной работы с клиентами.
               </p>
            </motion.div>
         </div>

         <div className="grid lg:grid-cols-12 gap-8">
            {/* INPUTS */}
            <Card className="lg:col-span-5 bg-slate-50 border-slate-200 shadow-none h-fit">
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     <Calculator className="w-5 h-5 text-slate-400" />
                     Ваши показатели (в месяц)
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-8">
                  
                  {/* Leads */}
                  <div className="space-y-4">
                     <div className="flex justify-between">
                        <Label className="font-bold text-slate-700">Количество заявок (Лиды)</Label>
                        <div className="text-sm font-mono bg-white px-2 py-0.5 rounded border border-slate-200">{leads}</div>
                     </div>
                     <Slider value={[leads]} onValueChange={(v) => setLeads(v[0])} min={10} max={1000} step={10} />
                  </div>

                  {/* Conversion */}
                  <div className="space-y-4">
                     <div className="flex justify-between">
                        <Label className="font-bold text-slate-700">Текущая конверсия в продажу</Label>
                        <div className="text-sm font-mono bg-white px-2 py-0.5 rounded border border-slate-200">{conversion}%</div>
                     </div>
                     <Slider value={[conversion]} onValueChange={(v) => setConversion(v[0])} min={1} max={50} step={0.5} />
                  </div>

                  {/* Check */}
                  <div className="space-y-4">
                     <div className="flex justify-between">
                        <Label className="font-bold text-slate-700">Средний чек</Label>
                        <div className="text-sm font-mono bg-white px-2 py-0.5 rounded border border-slate-200">{check.toLocaleString()} ₽</div>
                     </div>
                     <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setCheck(Math.max(1000, check - 1000))}><Minus className="w-3 h-3" /></Button>
                        <Input 
                           type="number" 
                           value={check} 
                           onChange={(e) => setCheck(Number(e.target.value))} 
                           className="h-9 text-center"
                        />
                        <Button variant="outline" size="sm" onClick={() => setCheck(check + 1000)}><Plus className="w-3 h-3" /></Button>
                     </div>
                  </div>

                  {/* Target Conversion */}
                  <div className="pt-6 border-t border-slate-200">
                     <div className="flex justify-between mb-4">
                        <Label className="font-bold text-[#E60000] flex items-center gap-2">
                           <Zap className="w-4 h-4 fill-current" />
                           Конверсия с CRM
                        </Label>
                        <div className="flex items-center gap-2">
                           {growthPercent > 0 && <Badge className="bg-green-100 text-green-700 hover:bg-green-100">+{growthPercent.toFixed(0)}% рост</Badge>}
                           <span className="font-bold text-[#E60000] text-lg">{targetConversion}%</span>
                        </div>
                     </div>
                     <Slider 
                        value={[targetConversion]} 
                        onValueChange={(v) => setTargetConversion(v[0])} 
                        min={conversion} 
                        max={Math.min(100, conversion * 3)} 
                        step={0.5} 
                        className="py-2" 
                     />
                     <p className="text-xs text-slate-400 mt-2">
                        * Внедрение CRM в среднем увеличивает конверсию на 20-30% за счет исключения "забытых" клиентов и скорости реакции.
                     </p>
                  </div>

               </CardContent>
            </Card>

            {/* RESULTS Visualizer */}
            <div className="lg:col-span-7 space-y-6">
               
               {/* Comparison Cards */}
               <div className="grid sm:grid-cols-2 gap-4">
                  {/* Before */}
                  <motion.div 
                     whileHover={{ scale: 1.02 }}
                     className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm opacity-70 grayscale transition-all hover:grayscale-0"
                  >
                     <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Сейчас</div>
                     <div className="text-2xl font-bold text-slate-600 mb-4">{currentRevenue.toLocaleString()} ₽</div>
                     <div className="space-y-2 text-sm text-slate-500">
                        <div className="flex justify-between">
                           <span>Заявок:</span> <span>{leads}</span>
                        </div>
                        <div className="flex justify-between">
                           <span>Продаж:</span> <span>{Math.round(currentDeals)}</span>
                        </div>
                        <div className="flex justify-between">
                           <span>Конверсия:</span> <span>{conversion}%</span>
                        </div>
                     </div>
                  </motion.div>

                  {/* After */}
                  <motion.div 
                     initial={{ opacity: 0, scale: 0.9 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     whileHover={{ scale: 1.02 }}
                     transition={{ type: "spring", stiffness: 300, damping: 20 }}
                     className="p-6 rounded-2xl bg-white border-2 border-[#E60000]/10 shadow-xl relative overflow-hidden"
                  >
                     <div className="absolute top-0 right-0 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-bl-lg">CRM</div>
                     <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">С внедрением</div>
                     
                     {/* Animated Key for number pop effect */}
                     <motion.div 
                        key={newRevenue}
                        initial={{ scale: 1.2, color: "#25D366" }}
                        animate={{ scale: 1, color: "#0f172a" }}
                        className="text-3xl font-bold text-slate-900 mb-4"
                     >
                        {newRevenue.toLocaleString()} ₽
                     </motion.div>

                     <div className="space-y-2 text-sm text-slate-700 font-medium">
                         <div className="flex justify-between">
                           <span>Заявок:</span> <span>{leads}</span>
                        </div>
                        <div className="flex justify-between">
                           <span>Продаж:</span> <span className="text-green-600 font-bold">{Math.round(newDeals)} (+{Math.round(newDeals - currentDeals)})</span>
                        </div>
                        <div className="flex justify-between">
                           <span>Конверсия:</span> <span className="text-green-600 font-bold">{targetConversion}%</span>
                        </div>
                     </div>
                  </motion.div>
               </div>

               {/* The Big Result */}
               <Card className="bg-slate-900 border-none text-white overflow-hidden relative group">
                  {/* Animated background glow */}
                  <div className="absolute -right-10 -top-10 w-64 h-64 bg-green-500/20 blur-[80px] rounded-full pointer-events-none group-hover:bg-green-500/30 transition-colors duration-500"></div>
                  <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none"></div>

                  <CardContent className="p-8 relative z-10">
                     <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                           <h3 className="text-slate-400 font-medium mb-1">Дополнительная прибыль</h3>
                           <motion.div 
                              key={profitDelta}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-4xl md:text-5xl font-bold text-[#25D366] mb-2"
                           >
                              +{Math.round(profitDelta).toLocaleString()} ₽
                           </motion.div>
                           <p className="text-sm text-slate-400">Ежемесячно, только за счет наведения порядка</p>
                        </div>

                        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                           <div className="text-sm text-slate-300 mb-2">Окупаемость внедрения:</div>
                           {isProfitable ? (
                              <div className="flex items-baseline gap-2">
                                 <motion.span 
                                    key={daysToPayback}
                                    initial={{ scale: 1.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-3xl font-bold text-white"
                                 >
                                    {daysToPayback}
                                 </motion.span>
                                 <span className="text-lg text-slate-300">дней</span>
                              </div>
                           ) : (
                              <div className="text-white font-medium">Менее 1 месяца</div>
                           )}
                           <div className="mt-3 text-xs text-slate-400 border-t border-white/10 pt-2">
                              При стоимости проекта {totalCost.toLocaleString()} ₽
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </section>
   );
}
