import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { LegalCompanyPage } from '@/components/pages/LegalCompanyPage';

export const metadata: Metadata = buildMetadata({
  title: 'Юридическая информация и контакты',
  description:
    'Юридическое лицо, ИНН, ОГРНИП, адрес и контакты владельца бренда ko:agency.',
  path: '/legal/company',
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Главная', url: '/' },
          { name: 'Юридические документы', url: '/privacy' },
          { name: 'Юридическая информация', url: '/legal/company' },
        ])}
      />
      <LegalCompanyPage />
    </>
  );
}
