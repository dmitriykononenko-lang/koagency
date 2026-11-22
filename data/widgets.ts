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
  raspredelenie: {
    slug: 'raspredelenie',
    title: 'Распределение сделок',
    tagline: 'Каждая заявка сразу у своего менеджера',
    description:
      'Новые сделки сами распределяются между менеджерами: по очереди или по правилам, с учётом рабочего времени, смен и лимитов.',
    category: 'productivity',
    platform: 'amoCRM',
    status: 'live',
    price: 'от 1 995 ₽/мес',
    priceNote: 'Пробный период 7 дней',
    icon: 'Users',
    bullets: [
      'По очереди или по правилам для воронок и этапов',
      'Рабочее время, смены и лимит сделок',
      'Повторный клиент уходит к своему менеджеру',
    ],
    tags: ['Сделки', 'Отдел продаж', 'amoCRM'],
    href: '/widgets/raspredelenie',
  },
  dubli: {
    slug: 'dubli',
    title: 'Поиск и объединение дублей',
    tagline: 'Один клиент, одна карточка',
    description:
      'Находит дубли контактов, компаний и сделок и объединяет их штатным механизмом amoCRM. История, сделки и примечания сохраняются.',
    category: 'productivity',
    platform: 'amoCRM',
    status: 'beta',
    price: 'от 1 995 ₽/мес',
    priceNote: 'Пробный период 5 дней',
    icon: 'Merge',
    bullets: [
      'Поиск по телефону, email, ИНН и названию',
      'Объединение без потери истории',
      'Свои правила и журнал объединений',
    ],
    tags: ['База', 'Дубли', 'amoCRM'],
    href: '/widgets/dubli',
  },
  'client-time': {
    slug: 'client-time',
    title: 'Время и страна клиента',
    tagline: 'Не звоните клиенту ночью',
    description:
      'Местное время и страна клиента рядом с номером телефона в карточке и в списках. Страна, часовой пояс и регион заполняются в полях.',
    category: 'productivity',
    platform: 'amoCRM',
    status: 'beta',
    price: 'Бесплатно',
    icon: 'Globe',
    bullets: [
      'Местное время у номера в карточке и списках',
      'Страна по коду телефона',
      'Заполнение полей страны, пояса и региона',
    ],
    tags: ['Звонки', 'Часовые пояса', 'amoCRM'],
    href: '/widgets/client-time',
  },
  'task-templates': {
    slug: 'task-templates',
    title: 'Шаблоны задач',
    tagline: 'Типовая задача в один клик',
    description:
      'Готовые шаблоны задач с текстом, типом, сроком и ответственным. Кнопка в карточке сделки, контакта и компании.',
    category: 'productivity',
    platform: 'amoCRM',
    status: 'beta',
    price: 'от 1 490 ₽ за 3 месяца',
    priceNote: 'Пробный период 7 дней',
    icon: 'ListChecks',
    bullets: [
      'Шаблон задаёт всё сразу: тип, срок, ответственный, текст',
      'Гибкие сроки: от 15 минут до недели',
      'Простой редактор без программиста',
    ],
    tags: ['Задачи', 'Автоматизация', 'amoCRM'],
    href: '/widgets/task-templates',
  },
  autoru: {
    slug: 'autoru',
    title: 'Чаты Авто.ру',
    tagline: 'Чаты дилера в сделках amoCRM',
    description:
      'Клиент пишет по объявлению на Авто.ру, и в amoCRM появляется сделка с контактом и ссылкой на автомобиль. Менеджер отвечает из карточки сделки.',
    category: 'integrations',
    platform: 'amoCRM',
    status: 'beta',
    price: 'Цена в amoМаркете',
    icon: 'MessageSquare',
    bullets: [
      'Сделка и контакт по первому сообщению',
      'Ответы из карточки уходят в чат Авто.ру',
      'Один клиент, один контакт, без дублей',
    ],
    tags: ['Чаты', 'Авто.ру', 'amoCRM'],
    href: '/widgets/autoru',
  },
  'hidden-field': {
    slug: 'hidden-field',
    title: 'Скрытие полей',
    tagline: 'Каждый видит только нужные поля',
    description:
      'Скрывает поля карточек сделки, контакта и компании от выбранных сотрудников и отделов: скрыть, звёздочки или только чтение.',
    category: 'productivity',
    platform: 'amoCRM',
    status: 'beta',
    price: 'Оплата по счёту KO Agency',
    icon: 'EyeOff',
    bullets: [
      'Три режима: скрыть, звёздочки, только чтение',
      'Правила для сотрудников, отделов и воронок',
      'Все настройки в одной матрице',
    ],
    tags: ['Поля', 'Доступ', 'amoCRM'],
    href: '/widgets/hidden-field',
  },
  finance: {
    slug: 'finance',
    title: 'Финансовый учёт',
    tagline: 'Прибыль по каждой сделке',
    description: 'План выручки, поступления, расходы и прибыль по сделкам прямо в amoCRM. Движение денег, счета и долги.',
    category: 'analytics',
    platform: 'amoCRM',
    status: 'coming-soon',
    price: 'Скоро',
    icon: 'Wallet',
    bullets: ['Вкладка в карточке сделки', 'Движение денег по месяцам', 'Выгрузка в Excel'],
    tags: ['Финансы', 'amoCRM'],
    href: '/widgets/finance',
  },
};

export const widgetsList = Object.values(widgetsData);
