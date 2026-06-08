'use client';

/**
 * Секция «Как мы строим CRM»: 5 этапов с мокапами в стиле amoCRM.
 * Все мокапы — HTML/CSS-копии реальных экранов amoCRM (бренд-цвет #f99316,
 * dark sidebar, kanban-вёрстка, плотная типографика, фирменные иконки).
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
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  GripVertical,
  Bell,
  Settings,
  ChevronDown,
  Mail,
  MessageSquare,
  Calendar,
  User,
} from 'lucide-react';
import { Link } from '@/lib/router-shim';

// ─────────────────────────────────────────────
//  Общие токены — фирменные цвета amoCRM
// ─────────────────────────────────────────────
const AMO = {
  bg: '#f4f6f8',
  surface: '#ffffff',
  sidebar: '#1d2532',
  sidebarHover: '#2a3344',
  brand: '#f99316', // фирменный оранжевый amoCRM
  brandLight: '#ffd1a0',
  text: '#2c2c2c',
  textMuted: '#7b8794',
  border: '#e3e7eb',
  borderLight: '#eef1f4',
  success: '#58c061',
  blue: '#2a87db',
  yellow: '#fcb900',
};

// Маленькая обёртка-«окно» в стиле macOS
function WindowFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-[0_24px_60px_-20px_rgba(15,20,30,0.18),0_8px_20px_-8px_rgba(15,20,30,0.08)] border"
      style={{ borderColor: AMO.border, background: AMO.surface }}
    >
      {/* Title bar */}
      <div
        className="flex items-center px-3 py-2 border-b"
        style={{ background: AMO.bg, borderColor: AMO.border }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div
          className="flex-1 text-center text-[10px] font-mono uppercase tracking-wider"
          style={{ color: AMO.textMuted }}
        >
          {title}
        </div>
        <div className="w-12" />
      </div>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
//  ЭТАП 01 — Бриф клиента
// ─────────────────────────────────────────────
function MockupBriefDoc() {
  return (
    <WindowFrame title="Бриф клиента · подготовка к amoCRM">
      <div className="p-5 space-y-4 text-sm" style={{ color: AMO.text }}>
        {/* Шапка документа */}
        <div className="flex items-start gap-3 pb-3 border-b" style={{ borderColor: AMO.borderLight }}>
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: `${AMO.brand}15` }}
          >
            <FileText className="w-4 h-4" style={{ color: AMO.brand }} />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-[15px]">Бриф · ООО «Альфа Стройка»</div>
            <div className="text-[11px]" style={{ color: AMO.textMuted }}>
              Заполнено 2 июня · ko:agency
            </div>
          </div>
          <div
            className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded"
            style={{ background: `${AMO.success}18`, color: AMO.success }}
          >
            готово
          </div>
        </div>

        {/* Цели */}
        <div>
          <div
            className="text-[11px] font-mono uppercase tracking-wider mb-2"
            style={{ color: AMO.textMuted }}
          >
            Цели на 3 месяца
          </div>
          <ul className="space-y-1.5">
            {['Рост конверсии в продажу с 8% до 15%', 'Цикл сделки 14 дн → 7 дн', 'Лиды из 5 источников в одном окне'].map(
              (g, i) => (
                <li key={i} className="flex gap-2 text-[13px] leading-snug">
                  <span style={{ color: AMO.brand }}>•</span>
                  {g}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Параметры */}
        <div className="grid grid-cols-3 gap-3 pt-2 border-t" style={{ borderColor: AMO.borderLight }}>
          {[
            { l: 'Менеджеров', v: '8' },
            { l: 'Источников', v: '5' },
            { l: 'Лидов / день', v: '~140' },
          ].map((it) => (
            <div key={it.l}>
              <div
                className="text-[10px] font-mono uppercase tracking-wider mb-0.5"
                style={{ color: AMO.textMuted }}
              >
                {it.l}
              </div>
              <div className="font-mono text-base font-bold">{it.v}</div>
            </div>
          ))}
        </div>

        {/* Что дальше */}
        <div
          className="flex items-center gap-2 pt-3 border-t text-[12px]"
          style={{ borderColor: AMO.borderLight, color: AMO.textMuted }}
        >
          <ArrowRight className="w-3.5 h-3.5" style={{ color: AMO.brand }} />
          Далее: настройка воронок в amoCRM
        </div>
      </div>
    </WindowFrame>
  );
}

// ─────────────────────────────────────────────
//  ЭТАП 02 — Воронка (amoCRM kanban)
// ─────────────────────────────────────────────
function MockupFunnelBoard() {
  const stages = [
    { name: 'Новый лид', count: 47, sum: '1.2M', color: '#9aa6b2' },
    { name: 'Квалификация', count: 28, sum: '890K', color: '#fcb900' },
    { name: 'КП отправлено', count: 14, sum: '720K', color: AMO.brand },
    { name: 'Переговоры', count: 9, sum: '480K', color: '#3b82f6' },
    { name: 'Сделка', count: 5, sum: '310K', color: AMO.success },
  ];

  const sampleCards = [
    { stage: 1, company: 'ООО Технополис', sum: '85 000 ₽', tag: 'Авито', mgr: 'А', time: '2ч' },
    { stage: 2, company: 'ИП Маркина О.', sum: '47 000 ₽', tag: 'Сайт', mgr: 'К', time: '5ч' },
    { stage: 3, company: 'ООО Лиман', sum: '120 000 ₽', tag: 'РК Я.Директ', mgr: 'А', time: '1ч' },
  ];

  return (
    <WindowFrame title="amoCRM · Воронка «Основные продажи»">
      {/* Top toolbar в стиле amoCRM */}
      <div
        className="flex items-center gap-3 px-3 py-2 border-b text-[11px]"
        style={{ background: AMO.surface, borderColor: AMO.border, color: AMO.text }}
      >
        <div className="flex items-center gap-1 font-semibold">
          Основные продажи
          <ChevronDown className="w-3 h-3" />
        </div>
        <div className="flex items-center gap-0.5 ml-2">
          {['Все', 'Мои', 'Сегодня'].map((t, i) => (
            <div
              key={t}
              className="px-2.5 py-1 rounded text-[10px] font-medium cursor-default"
              style={{
                background: i === 0 ? `${AMO.brand}15` : 'transparent',
                color: i === 0 ? AMO.brand : AMO.textMuted,
              }}
            >
              {t}
            </div>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2" style={{ color: AMO.textMuted }}>
          <Search className="w-3.5 h-3.5" />
          <Filter className="w-3.5 h-3.5" />
          <div
            className="px-2 py-1 rounded text-[10px] font-medium text-white flex items-center gap-1"
            style={{ background: AMO.brand }}
          >
            <Plus className="w-3 h-3" />
            Сделка
          </div>
        </div>
      </div>

      {/* Stages */}
      <div className="p-3 grid grid-cols-5 gap-2" style={{ background: AMO.bg }}>
        {stages.map((s, i) => (
          <div key={i} className="flex flex-col">
            {/* Stage header */}
            <div className="flex items-center justify-between mb-2 px-1">
              <div
                className="text-[9px] uppercase tracking-wider font-semibold flex-1 truncate"
                style={{ color: s.color }}
              >
                {s.name}
              </div>
            </div>
            {/* Stage bar */}
            <div className="h-1 rounded-full mb-2" style={{ background: s.color }} />
            {/* Counters */}
            <div className="flex items-baseline justify-between mb-2 px-0.5">
              <div className="font-mono text-base font-bold" style={{ color: AMO.text }}>
                {s.count}
              </div>
              <div className="text-[9px] font-mono" style={{ color: AMO.textMuted }}>
                {s.sum} ₽
              </div>
            </div>

            {/* Card examples (показываем в 1, 2 и 3 стадиях) */}
            {sampleCards
              .filter((c) => c.stage === i)
              .map((c, ci) => (
                <motion.div
                  key={ci}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="rounded-md border p-2 mb-1.5 bg-white"
                  style={{ borderColor: AMO.border }}
                >
                  <div className="text-[10px] font-semibold truncate" style={{ color: AMO.text }}>
                    {c.company}
                  </div>
                  <div
                    className="text-[10px] font-mono mt-0.5 mb-1"
                    style={{ color: AMO.text }}
                  >
                    {c.sum}
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[8px] px-1 py-0.5 rounded uppercase font-semibold"
                      style={{ background: `${AMO.blue}15`, color: AMO.blue }}
                    >
                      {c.tag}
                    </span>
                    <div className="flex items-center gap-1">
                      <div
                        className="w-4 h-4 rounded-full text-[8px] font-bold text-white flex items-center justify-center"
                        style={{ background: AMO.brand }}
                      >
                        {c.mgr}
                      </div>
                      <span className="text-[8px]" style={{ color: AMO.textMuted }}>
                        {c.time}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}

            {/* Пустая карточка-подложка для пустых стадий */}
            {!sampleCards.find((c) => c.stage === i) && (
              <div
                className="rounded-md border-dashed border h-12 mb-1.5"
                style={{ borderColor: AMO.border }}
              />
            )}
          </div>
        ))}
      </div>

      <div
        className="px-3 py-1.5 flex justify-between text-[10px] font-mono border-t"
        style={{ borderColor: AMO.border, color: AMO.textMuted, background: AMO.surface }}
      >
        <span>Поток: 103 сделки</span>
        <span>Конверсия: 4.9%</span>
        <span>Цикл: 6.2 дн</span>
      </div>
    </WindowFrame>
  );
}

// ─────────────────────────────────────────────
//  ЭТАП 03 — Кастомные поля (admin panel)
// ─────────────────────────────────────────────
function MockupCustomFields() {
  const fields = [
    { name: 'Бюджет клиента', type: 'Число', icon: '₽', required: true },
    { name: 'Источник лида', type: 'Список', icon: '☰', required: true },
    { name: 'ЛПР · контакт', type: 'Текст', icon: 'A', required: false },
    { name: 'Дата демо', type: 'Дата', icon: '⊞', required: false },
    { name: 'Готовность купить', type: 'Переключатель', icon: '◐', required: false },
  ];

  return (
    <WindowFrame title="amoCRM · Настройки → Поля сделки">
      {/* Tabs */}
      <div
        className="flex items-center gap-4 px-4 pt-3 border-b"
        style={{ borderColor: AMO.border, background: AMO.surface }}
      >
        {['Главное', 'Дополнительно', 'Статистика'].map((t, i) => (
          <div
            key={t}
            className="pb-2.5 text-[11px] font-medium relative"
            style={{ color: i === 0 ? AMO.text : AMO.textMuted }}
          >
            {t}
            {i === 0 && (
              <div
                className="absolute left-0 right-0 -bottom-px h-0.5 rounded-full"
                style={{ background: AMO.brand }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Fields list */}
      <div className="divide-y" style={{ borderColor: AMO.borderLight }}>
        {fields.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center px-4 py-2.5"
            style={{ background: AMO.surface, borderColor: AMO.borderLight }}
          >
            <GripVertical className="w-4 h-4 mr-2" style={{ color: AMO.textMuted }} />
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center font-mono text-[12px] font-bold mr-3"
              style={{ background: `${AMO.brand}12`, color: AMO.brand }}
            >
              {f.icon}
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-medium" style={{ color: AMO.text }}>
                {f.name}
              </div>
              <div
                className="text-[10px] font-mono uppercase tracking-wider"
                style={{ color: AMO.textMuted }}
              >
                {f.type}
              </div>
            </div>
            {/* Required toggle */}
            <div
              className="text-[10px] font-mono uppercase mr-3 px-1.5 py-0.5 rounded"
              style={{
                background: f.required ? `${AMO.brand}15` : `${AMO.textMuted}10`,
                color: f.required ? AMO.brand : AMO.textMuted,
              }}
            >
              {f.required ? 'Обяз.' : '—'}
            </div>
            <MoreHorizontal className="w-4 h-4" style={{ color: AMO.textMuted }} />
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div
        className="px-4 py-2 border-t flex items-center justify-between text-[11px]"
        style={{ borderColor: AMO.border, background: AMO.bg, color: AMO.textMuted }}
      >
        <span>Полей: 12 из 50</span>
        <div className="flex items-center gap-1.5 font-medium" style={{ color: AMO.brand }}>
          <Plus className="w-3 h-3" />
          Добавить поле
        </div>
      </div>
    </WindowFrame>
  );
}

// ─────────────────────────────────────────────
//  ЭТАП 04 — Триггеры (Digital Pipeline)
// ─────────────────────────────────────────────
function MockupTriggers() {
  const stage = { name: 'КП отправлено', color: AMO.brand };
  const triggers = [
    {
      delay: '24 ч',
      when: 'Нет ответа клиента',
      then: 'WhatsApp: «Видели наше предложение?»',
      icon: MessageSquare,
    },
    {
      delay: '72 ч',
      when: 'КП не открыт',
      then: 'Задача менеджеру: «Прозвонить»',
      icon: Phone,
    },
    {
      delay: 'при оплате',
      when: 'Сделка закрыта',
      then: 'NPS-опрос через 7 дней',
      icon: Mail,
    },
  ];

  return (
    <WindowFrame title="amoCRM · Digital Pipeline → Автоматизация">
      {/* Stage header */}
      <div
        className="px-4 py-2.5 flex items-center justify-between"
        style={{ background: stage.color }}
      >
        <div className="flex items-center gap-2 text-white">
          <div className="w-2 h-2 rounded-full bg-white/80" />
          <span className="font-semibold text-[12px] uppercase tracking-wider">{stage.name}</span>
        </div>
        <div className="text-[10px] font-mono text-white/80 uppercase tracking-wider">
          14 сделок · 720K ₽
        </div>
      </div>

      {/* Triggers as cascade */}
      <div className="p-3 space-y-2.5" style={{ background: AMO.bg }}>
        {triggers.map((t, i) => {
          const Icon = t.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-lg border p-3 flex items-center gap-3 bg-white"
              style={{ borderColor: AMO.border }}
            >
              {/* delay badge */}
              <div
                className="text-[9px] font-mono uppercase tracking-wider px-2 py-1 rounded flex-shrink-0"
                style={{ background: `${AMO.brand}15`, color: AMO.brand }}
              >
                {t.delay}
              </div>
              {/* icon */}
              <div
                className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ background: `${AMO.blue}12` }}
              >
                <Icon className="w-4 h-4" style={{ color: AMO.blue }} />
              </div>
              {/* texts */}
              <div className="flex-1 leading-tight">
                <div className="text-[10px]" style={{ color: AMO.textMuted }}>
                  Если: <span style={{ color: AMO.text, fontWeight: 500 }}>{t.when}</span>
                </div>
                <div className="text-[10px] mt-0.5" style={{ color: AMO.textMuted }}>
                  То: <span style={{ color: AMO.text, fontWeight: 500 }}>{t.then}</span>
                </div>
              </div>
              {/* on/off */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <div className="relative w-7 h-4 rounded-full" style={{ background: AMO.success }}>
                  <div className="absolute right-0.5 top-0.5 w-3 h-3 rounded-full bg-white shadow" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div
        className="px-4 py-2 border-t flex items-center justify-between text-[11px]"
        style={{ borderColor: AMO.border, color: AMO.textMuted, background: AMO.surface }}
      >
        <span>Активных триггеров: 3 из 7</span>
        <div className="flex items-center gap-1.5 font-medium" style={{ color: AMO.brand }}>
          <Plus className="w-3 h-3" />
          Добавить
        </div>
      </div>
    </WindowFrame>
  );
}

// ─────────────────────────────────────────────
//  ЭТАП 05 — Аналитика (Dashboard)
// ─────────────────────────────────────────────
function MockupResultDashboard() {
  const sparkline = [20, 24, 22, 30, 35, 33, 42, 48, 52, 60, 58, 70];
  const chartHeights = [38, 45, 52, 49, 61, 70, 78];

  return (
    <WindowFrame title="amoCRM · Аналитика → Отдел продаж">
      {/* Top KPI tiles */}
      <div className="p-3 grid grid-cols-3 gap-2" style={{ background: AMO.bg }}>
        {[
          { l: 'Конверсия', v: '14.7%', delta: '+84%', positive: true },
          { l: 'Цикл сделки', v: '6.2 дн', delta: '−56%', positive: true },
          { l: 'Выручка', v: '4.7M ₽', delta: '+47%', positive: true },
        ].map((kpi, i) => (
          <div
            key={i}
            className="rounded-md border p-2.5"
            style={{ borderColor: AMO.border, background: AMO.surface }}
          >
            <div
              className="text-[9px] font-mono uppercase tracking-wider mb-1"
              style={{ color: AMO.textMuted }}
            >
              {kpi.l}
            </div>
            <div className="flex items-end justify-between gap-2">
              <div className="font-mono text-lg font-bold" style={{ color: AMO.text }}>
                {kpi.v}
              </div>
              <div
                className="text-[9px] font-mono font-semibold flex items-center gap-0.5"
                style={{ color: AMO.success }}
              >
                <TrendingUp className="w-2.5 h-2.5" />
                {kpi.delta}
              </div>
            </div>
            {/* Mini sparkline */}
            <svg viewBox="0 0 100 24" className="mt-2 w-full h-5">
              <polyline
                fill="none"
                stroke={AMO.brand}
                strokeWidth="1.5"
                points={sparkline
                  .map((v, idx) => `${(idx / (sparkline.length - 1)) * 100},${24 - (v / 70) * 22}`)
                  .join(' ')}
              />
              <polyline
                fill="url(#g1)"
                stroke="none"
                points={`0,24 ${sparkline
                  .map((v, idx) => `${(idx / (sparkline.length - 1)) * 100},${24 - (v / 70) * 22}`)
                  .join(' ')} 100,24`}
              />
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={AMO.brand} stopOpacity="0.25" />
                  <stop offset="100%" stopColor={AMO.brand} stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="px-3 pb-3" style={{ background: AMO.bg }}>
        <div
          className="rounded-md border p-3"
          style={{ borderColor: AMO.border, background: AMO.surface }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-[11px] font-medium" style={{ color: AMO.text }}>
              Сделки по дням недели
            </div>
            <div className="text-[10px] font-mono" style={{ color: AMO.textMuted }}>
              сент. 2026
            </div>
          </div>
          <div className="flex items-end gap-1.5 h-20">
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
                    i === chartHeights.length - 1 ? AMO.brand : `${AMO.brand}33`,
                }}
              >
                {i === chartHeights.length - 1 && (
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold"
                    style={{ color: AMO.brand }}
                  >
                    78
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <div
            className="flex justify-between mt-1.5 text-[9px] font-mono"
            style={{ color: AMO.textMuted }}
          >
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((d) => (
              <div key={d} className="flex-1 text-center">
                {d}
              </div>
            ))}
          </div>
        </div>
      </div>
    </WindowFrame>
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
    bullets: ['Аудит текущих процессов', 'Опрос менеджеров', 'Схема целевых воронок'],
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
    bullets: ['От 5 до 12 стадий под цикл сделки', 'Распределение по менеджерам', 'Лиды теряться перестают'],
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
    bullets: ['8–15 полей в карточке сделки', 'Обязательные при переходе по стадиям', 'Готовая выгрузка для отчётов'],
    Mockup: MockupCustomFields,
    duration: 'День 6–8',
  },
  {
    num: '04',
    icon: Zap,
    title: 'Включаем автоматизацию',
    caption: 'Digital Pipeline',
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
    caption: 'Живые цифры в аналитике',
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
