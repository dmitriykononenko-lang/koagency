import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { HomePage } from '@/components/pages/HomePage';

export const metadata: Metadata = buildMetadata({
  title: 'Интеграция amoCRM и автоматизация продаж',
  description:
    'ko:agency — интегратор amoCRM/Kommo. Настройка CRM, миграция данных, автоматизация продаж под ключ. Калькулятор стоимости онлайн.',
  path: '/',
  keywords: [
    'amoCRM',
    'Kommo',
    'интеграция amoCRM',
    'настройка amoCRM',
    'автоматизация продаж',
    'CRM-интегратор',
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([{ name: 'Главная', url: '/' }])}
      />
      <HomePage />
    </>
  );
}
