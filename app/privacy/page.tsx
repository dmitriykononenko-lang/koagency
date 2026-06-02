import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { PrivacyPolicyPage } from '@/components/pages/PrivacyPolicyPage';

export const metadata: Metadata = buildMetadata({
  title: 'Политика конфиденциальности',
  description: 'Политика обработки персональных данных ko:agency согласно ФЗ-152.',
  path: '/privacy',
  noindex: true, // юр. страница, не нужна в индексе
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Главная', url: '/' },
          { name: 'Политика конфиденциальности', url: '/privacy' },
        ])}
      />
      <PrivacyPolicyPage />
    </>
  );
}
