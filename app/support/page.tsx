import type { Metadata } from 'next';
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd, SITE_URL } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { SupportPage } from '@/components/pages/SupportPage';

export const metadata: Metadata = buildMetadata({
  title: 'Техническое сопровождение amoCRM',
  description:
    'Внешняя CRM-команда для amoCRM и Kommo: мониторинг и починка, развитие системы, защита WhatsApp/Meta, контроль расходов на сервисы. Пакеты от 15 000 ₽/мес.',
  path: '/support',
  keywords: [
    'сопровождение amoCRM',
    'техническое сопровождение CRM',
    'поддержка amoCRM',
    'администрирование amoCRM',
    'разбан WhatsApp WABA',
    'аудит amoCRM',
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd(
            'Техническое сопровождение amoCRM',
            'Внешняя CRM-команда: мониторинг, развитие системы, защита WhatsApp/Meta, контроль расходов. От 15 000 ₽/мес.',
            `${SITE_URL}/support`
          ),
          breadcrumbJsonLd([
            { name: 'Главная', url: '/' },
            { name: 'Сопровождение', url: '/support' },
          ]),
        ]}
      />
      <SupportPage />
    </>
  );
}
