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

/**
 * Юридические и банковские реквизиты ИП.
 * Единый источник для оферты, политики конфиденциальности, счетов.
 */
export interface LegalEntity {
  brand: string;
  legalName: string;
  legalNameShort: string;
  inn: string;
  bank: {
    name: string;
    account: string;
    bik: string;
    correspondentAccount: string;
  };
  supportEmail: string;
}

export const LEGAL_ENTITY: LegalEntity = {
  brand: 'KO:AGENCY',
  legalName: 'Индивидуальный предприниматель Кононенко Елена Витальевна',
  legalNameShort: 'ИП Кононенко Елена Витальевна',
  inn: '463300749910',
  bank: {
    name: 'ООО «Банк Точка»',
    account: '40802810820000508995',
    bik: '044525104',
    correspondentAccount: '30101810745374525104',
  },
  supportEmail: SUPPORT_EMAIL,
};
