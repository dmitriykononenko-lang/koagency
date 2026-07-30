import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd, SITE_URL, SITE_NAME } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { WidgetTaskTemplatesPage } from '@/components/pages/WidgetTaskTemplatesPage';

export const metadata: Metadata = buildMetadata({
  title: 'Виджет «Шаблоны задач» для amoCRM',
  description:
    'Постановка задач в один клик по готовым шаблонам — прямо из карточки сделки, контакта или компании. 14 дней бесплатно. Оплата через amoМаркет.',
  path: '/widgets/task-templates',
  keywords: [
    'шаблоны задач amocrm',
    'виджет amocrm задачи',
    'постановка задач amocrm',
    'автоматизация задач amocrm',
    'amoMarket виджет',
  ],
});

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Шаблоны задач для amoCRM',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web (amoCRM)',
  description:
    'Виджет для amoCRM: постановка задач в один клик по готовым шаблонам с типом, сроком и ответственным.',
  offers: [
    {
      '@type': 'Offer',
      name: '3 месяца',
      price: '1490',
      priceCurrency: 'RUB',
    },
    {
      '@type': 'Offer',
      name: '6 месяцев (+1 в подарок)',
      price: '2490',
      priceCurrency: 'RUB',
    },
    {
      '@type': 'Offer',
      name: '12 месяцев (+2 в подарок)',
      price: '3990',
      priceCurrency: 'RUB',
    },
  ],
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          softwareJsonLd,
          breadcrumbJsonLd([
            { name: 'Главная', url: '/' },
            { name: 'Виджеты', url: '/widgets/task-templates' },
            { name: 'Шаблоны задач', url: '/widgets/task-templates' },
          ]),
        ]}
      />
      <WidgetTaskTemplatesPage />
    </>
  );
}
