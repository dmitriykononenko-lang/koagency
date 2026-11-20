import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd, SITE_URL, SITE_NAME } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { WidgetLanding } from '@/components/widgets/WidgetLanding';

export const metadata: Metadata = buildMetadata({
  title: 'Шаблоны задач: виджет для amoCRM',
  description:
    'Постановка задач в один клик по готовым шаблонам из карточки сделки, контакта или компании. Шаблоны хранятся в вашем аккаунте amoCRM.',
  path: '/widgets/task-templates',
  keywords: ['шаблоны задач amocrm', 'виджет amocrm задачи', 'постановка задач amocrm'],
});

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Шаблоны задач для amoCRM',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web (amoCRM)',
  description: 'Постановка задач в один клик по готовым шаблонам из карточки сделки, контакта или компании. Шаблоны хранятся в вашем аккаунте amoCRM.',
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
            { name: 'Шаблоны задач', url: '/widgets/task-templates' },
          ]),
        ]}
      />
      <WidgetLanding slug="task-templates" />
    </>
  );
}
