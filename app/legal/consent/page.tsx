import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { LegalConsentPage } from '@/components/pages/LegalConsentPage';

export const metadata: Metadata = buildMetadata({
  title: 'Согласие на обработку данных заявки',
  description:
    'Отдельное согласие на обработку персональных данных для рассмотрения заявки, направленной через сайт koagency.me.',
  path: '/legal/consent',
  noindex: true,
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Главная', url: '/' },
          { name: 'Юридические документы', url: '/privacy' },
          { name: 'Согласие на обработку заявки', url: '/legal/consent' },
        ])}
      />
      <LegalConsentPage />
    </>
  );
}
