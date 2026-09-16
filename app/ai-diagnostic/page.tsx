import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd, SITE_URL } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { AIDiagnosticPage } from '@/components/pages/AIDiagnosticPage';

export const metadata: Metadata = buildMetadata({
  title: 'Диагностика готовности бизнеса к AI',
  description:
    'Бесплатная 5-минутная диагностика: узнайте уровень зрелости процессов и готовность к внедрению AI-агента. Персональный вывод и рекомендации от ko:agency.',
  path: '/ai-diagnostic',
  keywords: [
    'диагностика готовности к AI',
    'AI-агент для бизнеса',
    'AI-квалификация лидов',
    'внедрение AI',
    'аудит процессов',
    'CRM и AI',
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Главная', url: '/' },
            { name: 'Диагностика готовности к AI', url: '/ai-diagnostic' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Диагностика готовности бизнеса к AI',
            url: `${SITE_URL}/ai-diagnostic`,
            description:
              'Интерактивная диагностика зрелости процессов и готовности к внедрению AI-агента.',
            isPartOf: { '@type': 'WebSite', url: SITE_URL, name: 'ko:agency' },
          },
        ]}
      />
      <AIDiagnosticPage />
    </>
  );
}
