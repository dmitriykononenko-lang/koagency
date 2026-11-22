import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd, SITE_URL, SITE_NAME } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { WidgetLanding } from '@/components/widgets/WidgetLanding';

export const metadata: Metadata = buildMetadata({
  title: 'Скрытие полей: виджет для amoCRM',
  description:
    'Скрывайте поля карточек сделки, контакта и компании от выбранных сотрудников и отделов: скрыть, звёздочки или только чтение.',
  path: '/widgets/hidden-field',
  keywords: ['скрыть поля amocrm', 'скрытие полей amocrm', 'права на поля amocrm'],
});

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Скрытие полей для amoCRM',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web (amoCRM)',
  description: 'Скрытие полей карточек amoCRM от выбранных сотрудников и отделов: скрыть, звёздочки или только чтение.',
  publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          softwareJsonLd,
          breadcrumbJsonLd([
            { name: 'Главная', url: '/' },
            { name: 'Виджеты', url: '/widgets' },
            { name: 'Скрытие полей', url: '/widgets/hidden-field' },
          ]),
        ]}
      />
      <WidgetLanding slug="hidden-field" />
    </>
  );
}
