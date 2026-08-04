export interface Widget {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: 'productivity' | 'analytics' | 'integrations' | 'ai';
  platform: 'amoCRM' | 'Kommo' | 'amoCRM · Kommo';
  status: 'live' | 'beta' | 'coming-soon';
  price: string;
  priceNote?: string;
  icon: string; // lucide-react icon name
  bullets: string[];
  tags: string[];
  href: string;
  amoMarketUrl?: string;
}

export const widgetsData: Record<string, Widget> = {
  'task-templates': {
    slug: 'task-templates',
    title: 'Шаблоны задач',
    tagline: 'Ставьте типовые задачи в один клик',
    description:
      'Готовые шаблоны задач с настроенным типом, сроком и ответственным. Комментарий, гибкие сроки (15/30 мин, час, до конца дня, завтра, через неделю), точки входа в карточке сделки, контакта и компании.',
    category: 'productivity',
    platform: 'amoCRM · Kommo',
    status: 'live',
    price: 'от 490 ₽/мес',
    priceNote: '14 дней бесплатно',
    icon: 'ListChecks',
    bullets: [
      'Шаблон задаёт всё сразу: тип, срок, ответственный, комментарий',
      'Гибкие сроки: 15/30 минут, час, до конца дня, завтра, через 2–3 дня, неделю',
      'Простой редактор без программиста',
    ],
    tags: ['Задачи', 'Автоматизация', 'amoCRM', 'Kommo'],
    href: '/widgets/task-templates',
  },
};

export const widgetsList = Object.values(widgetsData);
