import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd, SITE_URL, SITE_NAME } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { WidgetLanding } from '@/components/widgets/WidgetLanding';

export const metadata: Metadata = buildMetadata({
  title: 'Распределение сделок: виджет для amoCRM',
  description:
    'Автоматическое распределение новых сделок между менеджерами: по очереди или по правилам, с учётом смен и лимитов. Повторный клиент уходит к своему менеджеру.',
  path: '/widgets/raspredelenie',
  keywords: ['распределение сделок amocrm', 'распределение заявок amocrm', 'виджет amocrm распределение'],
});

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Распределение сделок для amoCRM',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web (amoCRM)',
  description: 'Автоматическое распределение новых сделок между менеджерами: по очереди или по правилам, с учётом смен и лимитов. Повторный клиент уходит к своему менеджеру.',
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
            { name: 'Распределение сделок', url: '/widgets/raspredelenie' },
          ]),
        ]}
      />
      <WidgetLanding slug="raspredelenie" />
    </>
  );
}
