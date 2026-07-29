import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { CasesIndexPage } from '@/components/pages/CasesIndexPage';

export const metadata: Metadata = buildMetadata({
  title: 'Кейсы клиентов',
  description:
    'Реальные истории внедрения amoCRM и Kommo от ko:agency: e-commerce, строительство, образование, B2B услуги. Метрики, стек, сроки, отзывы.',
  path: '/cases',
  keywords: [
    'кейсы внедрения amocrm',
    'кейсы kommo',
    'примеры внедрения crm',
    'результаты внедрения crm',
    'кейсы автоматизации продаж',
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Главная', url: '/' },
          { name: 'Кейсы', url: '/cases' },
        ])}
      />
      <CasesIndexPage />
    </>
  );
}
