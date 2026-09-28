import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { LegalCookiesPage } from '@/components/pages/LegalCookiesPage';

export const metadata: Metadata = buildMetadata({
  title: 'Политика cookie и технических данных',
  description:
    'Как koagency.me использует cookie, локальное хранение и аналитику. Категории, управление и отзыв согласия.',
  path: '/legal/cookies',
  noindex: true,
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Главная', url: '/' },
          { name: 'Юридические документы', url: '/privacy' },
          { name: 'Cookie-политика', url: '/legal/cookies' },
        ])}
      />
      <LegalCookiesPage />
    </>
  );
}
