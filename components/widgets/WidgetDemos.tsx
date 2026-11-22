'use client';

import { useEffect, useState } from 'react';
import type { DemoKind } from '@/data/widgetPages';

function useTick(ms: number) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setN((x) => x + 1), ms);
    return () => window.clearInterval(id);
  }, [ms]);
  return n;
}

function Window({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)]">
      <div className="flex items-center gap-1.5 border-b border-black/5 bg-[#fafafa] px-4 py-2.5 text-xs text-[#666]">
        <span className="h-2 w-2 rounded-full bg-black/10" />
        <span className="h-2 w-2 rounded-full bg-black/10" />
        <span className="h-2 w-2 rounded-full bg-black/10" />
        <span className="ml-2 font-semibold text-[#101010]">{title}</span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

const mono = 'font-mono text-[10px] uppercase tracking-wide text-[#888]';

/* Распределение: сделки падают к менеджерам на смене */
const DEALS = [
  ['Иван Петров', 'сайт'],
  ['ООО Ромашка', 'WhatsApp'],
  ['Мария С.', 'звонок'],
  ['Заявка с сайта', 'Telegram'],
  ['Алексей К.', 'сайт'],
  ['Студия Лофт', 'WhatsApp'],
  ['Олеся', 'Telegram'],
  ['Дмитрий Н.', 'звонок'],
];

function RaspredelenieDemo() {
  const t = useTick(1800);
  const col = (m: number) => {
    const items: { name: string; src: string; key: number; fresh: boolean }[] = [];
    for (let k = t + 5; k >= 0 && items.length < 3; k--) {
      if (k % 2 === m) {
        const d = DEALS[k % DEALS.length];
        items.push({ name: d[0], src: d[1], key: k, fresh: k === t + 5 || k === t + 4 });
      }
    }
    return items;
  };
  const Mgr = ({ name, idx }: { name: string; idx: number }) => (
    <div className="min-h-[190px] rounded-xl border border-black/5 bg-[#fcfcfc] p-3">
      <div className="mb-2.5 flex items-center justify-between text-[13px] font-semibold">
        {name}
        <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 font-mono text-[9px] font-normal text-emerald-700">на смене</span>
      </div>
      {col(idx).map((d) => (
        <div
          key={d.key}
          className={`mb-1.5 rounded-md border border-black/5 border-l-[3px] bg-white px-2 py-1.5 text-[11.5px] ${
            d.fresh ? 'border-l-[#E60000] animate-in fade-in slide-in-from-top-2 duration-500' : 'border-l-[#101010]'
          }`}
        >
          {d.name}
          <span className="block text-[10px] text-[#888]">{d.src} · только что</span>
        </div>
      ))}
    </div>
  );
  return (
    <Window title='Распределение · воронка "Продажи"'>
      <div className="flex items-center justify-between rounded-xl border-[1.5px] border-dashed border-black/15 px-3 py-2.5 text-[12.5px]">
        Новые заявки <b className="font-mono text-[#E60000]">+1</b>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2.5">
        <Mgr name="Анна" idx={0} />
        <Mgr name="Илья" idx={1} />
        <div className="min-h-[190px] rounded-xl border border-black/5 bg-[#fcfcfc] p-3 opacity-55">
          <div className="mb-2.5 flex items-center justify-between text-[13px] font-semibold text-[#999]">
            Олег
            <span className="rounded-full bg-black/5 px-1.5 py-0.5 font-mono text-[9px] font-normal">не на смене</span>
          </div>
          <span className={mono}>новые не получает</span>
        </div>
      </div>
      <p className={`${mono} mt-3 normal-case`}>по очереди · лимит на смену · повторный клиент к своему менеджеру</p>
    </Window>
  );
}

/* Дубли: две карточки сливаются в одну */
function DubliDemo() {
  const t = useTick(2600);
  const merged = t % 2 === 1;
  const Row = ({ k, v, hit }: { k: string; v: string; hit?: boolean }) => (
    <div className="flex justify-between border-t border-black/5 py-1 text-[12px] text-[#444]">
      <span className={mono}>{k}</span>
      <span className={hit ? 'rounded bg-red-50 px-1 font-semibold text-[#E60000]' : ''}>{v}</span>
    </div>
  );
  return (
    <Window title="Дубли · найдено 2 группы">
      <div className={`grid grid-cols-2 gap-2.5 transition-all duration-700 ${merged ? 'scale-[0.97] opacity-35' : ''}`}>
        <div className="rounded-xl border border-black/5 bg-[#fcfcfc] p-3">
          <div className="mb-2 text-sm font-semibold">Иван Петров</div>
          <Row k="тел" v="+7 916 123-45-67" hit />
          <Row k="email" v="нет" />
          <Row k="сделки" v="1" />
        </div>
        <div className="rounded-xl border border-black/5 bg-[#fcfcfc] p-3">
          <div className="mb-2 text-sm font-semibold">Петров И.</div>
          <Row k="тел" v="8 (916) 123 45 67" hit />
          <Row k="email" v="ivan@mail.ru" />
          <Row k="сделки" v="2" />
        </div>
      </div>
      <div className="my-3 flex items-center justify-between text-xs text-[#666]">
        совпадение по телефону
        <span className="rounded-lg bg-[#E60000] px-3.5 py-2 text-[12.5px] font-semibold text-white">Объединить</span>
      </div>
      <div
        className={`rounded-xl border-[1.5px] border-[#101010] p-3 transition-all duration-700 ${
          merged ? 'translate-y-0 opacity-100' : 'translate-y-1.5 opacity-20'
        }`}
      >
        <div className="mb-2 flex justify-between text-sm font-semibold">
          Иван Петров
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-mono text-[10px] font-normal text-emerald-700">объединено</span>
        </div>
        <Row k="тел" v="+7 916 123-45-67" />
        <Row k="email" v="ivan@mail.ru" />
        <Row k="сделки" v="3, история сохранена" />
      </div>
    </Window>
  );
}

/* Время и страна: настоящее время клиентов */
const ZONES: [string, string][] = [
  ['Иван, Москва', 'Europe/Moscow'],
  ['Made Wijaya, Бали', 'Asia/Makassar'],
  ['John Miller, Нью-Йорк', 'America/New_York'],
  ['Ахмед, Дубай', 'Asia/Dubai'],
];

function localTime(tz: string) {
  return new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit', timeZone: tz }).format(new Date());
}
function dayState(t: string): [string, string] {
  const h = Number(t.slice(0, 2));
  if (h >= 9 && h < 19) return ['bg-emerald-50 text-emerald-700', 'удобно'];
  if (h >= 7 && h < 22) return ['bg-amber-50 text-amber-700', h < 12 ? 'утро' : 'вечер'];
  return ['bg-red-50 text-[#E60000]', 'ночь'];
}

function ClientTimeDemo() {
  const [now, setNow] = useState<string[] | null>(null);
  const t = useTick(20000);
  useEffect(() => {
    setNow([localTime('Europe/Warsaw'), ...ZONES.map((z) => localTime(z[1]))]);
  }, [t]);
  const main = now?.[0] ?? '--:--';
  const [mc, mw] = now ? dayState(main) : ['bg-black/5 text-[#666]', ''];
  return (
    <Window title="Контакт · Анна Ковальски">
      <div className="mb-3 rounded-xl border border-black/5 bg-[#fcfcfc] p-3.5">
        <div className="text-[15px] font-semibold">Анна Ковальски</div>
        <div className="mt-2.5 flex flex-wrap items-center gap-2.5 text-[13px]">
          <span className="font-mono">+48 600 123 456</span>
          <span className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] ${mc}`}>
            ● Польша · {main}
            {mw ? ` · ${mw === 'удобно' ? 'можно звонить' : mw === 'ночь' ? 'не звонить' : 'лучше написать'}` : ''}
          </span>
        </div>
      </div>
      <p className={`${mono} mb-1.5`}>Список сделок · местное время клиента</p>
      <div className="border-t border-black/5">
        {ZONES.map((z, i) => {
          const tt = now?.[i + 1] ?? '--:--';
          const [c, w] = now ? dayState(tt) : ['bg-black/5 text-[#666]', ''];
          return (
            <div key={z[0]} className="grid grid-cols-[1.4fr_1fr_auto] items-center gap-2.5 border-b border-black/5 px-0.5 py-2 text-[12.5px]">
              <span>{z[0]}</span>
              <span className="font-mono text-[13px]">{tt}</span>
              <span className={`rounded-full px-2 py-0.5 font-mono text-[11px] ${c}`}>{w}</span>
            </div>
          );
        })}
      </div>
      <p className={`${mono} mt-3`}>Поля заполнены: страна · часовой пояс · регион</p>
    </Window>
  );
}

/* Шаблоны задач: задача в один клик */
const TPLS: [string, string, string, string][] = [
  ['Перезвонить', 'через 15 минут', 'я', 'звонок'],
  ['Отправить КП', 'до конца дня', 'я', 'письмо'],
  ['Получить оплату', 'завтра', 'бухгалтер', 'задача'],
  ['Назначить встречу', 'через 2 дня', 'РОП', 'встреча'],
];

function TaskTemplatesDemo() {
  const t = useTick(2400);
  const [picked, setPicked] = useState<number | null>(null);
  const cur = picked ?? t % TPLS.length;
  const tp = TPLS[cur];
  return (
    <Window title="Сделка #4127 · Шаблоны задач">
      <div className="grid gap-2">
        {TPLS.map((x, i) => (
          <button
            key={x[0]}
            type="button"
            onClick={() => setPicked(i)}
            className={`grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-[13px] transition-colors ${
              i === cur ? 'border-[#E60000] bg-[#fff7f7]' : 'border-black/5 bg-[#fcfcfc]'
            }`}
          >
            <span className="grid h-6 w-6 place-items-center rounded-md bg-[#fdecec] font-mono text-[11px] text-[#E60000]">0{i + 1}</span>
            <span>
              {x[0]}
              <span className="block font-mono text-[11px] text-[#888]">
                {x[1]} · {x[2]}
              </span>
            </span>
            <span className={`font-mono text-[11px] ${i === cur ? 'text-[#E60000]' : 'text-[#888]'}`}>поставить →</span>
          </button>
        ))}
      </div>
      <div key={cur} className="mt-3.5 rounded-xl border-[1.5px] border-[#101010] p-3 text-[13px] animate-in fade-in slide-in-from-bottom-2 duration-500">
        <div className="mb-2 flex justify-between font-semibold">
          {tp[0]}
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-mono text-[10px] font-normal text-emerald-700">задача создана</span>
        </div>
        {[
          ['срок', tp[1]],
          ['ответственный', tp[2]],
          ['тип', tp[3]],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between border-t border-black/5 py-1 text-[#444]">
            <span className={mono}>{k}</span>
            <span>{v}</span>
          </div>
        ))}
      </div>
    </Window>
  );
}

/* Чаты Авто.ру: сообщение по объявлению превращается в сделку, ответ уходит в чат */
const AR_MSGS: [string, string][] = [
  ['client', 'Здравствуйте, автомобиль ещё в продаже?'],
  ['manager', 'Добрый день! Да, в наличии. Когда удобно посмотреть?'],
  ['client', 'Завтра после обеда можно?'],
  ['manager', 'Да, ждём вас в 15:00'],
];

function AutoruDemo() {
  const t = useTick(1800);
  const shown = (t % (AR_MSGS.length + 2)) + 1;
  return (
    <Window title="Сделка #5203 · Чаты Авто.ру">
      <div className="mb-3 flex items-center justify-between rounded-xl border border-black/5 bg-[#fcfcfc] px-3 py-2.5 text-[13px]">
        <span>
          Kia Rio, 2021
          <span className="block font-mono text-[11px] text-[#888]">объявление · 1 450 000 ₽</span>
        </span>
        <span className="rounded-full bg-[#fdecec] px-2 py-0.5 font-mono text-[10px] text-[#E60000]">источник: Авто.ру</span>
      </div>
      <div className="grid min-h-[176px] content-start gap-2">
        {AR_MSGS.slice(0, Math.min(shown, AR_MSGS.length)).map(([who, text], i) => (
          <div
            key={text}
            className={`max-w-[85%] rounded-xl px-3 py-2 text-[13px] animate-in fade-in slide-in-from-bottom-1 duration-300 ${
              who === 'client' ? 'justify-self-start bg-[#f2f2f2]' : 'justify-self-end bg-[#101010] text-white'
            }`}
          >
            <span className={`block font-mono text-[10px] ${who === 'client' ? 'text-[#888]' : 'text-[#aaa]'}`}>
              {who === 'client' ? 'клиент · Авто.ру' : 'менеджер · из amoCRM'}
            </span>
            {text}
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between border-t border-black/5 pt-2.5">
        <span className={mono}>статус подключения</span>
        <span className="font-mono text-[11px] text-emerald-700">ответы доставляются</span>
      </div>
    </Window>
  );
}

export function WidgetDemo({ kind }: { kind: DemoKind }) {
  switch (kind) {
    case 'raspredelenie':
      return <RaspredelenieDemo />;
    case 'dubli':
      return <DubliDemo />;
    case 'client-time':
      return <ClientTimeDemo />;
    case 'task-templates':
      return <TaskTemplatesDemo />;
    case 'autoru':
      return <AutoruDemo />;
  }
}
