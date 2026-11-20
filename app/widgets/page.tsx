import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { WidgetsIndexPage } from '@/components/pages/WidgetsIndexPage';

export const metadata: Metadata = buildMetadata({
  title: 'Виджеты для amoCRM',
  description:
    'Собственные виджеты KO:AGENCY для amoCRM: распределение сделок, поиск и объединение дублей, время и страна клиента, шаблоны задач. Устанавливаются через amoМаркет.',
  path: '/widgets',
  keywords: [
    'виджеты amocrm',
    'виджеты kommo',
    'amoМаркет',
    'шаблоны задач amocrm',
    'ko:agency виджеты',
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Главная', url: '/' },
          { name: 'Виджеты', url: '/widgets' },
        ])}
      />
      <WidgetsIndexPage />
    </>
  );
}
