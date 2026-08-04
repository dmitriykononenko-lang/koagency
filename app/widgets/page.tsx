import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { WidgetsIndexPage } from '@/components/pages/WidgetsIndexPage';

export const metadata: Metadata = buildMetadata({
  title: 'Виджеты для amoCRM и Kommo',
  description:
    'Собственные виджеты KO:AGENCY для amoCRM и Kommo: шаблоны задач, автоматизация, интеграции. Устанавливаются в amoМаркете, 14 дней бесплатно, безлимит пользователей.',
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
