import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd, SITE_URL, SITE_NAME } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { WidgetLanding } from '@/components/widgets/WidgetLanding';

export const metadata: Metadata = buildMetadata({
  title: 'Поиск и объединение дублей: виджет для amoCRM',
  description:
    'Поиск и объединение дублей контактов, компаний и сделок в amoCRM без потери истории. Поиск по телефону, email, ИНН и названию.',
  path: '/widgets/dubli',
  keywords: ['дубли amocrm', 'объединение дублей amocrm', 'поиск дублей amocrm'],
});

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Поиск и объединение дублей для amoCRM',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web (amoCRM)',
  description: 'Поиск и объединение дублей контактов, компаний и сделок в amoCRM без потери истории. Поиск по телефону, email, ИНН и названию.',
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
            { name: 'Поиск и объединение дублей', url: '/widgets/dubli' },
          ]),
        ]}
      />
      <WidgetLanding slug="dubli" />
    </>
  );
}
