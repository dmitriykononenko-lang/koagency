'use client';

import { Link } from '@/lib/router-shim';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  Clock,
  Edit3,
  Gauge,
  Layers,
  Mail,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';
import { Card } from '../ui/card';

const FEATURES = [
  {
    icon: Layers,
    title: 'Шаблон задаёт всё сразу',
    text: 'Комментарий, тип задачи (звонок, встреча и любые ваши типы), срок выполнения и ответственный.',
  },
  {
    icon: Clock,
    title: 'Гибкие сроки',
    text: 'В момент создания, через 15/30 минут, через час, до конца дня, завтра, через 2–3 дня, через неделю — или дата вручную.',
  },
  {
    icon: Users,
    title: 'Ответственный',
    text: 'Текущий пользователь, ответственный за карточку или конкретный сотрудник.',
  },
  {
    icon: Gauge,
    title: 'Понятный выбор',
    text: 'Перед постановкой видно: срок, ответственный, тип и комментарий готовой задачи.',
  },
  {
    icon: Zap,
    title: 'Удобные точки входа',
    text: 'Блок в карточке, переключатель типа сообщения, раздел «Задачи».',
  },
  {
    icon: Edit3,
    title: 'Простой редактор',
    text: 'Создание, изменение и удаление шаблонов без программиста.',
  },
];

const STEPS = [
  {
    n: '01',
    title: 'Установите виджет',
    text: 'Добавьте шаблоны в настройках — комментарий, тип, срок, ответственный.',
  },
  {
    n: '02',
    title: 'В карточке — один клик',
    text: 'Нажмите «Поставить задачу по шаблону» в карточке сделки / контакта / компании.',
  },
  {
    n: '03',
    title: 'Задача создана',
    text: 'Автоматически с нужными параметрами. Никакого ручного заполнения.',
  },
];

const PLANS = [
  {
    period: '3 месяца',
    price: '1490 ₽',
    perMonth: '≈ 497 ₽ / мес.',
    bonus: null,
  },
  {
    period: '6 месяцев',
    price: '2490 ₽',
    perMonth: '≈ 356 ₽ / мес.',
    bonus: '+1 месяц в подарок',
    highlight: true,
  },
  {
    period: '12 месяцев',
    price: '3990 ₽',
    perMonth: '≈ 285 ₽ / мес.',
    bonus: '+2 месяца в подарок',
  },
];

const FAQ = [
  {
    q: 'Где хранятся данные?',
    a: 'Внутри вашего аккаунта amoCRM. Виджет не использует сторонних серверов и не передаёт данные третьим лицам.',
  },
  {
    q: 'Нужен ли программист?',
    a: 'Нет. Шаблоны настраиваются в понятном редакторе.',
  },
  {
    q: 'Поддерживаются кастомные типы задач?',
    a: 'Да — виджет подхватывает все типы задач вашего аккаунта.',
  },
  {
    q: 'На каких языках интерфейс?',
    a: 'Русский и английский.',
  },
];

export function WidgetTaskTemplatesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#f5f5f5] px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#E60000]/[0.06] blur-[120px]" />
        <div className="relative mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 shadow-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#E60000]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#101010]">
              Виджет для amoCRM · 14 дней бесплатно
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-4xl font-bold text-[#101010] sm:text-5xl lg:text-6xl"
          >
            Шаблоны задач для amoCRM
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 max-w-3xl text-lg text-[#101010] sm:text-xl"
          >
            Постановка задач в один клик по готовым шаблонам — прямо из карточки
            сделки, контакта или компании.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-10 max-w-3xl text-base leading-relaxed text-[#666666]"
          >
            Менеджеры тратят время на однотипные задачи: «перезвонить», «получить
            оплату», «назначить встречу». Виджет убирает эту рутину — настройте
            шаблоны один раз и ставьте задачи в один клик, с уже готовыми сроком,
            типом и ответственным.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="https://www.amocrm.ru/marketplace"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#E60000] px-8 py-4 text-base font-semibold text-white shadow-[0_0_20px_rgba(230,0,0,0.3)] transition-shadow hover:bg-[#cc0000] hover:shadow-[0_0_30px_rgba(230,0,0,0.5)]"
            >
              Установить из amoМаркета
              <ArrowUpRight className="h-5 w-5" />
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-full border border-[#101010] px-8 py-4 text-base font-semibold text-[#101010] transition-colors hover:bg-[#101010] hover:text-white"
            >
              Смотреть тарифы
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#666666]"
          >
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-[#E60000]" />
              14 дней бесплатно
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-[#E60000]" />
              Оплата через amoМаркет
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-[#E60000]" />
              Данные внутри вашего аккаунта
            </span>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <div className="mb-3 font-mono text-xs uppercase tracking-wider text-[#999999]">
              Возможности
            </div>
            <h2 className="text-3xl font-bold text-[#101010] sm:text-4xl">Что умеет виджет</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Card className="h-full p-6 border-black/10 bg-white shadow-sm hover:shadow-md hover:border-[#E60000]/30 transition-all">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E60000]/10">
                      <Icon className="h-5 w-5 text-[#E60000]" />
                    </div>
                    <h3 className="mb-2 font-semibold text-[#101010]">{f.title}</h3>
                    <p className="text-sm leading-relaxed text-[#666666]">{f.text}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#f5f5f5] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <div className="mb-3 font-mono text-xs uppercase tracking-wider text-[#999999]">
              Как это работает
            </div>
            <h2 className="text-3xl font-bold text-[#101010] sm:text-4xl">
              Три шага до автоматизации
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="h-full p-6 border-black/10 bg-white shadow-sm">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#E60000] font-mono text-sm font-bold text-white">
                    {s.n}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-[#101010]">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-[#666666]">{s.text}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-[#666666]">
            Готово: вместо ручного заполнения полей — один клик.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <div className="mb-3 font-mono text-xs uppercase tracking-wider text-[#999999]">
              Тарифы
            </div>
            <h2 className="mb-3 text-3xl font-bold text-[#101010] sm:text-4xl">
              Стоимость за аккаунт
            </h2>
            <p className="text-[#666666]">
              Пробный период — <strong className="text-[#101010]">14 дней бесплатно</strong>.
              Оплата через amoМаркет.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {PLANS.map((p, i) => (
              <motion.div
                key={p.period}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Card
                  className={`h-full p-8 transition-all ${
                    p.highlight
                      ? 'border-[#E60000] bg-[#101010] text-white shadow-lg scale-105'
                      : 'border-black/10 bg-white shadow-sm hover:shadow-md'
                  }`}
                >
                  {p.highlight && (
                    <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#E60000] px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-white">
                      <Sparkles className="h-3 w-3" />
                      Популярный
                    </div>
                  )}
                  <div
                    className={`mb-2 font-mono text-xs uppercase tracking-wider ${
                      p.highlight ? 'text-white/60' : 'text-[#999999]'
                    }`}
                  >
                    {p.period}
                  </div>
                  <div
                    className={`mb-2 text-4xl font-bold ${
                      p.highlight ? 'text-white' : 'text-[#101010]'
                    }`}
                  >
                    {p.price}
                  </div>
                  <div className={`mb-6 text-sm ${p.highlight ? 'text-white/60' : 'text-[#666666]'}`}>
                    {p.perMonth}
                  </div>
                  {p.bonus && (
                    <div className="mb-6 flex items-center gap-2 rounded-lg bg-[#E60000]/10 px-3 py-2 text-sm font-medium text-[#E60000]">
                      <Sparkles className="h-4 w-4" />
                      {p.bonus}
                    </div>
                  )}
                  <ul
                    className={`space-y-2 text-sm ${
                      p.highlight ? 'text-white/80' : 'text-[#666666]'
                    }`}
                  >
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#E60000]" />
                      Неограниченно шаблонов
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#E60000]" />
                      Все точки входа в карточке
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#E60000]" />
                      Поддержка в Telegram / Max
                    </li>
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-[#999999]">
            Актуальные цена и период — на странице виджета в amoМаркете.
          </p>
        </div>
      </section>

      {/* Security card */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Card className="border-black/10 bg-[#f5f5f5] p-8 shadow-sm md:p-12">
            <div className="grid gap-8 md:grid-cols-[auto,1fr] md:items-start">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E60000]">
                <ShieldCheck className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="mb-3 text-2xl font-bold text-[#101010]">
                  Ваши данные — только внутри amoCRM
                </h3>
                <p className="text-base leading-relaxed text-[#666666]">
                  Виджет работает внутри интерфейса amoCRM и обращается только к API того
                  же аккаунта. Шаблоны хранятся в служебном списке вашей CRM. Собственного
                  бэкенда у виджета нет — данные не передаются на сторонние серверы и не
                  используются системы аналитики.
                </p>
                <Link
                  to="/widgets/task-templates/privacy"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#E60000] hover:underline underline-offset-4"
                >
                  Политика конфиденциальности
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f5f5f5] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <div className="mb-3 font-mono text-xs uppercase tracking-wider text-[#999999]">
              Частые вопросы
            </div>
            <h2 className="text-3xl font-bold text-[#101010] sm:text-4xl">FAQ</h2>
          </div>

          <div className="space-y-4">
            {FAQ.map((item, i) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Card className="p-6 border-black/10 bg-white shadow-sm">
                  <h3 className="mb-2 font-semibold text-[#101010]">{item.q}</h3>
                  <p className="text-sm leading-relaxed text-[#666666]">{item.a}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <div className="mb-3 font-mono text-xs uppercase tracking-wider text-[#999999]">
              Поддержка
            </div>
            <h2 className="text-3xl font-bold text-[#101010] sm:text-4xl">
              Как связаться
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href="https://t.me/koagency_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="h-full p-6 border-black/10 bg-white shadow-sm hover:shadow-md hover:border-[#E60000]/30 transition-all">
                <MessageSquare className="mb-3 h-6 w-6 text-[#E60000]" />
                <div className="mb-1 text-xs uppercase font-mono tracking-wider text-[#999999]">
                  Telegram
                </div>
                <div className="font-semibold text-[#101010] group-hover:text-[#E60000] transition-colors">
                  @koagency_bot
                </div>
              </Card>
            </a>
            <a
              href="https://max.ru/id463300749910_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="h-full p-6 border-black/10 bg-white shadow-sm hover:shadow-md hover:border-[#E60000]/30 transition-all">
                <MessageSquare className="mb-3 h-6 w-6 text-[#E60000]" />
                <div className="mb-1 text-xs uppercase font-mono tracking-wider text-[#999999]">
                  Max
                </div>
                <div className="font-semibold text-[#101010] group-hover:text-[#E60000] transition-colors">
                  Открыть чат
                </div>
              </Card>
            </a>
            <a href="mailto:koagency.me@gmail.com" className="group">
              <Card className="h-full p-6 border-black/10 bg-white shadow-sm hover:shadow-md hover:border-[#E60000]/30 transition-all">
                <Mail className="mb-3 h-6 w-6 text-[#E60000]" />
                <div className="mb-1 text-xs uppercase font-mono tracking-wider text-[#999999]">
                  E-mail
                </div>
                <div className="font-semibold text-[#101010] group-hover:text-[#E60000] transition-colors break-all">
                  koagency.me@gmail.com
                </div>
              </Card>
            </a>
            <a href="tel:78143" className="group">
              <Card className="h-full p-6 border-black/10 bg-white shadow-sm hover:shadow-md hover:border-[#E60000]/30 transition-all">
                <Phone className="mb-3 h-6 w-6 text-[#E60000]" />
                <div className="mb-1 text-xs uppercase font-mono tracking-wider text-[#999999]">
                  Телефон
                </div>
                <div className="font-semibold text-[#101010] group-hover:text-[#E60000] transition-colors">
                  78143
                </div>
              </Card>
            </a>
          </div>

          <p className="mt-10 text-center text-sm text-[#666666]">
            Разработчик: <strong className="text-[#101010]">KO:AGENCY</strong>, ИП Кононенко Елена Витальевна
          </p>
        </div>
      </section>

      {/* Documents */}
      <section className="border-t border-black/5 bg-[#f5f5f5] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 font-mono text-xs uppercase tracking-wider text-[#999999] text-center">
            Документы
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/widgets/task-templates/offer"
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-medium text-[#101010] transition-colors hover:border-[#E60000] hover:text-[#E60000]"
            >
              Публичная оферта
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              to="/widgets/task-templates/privacy"
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-medium text-[#101010] transition-colors hover:border-[#E60000] hover:text-[#E60000]"
            >
              Политика конфиденциальности
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
