import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { LegalPrivacyPage } from '@/components/pages/LegalPrivacyPage';

export const metadata: Metadata = buildMetadata({
  title: 'Политика конфиденциальности виджетов KO:AGENCY',
  description:
    'Политика конфиденциальности виджетов и разработок KO:AGENCY: какие данные обрабатываются, где хранятся, права пользователя.',
  path: '/legal/privacy',
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Главная', url: '/' },
          { name: 'Политика конфиденциальности', url: '/legal/privacy' },
        ])}
      />
      <LegalPrivacyPage />
    </>
  );
}
