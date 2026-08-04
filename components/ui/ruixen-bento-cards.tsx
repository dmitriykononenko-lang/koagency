'use client';

import React from 'react';
import { cn } from './utils';
import { Link } from '@/lib/router-shim';

/**
 * RuixenBentoCards (21st.dev) — адаптировано под ko:agency.
 * Контент про услуги ko:agency, фирменные красные «плюсы» по углам,
 * cn из ./utils, без next/image. Поддержка light/dark через токены.
 */
const cardContents: { title: string; description: string; href: string }[] = [
  {
    title: 'Внедрение под ключ',
    description:
      'Переносим ваш процесс продаж в amoCRM / Kommo за 2 недели: воронки под цикл сделки, права менеджеров, кастомные поля. Не «как у всех», а под вашу нишу.',
    href: '/services/amocrm-implementation',
  },
  {
    title: 'AI-квалификация лидов',
    description:
      'Настраиваем AI-квалификаторов, которые автоматически отбирают горячих клиентов и экономят время менеджеров.',
    href: '/services/ai-qualifiers',
  },
  {
    title: 'Гибкие воронки под нишу',
    description:
      'Проектируем динамичные воронки и автоматизацию под ваш бизнес: от 5 до 12 стадий под цикл сделки, обязательные поля при переходах, Digital Pipeline с триггерами, авто-задачи менеджерам и рассылки в WhatsApp, Telegram и email. Каждый лид доходит до конца воронки, ничего не теряется.',
    href: '/services',
  },
  {
    title: 'Интеграции',
    description: '1С, WhatsApp, Telegram, телефония, сайт и эквайринг — данные в одном окне.',
    href: '/services',
  },
  {
    title: 'Поддержка 24/7',
    description: 'Техническая поддержка и сопровождение вашей CRM без выходных.',
    href: '/support',
  },
];

const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    strokeWidth="1.5"
    stroke="currentColor"
    className={cn('size-6 text-[#E60000]', className)}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
);

const CornerPlusIcons = () => (
  <>
    <PlusIcon className="absolute -left-3 -top-3" />
    <PlusIcon className="absolute -right-3 -top-3" />
    <PlusIcon className="absolute -bottom-3 -left-3" />
    <PlusIcon className="absolute -bottom-3 -right-3" />
  </>
);

const PlusCard: React.FC<{
  className?: string;
  title: string;
  description: string;
  href: string;
}> = ({ className = '', title, description, href }) => {
  return (
    <div
      className={cn(
        'relative flex min-h-[200px] flex-col justify-between rounded-lg border border-dashed border-zinc-300 bg-white p-6 transition-colors hover:border-[#E60000]/60 dark:border-zinc-700 dark:bg-zinc-950',
        className
      )}
    >
      <Link to={href} className="block">
        <CornerPlusIcons />
        <div className="relative z-10 space-y-2">
          <h3 className="text-xl font-bold tracking-tight text-[#101010] dark:text-gray-100">
            {title}
          </h3>
          <p className="text-[#666666] dark:text-gray-300">{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default function RuixenBentoCards() {
  return (
    <section className="border border-gray-200 bg-white dark:border-gray-800 dark:bg-transparent">
      <div className="container mx-auto border border-t-0 border-gray-200 px-4 py-12 dark:border-gray-800">
        <div className="grid auto-rows-auto grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <PlusCard {...cardContents[0]} className="lg:col-span-3 lg:row-span-2" />
          <PlusCard {...cardContents[1]} className="lg:col-span-2 lg:row-span-2" />
          <PlusCard {...cardContents[2]} className="lg:col-span-4 lg:row-span-1" />
          <PlusCard {...cardContents[3]} className="lg:col-span-2 lg:row-span-1" />
          <PlusCard {...cardContents[4]} className="lg:col-span-2 lg:row-span-1" />
        </div>

        <div className="ml-auto mt-6 max-w-2xl px-4 text-right lg:-mt-20">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-[#101010] dark:text-white md:text-6xl">
            Построено под продажи.{' '}
            <span className="text-[#E60000]">Гибко под ваш бизнес.</span>
          </h2>
          <p className="text-lg text-[#666666] dark:text-gray-400">
            ko:agency собирает CRM, которая реально работает на выручку: быстро, гибко и под ваш
            процесс. Каждый блок продуман, переиспользуем и заточен под продажи.
          </p>
        </div>
      </div>
    </section>
  );
}
