import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { BriefPage } from '@/components/pages/BriefPage';

export const metadata: Metadata = buildMetadata({
  title: 'Бриф на внедрение amoCRM / Kommo',
  description:
    'Онлайн-бриф для внедрения CRM: 8 секций, 10–15 минут. Ответы автоматически попадают в сделку amoCRM — созвон будет сразу по сути.',
  path: '/brief',
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Главная', url: '/' },
          { name: 'Бриф', url: '/brief' },
        ])}
      />
      <BriefPage />
    </>
  );
}
