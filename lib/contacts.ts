/**
 * Единый источник контактных email адресов KO:AGENCY.
 * Меняем здесь — обновляется везде (Footer, Contact, Legal).
 */

export interface ContactEmail {
  address: string;
  label: string;
  purpose: string;
  order: number;
}

export const CONTACT_EMAILS: ContactEmail[] = [
  {
    address: 'hello@koagency.me',
    label: 'Общие вопросы',
    purpose: 'Проекты, консультации, коммерческие предложения',
    order: 1,
  },
  {
    address: 'service@koagency.me',
    label: 'Поддержка и сервис',
    purpose: 'Вопросы по действующим внедрениям, виджетам и подпискам',
    order: 2,
  },
  {
    address: 'partners@koagency.me',
    label: 'Партнёрство',
    purpose: 'Интеграторам, разработчикам виджетов, реселлерам',
    order: 3,
  },
  {
    address: 'hr@koagency.me',
    label: 'Найм',
    purpose: 'Резюме, стажировки, вакансии в команде',
    order: 4,
  },
];

export const PRIMARY_EMAIL = 'hello@koagency.me';
export const SUPPORT_EMAIL = 'service@koagency.me';
export const HR_EMAIL = 'hr@koagency.me';
export const PARTNERS_EMAIL = 'partners@koagency.me';

export function emailByPurpose(purpose: 'general' | 'support' | 'partners' | 'hr'): string {
  switch (purpose) {
    case 'support':
      return SUPPORT_EMAIL;
    case 'partners':
      return PARTNERS_EMAIL;
    case 'hr':
      return HR_EMAIL;
    default:
      return PRIMARY_EMAIL;
  }
}
