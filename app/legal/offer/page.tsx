import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { LegalOfferPage } from '@/components/pages/LegalOfferPage';

export const metadata: Metadata = buildMetadata({
  title: 'Публичная оферта на использование виджетов KO:AGENCY',
  description:
    'Публичная оферта на использование виджетов и разработок KO:AGENCY для amoCRM и Kommo. Условия подписки, оплата через amoМаркет, поддержка, ответственность.',
  path: '/legal/offer',
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Главная', url: '/' },
          { name: 'Публичная оферта', url: '/legal/offer' },
        ])}
      />
      <LegalOfferPage />
    </>
  );
}
