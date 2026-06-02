import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { AboutPage } from '@/components/pages/AboutPage';

export const metadata: Metadata = buildMetadata({
  title: 'О компании ko:agency',
  description:
    'ko:agency — команда интеграторов amoCRM/Kommo. Кейсы, экспертиза, подход к работе с отделами продаж.',
  path: '/about',
  keywords: ['ko:agency', 'команда интеграторов amoCRM', 'агентство автоматизации продаж'],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Главная', url: '/' },
          { name: 'О компании', url: '/about' },
        ])}
      />
      <AboutPage />
    </>
  );
}
