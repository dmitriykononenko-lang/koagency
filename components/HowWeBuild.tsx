'use client';

/**
 * Секция «Как мы строим CRM»: визуальный путь от ТЗ до продаж.
 * 5 этапов, каждый со своим реалистичным мокапом интерфейса amoCRM.
 * Без stock-иконок — только настоящие мокапы (HTML/SVG/CSS).
 */

import { motion } from 'framer-motion';
import {
  FileText,
  Layout,
  Sliders,
  Zap,
  TrendingUp,
  Check,
  ArrowRight,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  User,
  Calendar,
} from 'lucide-react';
import { Link } from '@/lib/router-shim';

// ─────────────────────────────────────────────
//  МОКАПЫ — каждый этап получает свою визуализацию
// ─────────────────────────────────────────────

function MockupBriefDoc() {
  // ТЗ от клиента — Notion-like документ
  return (
    <div className="bg-white rounded-2xl border border-black/8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.12)] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-black/6 bg-[#fafafa]">
        <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
        <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
        <div className="w-2 h-2 rounded-full bg-[#28c840]" />
        <div className="ml-auto text-[10px] font-mono uppercase tracking-wider text-[#999]">
          Бриф клиента.docx
        </div>
      </div>
      <div className="p-5 space-y-3 text-sm">
        <div className="text-[11px] font-mono uppercase tracking-wider text-[#999]">Цели</div>
        <ul className="space-y-1.5 text-[#101010]">
          <li className="flex gap-2">
            <span className="text-[#E60000]">•</span>Рост конверсии в продажу с 8% до 15%
          </li>
          <li className="flex gap-2">
            <span className="text-[#E60000]">•</span>Сократить цикл сделки с 14 до 7 дней
          </li>
          <li className="flex gap-2">
            <span className="text-[#E60000]">•</span>Все лиды в одном окне (сайт, Авито, WhatsApp)
          </li>
        </ul>
        <div className="text-[11px] font-mono uppercase tracking-wider text-[#999] pt-2">
          Условия
        </div>
        <div className="space-y-1.5 text-[#101010]">
          <div className="flex justify-between">
            <span className="text-[#666]">Менеджеров</span>
            <span className="font-mono font-semibold">8</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#666]">Источников</span>
            <span className="font-mono font-semibold">5</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#666]">Лидов / день</span>
            <span className="font-mono font-semibold">~140</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockupFunnelBoard() {
  // Воронка — kanban-доска со стадиями
  const stages = [
    { name: 'Новый лид', count: 47, color: '#94a3b8' },
    { name: 'Квалификация', count: 28, color: '#3b82f6' },
    { name: 'КП отправлено', count: 14, color: '#f59e0b' },
    { name: 'Переговоры', count: 9, color: '#8b5cf6' },
    { name: 'Сделка', count: 5, color: '#10b981' },
  ];
  return (
    <div className="bg-white rounded-2xl border border-black/8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.12)] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-black/6 bg-[#fafafa]">
        <div className="text-xs font-medium text-[#101010]">Воронка «Основные продажи»</div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#10b981]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
          Активна
        </div>
      </div>
      <div className="p-3 grid grid-cols-5 gap-1.5">
        {stages.map((s, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className="w-full h-1 rounded-full mb-2"
              style={{ background: s.color }}
            />
            <div className="text-[9px] uppercase tracking-wider text-[#666] text-center leading-tight mb-1.5 font-medium">
              {s.name}
            </div>
            <div
              className="rounded-md w-full px-1.5 py-2 text-center font-mono text-sm font-semibold"
              style={{ background: `${s.color}15`, color: s.color }}
            >
              {s.count}
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 pb-3 pt-1 flex justify-between text-[10px] text-[#666] font-mono">
        <span>Общий поток: 103 сделки</span>
        <span>Конверсия 4.9%</span>
      </div>
    </div>
  );
}

function MockupCustomFields() {
  // Кастомные поля — таблица настроек
  const fields = [
    { name: 'Бюджет', type: 'число', icon: '₽' },
    { name: 'Источник', type: 'список', icon: '☰' },
    { name: 'ЛПР контакт', type: 'текст', icon: 'A' },
    { name: 'Дата демо', type: 'дата', icon: '⊟' },
    { name: 'Готовность', type: 'переключатель', icon: '◐' },
  ];
  return (
    <div className="bg-white rounded-2xl border border-black/8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.12)] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-black/6 bg-[#fafafa]">
        <div className="text-xs font-medium text-[#101010]">Поля карточки сделки</div>
        <div className="text-[10px] font-mono text-[#666]">12 настроено</div>
      </div>
      <div className="divide-y divide-black/6">
        {fields.map((f, i) => (
          <div key={i} className="flex items-center px-4 py-2.5 text-sm">
            <div className="w-7 h-7 rounded-md bg-[#E60000]/8 flex items-center justify-center font-mono text-[13px] text-[#E60000] font-semibold mr-3">
              {f.icon}
            </div>
            <div className="flex-1 text-[#101010] font-medium">{f.name}</div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#999]">
              {f.type}
            </div>
            <Check className="w-4 h-4 text-[#10b981] ml-3" />
          </div>
        ))}
      </div>
    </div>
  );
}

function MockupTriggers() {
  // Триггеры — карточки автоматизации
  return (
    <div className="space-y-2">
      {[
        {
          when: 'Лид без ответа 24 ч',
          then: 'Отправить WhatsApp-напоминание',
          icon: MessageSquare,
        },
        {
          when: 'Статус «КП отправлено» 3 дня',
          then: 'Создать задачу менеджеру',
          icon: Clock,
        },
        {
          when: 'Сделка закрыта успешно',
          then: 'NPS-опрос через 7 дней',
          icon: Mail,
        },
      ].map((t, i) => {
        const Icon = t.icon;
        return (
          <div
            key={i}
            className="bg-white rounded-xl border border-black/8 shadow-sm p-3 flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-[#E60000]/8 flex items-center justify-center flex-shrink-0">
              <Icon className="w-4 h-4 text-[#E60000]" />
            </div>
            <div className="flex-1 text-xs leading-tight">
              <div className="text-[#666] mb-0.5">
                Если: <span className="text-[#101010] font-medium">{t.when}</span>
              </div>
              <div className="text-[#666]">
                То: <span className="text-[#101010] font-medium">{t.then}</span>
              </div>
            </div>
            <div className="text-[10px] font-mono uppercase text-[#10b981] flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              On
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MockupResultDashboard() {
  // Финальный дашборд — метрики после внедрения
  const chartHeights = [38, 45, 52, 49, 61, 70, 78];
  return (
    <div className="bg-white rounded-2xl border border-black/8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.12)] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-black/6 bg-[#fafafa]">
        <div className="text-xs font-medium text-[#101010]">Аналитика отдела продаж</div>
        <div className="text-[10px] font-mono text-[#666]">Сентябрь 2026</div>
      </div>

      {/* KPI */}
      <div className="p-4 grid grid-cols-3 gap-3 border-b border-black/6">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-[#999] font-mono mb-1">
            Конверсия
          </div>
          <div className="text-xl font-bold text-[#101010] font-mono">14.7%</div>
          <div className="text-[10px] text-[#10b981] flex items-center gap-1 mt-0.5 font-mono">
            <TrendingUp className="w-3 h-3" /> +84%
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-[#999] font-mono mb-1">
            Цикл сделки
          </div>
          <div className="text-xl font-bold text-[#101010] font-mono">6.2д</div>
          <div className="text-[10px] text-[#10b981] flex items-center gap-1 mt-0.5 font-mono">
            <TrendingUp className="w-3 h-3 rotate-180" /> −56%
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-[#999] font-mono mb-1">
            Выручка
          </div>
          <div className="text-xl font-bold text-[#101010] font-mono">+47%</div>
          <div className="text-[10px] text-[#10b981] flex items-center gap-1 mt-0.5 font-mono">
            <TrendingUp className="w-3 h-3" /> к плану
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="p-4">
        <div className="flex items-end gap-1.5 h-24">
          {chartHeights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: 'easeOut' }}
              className="flex-1 rounded-t-sm relative"
              style={{
                background:
                  i === chartHeights.length - 1
                    ? '#E60000'
                    : 'rgba(230,0,0,0.25)',
              }}
            >
              {i === chartHeights.length - 1 && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono font-semibold text-[#E60000]">
                  78
                </div>
              )}
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between mt-1.5 text-[9px] font-mono text-[#999]">
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((d) => (
            <div key={d} className="flex-1 text-center">
              {d}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  ОДИН ЭТАП
// ─────────────────────────────────────────────

interface Stage {
  num: string;
  icon: any;
  title: string;
  caption: string;
  description: string;
  bullets: string[];
  Mockup: React.FC;
  duration: string;
}

const STAGES: Stage[] = [
  {
    num: '01',
    icon: FileText,
    title: 'Снимаем требования',
    caption: '2 встречи + бриф',
    description:
      'Разговариваем с собственником и менеджерами. Узнаём, на каких стадиях лиды отваливаются, какие источники приносят деньги, чего не хватает.',
    bullets: [
      'Аудит текущих процессов',
      'Опрос менеджеров',
      'Схема целевых воронок',
    ],
    Mockup: MockupBriefDoc,
    duration: 'День 1–3',
  },
  {
    num: '02',
    icon: Layout,
    title: 'Строим воронку',
    caption: 'Реальная kanban-доска',
    description:
      'Переносим ваш процесс продаж в amoCRM: стадии под ваш цикл сделки, права менеджеров, видимость карточек. Не «как у всех», а под вашу нишу.',
    bullets: [
      'От 5 до 12 стадий под цикл сделки',
      'Распределение по менеджерам',
      'Лиды теряться перестают',
    ],
    Mockup: MockupFunnelBoard,
    duration: 'День 4–6',
  },
  {
    num: '03',
    icon: Sliders,
    title: 'Настраиваем поля',
    caption: 'Кастомные данные сделки',
    description:
      'Каждое поле в карточке — это данные для аналитики и автоматизации. Бюджет, источник, ЛПР, готовность — структурируем то, что раньше было в голове менеджера.',
    bullets: [
      '8–15 полей в карточке сделки',
      'Обязательные при переходе по стадиям',
      'Готовая выгрузка для отчётов',
    ],
    Mockup: MockupCustomFields,
    duration: 'День 6–8',
  },
  {
    num: '04',
    icon: Zap,
    title: 'Включаем автоматизацию',
    caption: 'Триггеры, рассылки, задачи',
    description:
      'Менеджеры перестают забывать перезванивать. CRM сама пишет клиенту, ставит задачи, отправляет КП по шаблону. Каждый лид доходит до конца воронки.',
    bullets: [
      'Автоматические задачи менеджеру',
      'WhatsApp / Telegram / email рассылки',
      'Шаблоны КП в 1 клик',
    ],
    Mockup: MockupTriggers,
    duration: 'День 8–12',
  },
  {
    num: '05',
    icon: TrendingUp,
    title: 'Результат через 30 дней',
    caption: 'Живые цифры в дашборде',
    description:
      'В среднем по нашим клиентам: конверсия +47%, цикл сделки в 2 раза короче, выручка +30–50%. Не «потенциал», а измеримый результат через месяц.',
    bullets: [
      '+47% конверсия в среднем',
      '−56% время цикла сделки',
      'Менеджеры продают, а не ведут таблицы',
    ],
    Mockup: MockupResultDashboard,
    duration: 'День 13–14 + 1 мес.',
  },
];

// ─────────────────────────────────────────────
//  СЕКЦИЯ
// ─────────────────────────────────────────────

export function HowWeBuild() {
  return (
    <section id="how-we-build" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#E60000]/4 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E60000]/8 mb-5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#E60000] font-semibold">
              Процесс работы
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#101010] mb-5">
            От технического задания{' '}
            <span className="text-[#E60000]">до работающих продаж</span> за 2 недели
          </h2>
          <p className="text-base md:text-lg text-[#666]">
            Не «настроим CRM» абстрактно. Реальный путь, который мы проходим с каждым клиентом —
            с конкретными артефактами на каждом этапе.
          </p>
        </div>

        {/* Stages */}
        <div className="relative">
          {/* Вертикальная линия таймлайна */}
          <div
            aria-hidden
            className="hidden lg:block absolute left-[80px] top-12 bottom-12 w-px bg-gradient-to-b from-[#E60000] via-[#E60000]/30 to-transparent"
          />

          <div className="space-y-16 lg:space-y-24">
            {STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const Mockup = stage.Mockup;
              return (
                <motion.div
                  key={stage.num}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="grid lg:grid-cols-12 gap-8 items-center"
                >
                  {/* Левая колонка: номер + иконка */}
                  <div className="lg:col-span-1 flex lg:flex-col items-center gap-3 lg:gap-2">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-white border-2 border-[#E60000]/20 flex items-center justify-center font-mono text-xl font-bold text-[#E60000] shadow-[0_10px_30px_-10px_rgba(230,0,0,0.3)]">
                        {stage.num}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#E60000] flex items-center justify-center">
                        <Icon className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Текст */}
                  <div className="lg:col-span-5 lg:pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#999]">
                        {stage.duration}
                      </span>
                      <span className="text-[#ddd]">·</span>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#E60000] font-semibold">
                        {stage.caption}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-[#101010] tracking-tight mb-3">
                      {stage.title}
                    </h3>
                    <p className="text-[#666] mb-4 leading-relaxed">{stage.description}</p>
                    <ul className="space-y-2">
                      {stage.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#101010]">
                          <Check className="w-4 h-4 text-[#E60000] mt-0.5 flex-shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Мокап */}
                  <div className="lg:col-span-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                    >
                      <Mockup />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Финальный CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 relative overflow-hidden rounded-3xl bg-[#101010] p-8 md:p-12 text-white"
        >
          <div className="absolute -right-20 -top-20 w-72 h-72 bg-[#E60000]/30 blur-[100px] rounded-full" />
          <div className="absolute -left-10 -bottom-20 w-64 h-64 bg-[#E60000]/15 blur-[80px] rounded-full" />
          <div className="relative max-w-3xl">
            <h3 className="text-2xl md:text-4xl font-semibold tracking-tight mb-4">
              Хотите такой же путь для своего отдела продаж?
            </h3>
            <p className="text-white/70 mb-6 text-base md:text-lg">
              Первая встреча — бесплатно. Покажем, как ваша воронка будет выглядеть через 14 дней.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/calculator"
                className="inline-flex items-center gap-2 bg-[#E60000] hover:bg-[#cc0000] text-white px-5 py-3 rounded-xl font-medium transition-all hover:translate-y-[-2px] hover:shadow-[0_18px_36px_-12px_rgba(230,0,0,0.5)]"
              >
                Рассчитать стоимость
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+447835212468"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/15 text-white px-5 py-3 rounded-xl font-medium transition-all"
              >
                <Phone className="w-4 h-4" />
                Заказать звонок
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
