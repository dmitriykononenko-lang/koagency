'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@/lib/router-shim';
import { MagneticButton } from '../ui/magnetic-button';
import { Entropy } from '../ui/entropy';
import { ArrowRight, Check, Minus } from 'lucide-react';
import { cn } from '../ui/utils';

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const directions = [
  {
    num: '01',
    title: 'Мониторинг и починка',
    desc: 'Следим, что все источники заявок доходят до CRM, интеграции и виджеты живые, оплаты сервисов в порядке. Сбои ловим раньше, чем они влияют на продажи. Ни одна заявка не теряется незаметно.',
  },
  {
    num: '02',
    title: 'Развитие системы под бизнес',
    desc: 'Донастраиваем воронки, поля, роботов, маршрутизацию и интеграции под то, как компания работает сегодня. CRM растёт вместе с вами — не превращается в музей старых настроек.',
  },
  {
    num: '03',
    title: 'Защита WhatsApp и Meta',
    desc: 'Ведём апелляции и разбаны номеров в Meta, согласуем шаблоны, держим качество номера. Один клиент несколько месяцев не мог запустить WABA — мы подключили рабочий канал за 4 дня.',
  },
  {
    num: '04',
    title: 'Контроль расходов на сервисы',
    desc: 'Ревизия подписок и виджетов: что реально нужно, что дублирует встроенный функционал amoCRM, что отключить. Часто экономия окупает часть стоимости сопровождения.',
  },
  {
    num: '05',
    title: 'Помощь вашей команде',
    desc: 'Отвечаем на вопросы сотрудников, проводим короткие созвоны, записываем инструкции и видео — простым языком, без жаргона. К нам не страшно обратиться с любым вопросом.',
  },
  {
    num: '06',
    title: 'Консультации по техвопросам',
    desc: 'Единая точка входа по технике. Задача на стыке систем — сайт, реклама, телефония — подскажем решение, дадим контакт проверенного подрядчика, поможем с минимальным бюджетом.',
  },
];

const silentProblems = [
  {
    title: 'Этап добавили в конец воронки',
    desc: 'Менеджеры начали проскакивать его мимо реальных шагов продажи. Конверсии становятся бессмысленными: цифры есть, но реальности не отражают.',
  },
  {
    title: 'Лишние виджеты с маркетплейса',
    desc: 'По 500–2 000 ₽/мес каждый за функции, которые amoCRM умеет сама. Клиент платит и не знает.',
  },
  {
    title: 'Поля заполняются «не туда»',
    desc: 'Бюджет в комментариях, источник в названии сделки. Отчёты по источникам и аналитика проигрышей не строятся в принципе.',
  },
  {
    title: 'Менеджеры обходят воронку',
    desc: 'Переводят сделки через стадии как удобно. Статистика разваливается — отчёты теряют смысл.',
  },
];

const hygiene = [
  {
    num: '01',
    title: 'Кто имеет доступ к базе',
    desc: 'Уволенные сотрудники, бывшие подрядчики, маркетологи, с которыми вы уже не работаете — часто остаются с правами админа. Базу могут скачать и унести. Находим и закрываем.',
  },
  {
    num: '02',
    title: 'Лишние пользователи, за которых вы платите',
    desc: 'amoCRM считает оплату по числу пользователей. Уволенные и подрядчики в системе — деньги впустую. Оставляем только тех, кто реально работает.',
  },
  {
    num: '03',
    title: 'Лишние виджеты и подписки',
    desc: 'Убираем дубли и то, что заменяется встроенным функционалом — платите только за нужное.',
  },
];

const comparison = [
  {
    name: 'Знает именно вашу систему',
    ko: 'да, и помнит историю',
    staff: 'да, пока не уволится',
    freelancer: 'нет, каждый раз заново',
  },
  {
    name: 'Доступен без отпусков и болезней',
    ko: 'да, в команде двое',
    staff: 'нет, человек один',
    freelancer: 'как повезёт',
  },
  {
    name: 'Отвечает за результат',
    ko: 'да, по договору',
    staff: 'в рамках зарплаты',
    freelancer: 'редко',
  },
  {
    name: 'Видит проблемы заранее',
    ko: 'да, мониторим',
    staff: 'если успевает',
    freelancer: 'нет, только по задаче',
  },
  {
    name: 'Помогает за пределами CRM',
    ko: 'да, точка входа',
    staff: 'обычно нет',
    freelancer: 'нет',
  },
  {
    name: 'Стоимость',
    ko: 'от 15 000 ₽/мес',
    staff: 'зарплата + налоги + отпуск',
    freelancer: 'дёшево, но непредсказуемо',
  },
];

type Cell = string | boolean;

const packages: {
  feature: string;
  start: Cell;
  business: Cell;
  premium: Cell;
}[] = [
  { feature: 'Часов в месяц', start: '6 ч', business: '12 ч', premium: '20 ч' },
  { feature: 'Стоимость в месяц', start: '15 000 ₽', business: '25 000 ₽', premium: '50 000 ₽' },
  { feature: 'Время реакции', start: 'в рабочее время', business: 'до 2 часов', premium: 'до 2 часов' },
  { feature: 'Дежурный в выходные', start: false, business: true, premium: true },
  { feature: 'Мониторинг и починка', start: true, business: true, premium: true },
  { feature: 'Защита WhatsApp / Meta', start: true, business: true, premium: true },
  { feature: 'Аудит подписок и доступов', start: true, business: true, premium: true },
  { feature: 'Развитие системы', start: true, business: true, premium: true },
  { feature: 'Помощь команде клиента', start: 'по запросу', business: true, premium: true },
  { feature: 'Закреплённый CRM-менеджер', start: false, business: true, premium: true },
  { feature: 'Отчёт о состоянии', start: 'ежемесячно', business: 'ежемесячно', premium: 'еженедельно' },
];

const boundaries = [
  { title: 'Крупные внедрения «с нуля»', desc: 'И переезды между аккаунтами amoCRM' },
  { title: 'Миграция базы между системами', desc: 'С другой CRM или из учётных систем' },
  { title: 'Кастомные виджеты и серверные интеграции', desc: 'Разработка под индивидуальные сценарии' },
  { title: 'Проекты на стыке систем', desc: 'Например, AI-аналитика как отдельный продукт' },
];

const startSteps = [
  { num: '01', title: 'Стартовый аудит', desc: 'Смотрим состояние amoCRM, находим узкие места и точки роста' },
  { num: '02', title: 'Договор и NDA', desc: 'Работаем официально. Данные ваших клиентов под защитой' },
  { num: '03', title: 'Подключение каналов связи', desc: 'Общий чат, закреплённая команда и ответственный' },
  { num: '04', title: 'Регулярная работа', desc: 'Поддержка, развитие, защита каналов, отчётность по пакету' },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#E60000] mb-4">
      {children}
    </div>
  );
}

function PackageCell({ value, accent = false }: { value: Cell; accent?: boolean }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className={cn('w-4 h-4 mx-auto', accent ? 'text-[#E60000]' : 'text-slate-900 dark:text-white')} />
    ) : (
      <Minus className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
    );
  }
  return (
    <span className={cn(accent ? 'text-[#E60000] font-medium' : 'text-slate-600 dark:text-slate-400')}>
      {value}
    </span>
  );
}

export function SupportPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero */}
        <div className="mb-28 mt-12">
          <motion.div {...fadeUp}>
            <Eyebrow>Техническое сопровождение amoCRM</Eyebrow>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-slate-900 dark:text-white">
              Ваша CRM <br />
              <span className="text-slate-400">просто работает</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-10">
              А вы занимаетесь продажами, а не техникой. Перестаёте думать, дошла ли заявка,
              не слетела ли интеграция, не забанили ли WhatsApp и не списались ли деньги
              за сервис, которым вы не пользуетесь. Это — наша зона.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-slate-200 dark:bg-white/10 border-y border-slate-200 dark:border-white/10 mb-10">
              {[
                { label: 'Формат', value: 'Внешняя CRM-команда' },
                { label: 'Платформа', value: 'amoCRM · Kommo' },
                { label: 'От', value: '15 000 ₽ / мес' },
              ].map((f, i) => (
                <div key={i} className="bg-white dark:bg-[#0a0a0a] py-5 sm:px-6 first:pl-0">
                  <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 mb-1">
                    {f.label}
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white">{f.value}</div>
                </div>
              ))}
            </div>

            <Link to="/calculator-amocrm">
              <MagneticButton className="bg-[#E60000] text-white px-8 py-4 rounded-xl font-medium hover:bg-[#cc0000] transition-colors inline-flex items-center gap-2">
                Подключить сопровождение <ArrowRight className="w-5 h-5" />
              </MagneticButton>
            </Link>
          </motion.div>
        </div>

        {/* Not just support */}
        <motion.div {...fadeUp} className="mb-28">
          <Eyebrow>Это не просто «техподдержка»</Eyebrow>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
                Не «починят, <span className="text-slate-400">если сломается»</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Мы держим вашу amoCRM и всё, что вокруг неё, в рабочем состоянии. Развиваем
                систему под бизнес, защищаем каналы продаж от блокировок, следим, чтобы вы
                не переплачивали за лишнее. И всегда на связи как живые знакомые люди.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                По сути — внешняя техническая команда, которая отвечает за CRM как за
                инфраструктуру вашего отдела продаж. Без найма штатного специалиста и без
                риска, что «человек, который всё знал, уволился».
              </p>
            </div>
            <div className="border-l-2 border-[#E60000] pl-6 py-1">
              <div className="text-xs font-mono uppercase tracking-[0.15em] text-[#E60000] mb-3">
                Техподдержка с человеческим лицом
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                За вашим проектом закреплены конкретные люди, а не безликая линия из другой
                страны. Они знают именно вашу компанию: как устроены ваши продажи, где у вас
                тонкие места и почему всё настроено именно так. Вам не нужно каждый раз
                объяснять всё заново — вас уже знают.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Six directions */}
        <motion.div {...fadeUp} className="mb-28">
          <Eyebrow>Что вы получаете</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900 dark:text-white">
            Шесть направлений <span className="text-slate-400">работы</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-12">
            Каждое направление — решение конкретной проблемы бизнеса, а не «что мы умеем».
          </p>

          <div className="grid md:grid-cols-2 gap-x-12">
            {directions.map((d, i) => (
              <div
                key={i}
                className="py-6 border-t border-slate-200 dark:border-white/10 flex gap-5"
              >
                <span className="text-sm font-mono font-bold text-[#E60000] pt-1">{d.num}</span>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">{d.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {d.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Silent breakage */}
        <motion.div {...fadeUp} className="mb-28">
          <Eyebrow>Когда CRM настраивает не специалист</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900 dark:text-white">
            Она ломается <span className="text-slate-400">тихо</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mb-12">
            Самое опасное — клиент не знает, что что-то не так. Цифры в отчётах есть, дашборд
            рисуется, всё выглядит нормально. А решения принимаются по данным, которым нельзя
            доверять. Вот что мы регулярно находим у новых клиентов.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {silentProblems.map((p, i) => (
              <div
                key={i}
                className="p-6 border border-slate-200 dark:border-white/10 rounded-xl"
              >
                <div className="text-xs font-mono uppercase tracking-[0.15em] text-[#E60000] mb-3">
                  {p.title}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="border-l-2 border-[#E60000] pl-6 py-1">
            <div className="font-bold text-slate-900 dark:text-white mb-2">
              Мы это видим сразу и приводим в порядок
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
              Когда CRM настроена правильно — отчёты не врут, и решения принимаются на фактах,
              а не на ощущениях. Все изменения фиксируем письменно: что меняли, зачем и к чему
              это привело.
            </p>
          </div>
        </motion.div>

        {/* Account hygiene */}
        <motion.div {...fadeUp} className="mb-28">
          <Eyebrow>Гигиена аккаунта</Eyebrow>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
                То, о чём не думают <span className="text-slate-400">пока не поздно</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                Регулярно проверяем то, что собственник почти никогда не контролирует сам:
                доступы, права, лишние пользователи, подписки. Это прямой риск и незаметные
                деньги впустую каждый месяц.
              </p>
              <div className="border-l-2 border-[#E60000] pl-6 py-1">
                <div className="text-xs font-mono uppercase tracking-[0.15em] text-[#E60000] mb-2">
                  Результат
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Ваша база под защитой, а расходы на CRM — ровно те, что приносят пользу.
                </p>
              </div>
            </div>

            <div>
              {hygiene.map((h, i) => (
                <div
                  key={i}
                  className="py-5 border-t border-slate-200 dark:border-white/10 flex gap-5 last:border-b"
                >
                  <span className="text-sm font-mono font-bold text-[#E60000] pt-0.5">{h.num}</span>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1.5 text-sm">
                      {h.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {h.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Comparison */}
        <motion.div {...fadeUp} className="mb-28">
          <Eyebrow>Чем мы отличаемся</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900 dark:text-white">
            Мы / штатный / <span className="text-slate-400">фрилансер</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-10">
            Частый вопрос — «не дешевле ли нанять своего или взять фрилансера?». Вот честное сравнение.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-900 dark:border-white">
                  <th className="text-left py-3 pr-4"></th>
                  <th className="text-left py-3 px-4 font-mono uppercase tracking-[0.1em] text-xs text-[#E60000]">
                    ko:agency
                  </th>
                  <th className="text-left py-3 px-4 font-mono uppercase tracking-[0.1em] text-xs text-slate-400">
                    Штатный
                  </th>
                  <th className="text-left py-3 px-4 font-mono uppercase tracking-[0.1em] text-xs text-slate-400">
                    Фрилансер
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} className="border-b border-slate-200 dark:border-white/10">
                    <td className="py-4 pr-4 font-medium text-slate-900 dark:text-white">
                      {row.name}
                    </td>
                    <td className="py-4 px-4 text-[#E60000] font-medium">{row.ko}</td>
                    <td className="py-4 px-4 text-slate-500 dark:text-slate-400">{row.staff}</td>
                    <td className="py-4 px-4 text-slate-500 dark:text-slate-400">{row.freelancer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Packages */}
        <motion.div {...fadeUp} className="mb-28">
          <Eyebrow>Стоимость</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900 dark:text-white">
            Пакеты <span className="text-slate-400">сопровождения</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-2xl">
            Пакет зависит от размера команды в amoCRM. В рамках пакета — фиксированное число
            часов на поддержку, развитие и консультации.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-900 dark:border-white">
                  <th className="text-left py-4 pr-4"></th>
                  <th className="text-center py-4 px-4">
                    <div className="font-bold text-slate-900 dark:text-white">Старт</div>
                    <div className="text-[11px] font-mono uppercase tracking-[0.1em] text-slate-400 font-normal mt-1">
                      до 12 пользователей
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 bg-slate-50 dark:bg-white/5">
                    <div className="font-bold text-[#E60000]">Бизнес</div>
                    <div className="text-[11px] font-mono uppercase tracking-[0.1em] text-slate-400 font-normal mt-1">
                      13–24 пользователя
                    </div>
                  </th>
                  <th className="text-center py-4 px-4">
                    <div className="font-bold text-slate-900 dark:text-white">Премиум</div>
                    <div className="text-[11px] font-mono uppercase tracking-[0.1em] text-slate-400 font-normal mt-1">
                      от 25 пользователей
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {packages.map((row, i) => (
                  <tr key={i} className="border-b border-slate-200 dark:border-white/10">
                    <td className="py-3.5 pr-4 text-[11px] font-mono uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
                      {row.feature}
                    </td>
                    <td className={cn('py-3.5 px-4 text-center', i === 1 && 'text-lg font-bold text-slate-900 dark:text-white')}>
                      <PackageCell value={row.start} />
                    </td>
                    <td className={cn('py-3.5 px-4 text-center bg-slate-50 dark:bg-white/5', i === 1 && 'text-lg font-bold')}>
                      <PackageCell value={row.business} accent />
                    </td>
                    <td className={cn('py-3.5 px-4 text-center', i === 1 && 'text-lg font-bold text-slate-900 dark:text-white')}>
                      <PackageCell value={row.premium} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-400 dark:text-slate-500 mt-6 leading-relaxed max-w-3xl">
            Условия. Цены указаны в рублях; для зарубежных клиентов возможен расчёт в другой
            валюте по курсу на дату счёта (оплата банковским переводом или криптовалютой).
            Неиспользованные часы переносятся на следующий месяц и сгорают, если не использованы
            в течение него. Стоимость часа сверх пакета фиксируется в договоре.
          </p>
        </motion.div>

        {/* Boundaries + Start */}
        <motion.div {...fadeUp} className="mb-28">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Eyebrow>Что не входит в сопровождение</Eyebrow>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-900 dark:text-white">
                Границы <span className="text-slate-400">услуги</span>
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                Чтобы не было ложных ожиданий — вот что мы оцениваем отдельно как
                самостоятельный проект с фиксированной стоимостью:
              </p>
              <div>
                {boundaries.map((b, i) => (
                  <div key={i} className="py-4 border-t border-slate-200 dark:border-white/10 last:border-b">
                    <div className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">
                      {b.title}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Eyebrow>С чего начать</Eyebrow>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-900 dark:text-white">
                Как <span className="text-slate-400">начнём работу</span>
              </h2>
              <div className="mt-[52px]">
                {startSteps.map((s, i) => (
                  <div
                    key={i}
                    className="py-4 border-t border-slate-200 dark:border-white/10 last:border-b flex gap-5"
                  >
                    <span className="text-sm font-mono font-bold text-[#E60000] pt-0.5">{s.num}</span>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">
                        {s.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Final CTA: text left, entropy right */}
        <motion.div {...fadeUp}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Eyebrow>ko:agency</Eyebrow>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
                Мы создаём порядок <br />
                <span className="text-slate-400">из хаоса</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Слева — CRM под сопровождением: каждая заявка на своём месте, отчёты не врут,
                каналы продаж защищены. Справа — то, что происходит с системой без присмотра.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                Начнём со стартового аудита — посмотрим состояние вашей amoCRM и покажем,
                где теряются заявки и деньги.
              </p>
              <Link to="/calculator-amocrm">
                <MagneticButton className="bg-[#E60000] text-white px-8 py-4 rounded-xl font-medium hover:bg-[#cc0000] transition-colors inline-flex items-center gap-2">
                  Запросить аудит <ArrowRight className="w-5 h-5" />
                </MagneticButton>
              </Link>
              <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 mt-6">
                Telegram · Email · Сайт — по запросу
              </p>
            </div>

            <div className="flex justify-center lg:justify-end">
              <Entropy
                size={440}
                labels={['Порядок', 'Хаос']}
                className="rounded-2xl"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
