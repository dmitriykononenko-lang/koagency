import type { Metadata } from 'next';
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd, SITE_URL } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { ExcelAmoPage } from '@/components/pages/ExcelAmoPage';

export const metadata: Metadata = buildMetadata({
  title: 'Перенос данных из Excel в amoCRM',
  description:
    'Миграция базы клиентов из Excel в amoCRM без потери истории. Сопоставление полей, дедупликация, импорт сделок и контактов.',
  path: '/excel-amocrm',
  keywords: ['Excel в amoCRM', 'импорт в amoCRM', 'миграция базы клиентов', 'перенос данных amoCRM'],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd(
            'Перенос данных из Excel в amoCRM',
            'Миграция базы клиентов и сделок из Excel в amoCRM',
            `${SITE_URL}/excel-amocrm`
          ),
          breadcrumbJsonLd([
            { name: 'Главная', url: '/' },
            { name: 'Excel → amoCRM', url: '/excel-amocrm' },
          ]),
        ]}
      />
      <ExcelAmoPage />
    </>
  );
}
