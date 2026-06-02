import type { Metadata } from 'next';
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd, SITE_URL } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { EnterprisePage } from '@/components/pages/EnterprisePage';

export const metadata: Metadata = buildMetadata({
  title: 'Enterprise-внедрение amoCRM',
  description:
    'Внедрение amoCRM для крупного бизнеса: интеграция с ERP/1С, корпоративная безопасность, выделенная команда сопровождения.',
  path: '/enterprise',
  keywords: [
    'amoCRM enterprise',
    'корпоративное внедрение CRM',
    'amoCRM для крупного бизнеса',
    'CRM с 1С',
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd(
            'Enterprise-внедрение amoCRM',
            'Внедрение amoCRM для крупного бизнеса с интеграцией ERP/1С',
            `${SITE_URL}/enterprise`
          ),
          breadcrumbJsonLd([
            { name: 'Главная', url: '/' },
            { name: 'Enterprise', url: '/enterprise' },
          ]),
        ]}
      />
      <EnterprisePage />
    </>
  );
}
