import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { ServicesIndexPage } from '@/components/pages/ServicesIndexPage';

export const metadata: Metadata = buildMetadata({
  title: 'Услуги',
  description:
    'Полный список услуг ko:agency: настройка amoCRM, интеграции с телефонией, мессенджерами, 1С, обучение менеджеров.',
  path: '/services',
  keywords: ['услуги интегратора amoCRM', 'настройка amoCRM', 'интеграции amoCRM'],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Главная', url: '/' },
          { name: 'Услуги', url: '/services' },
        ])}
      />
      <ServicesIndexPage />
    </>
  );
}
