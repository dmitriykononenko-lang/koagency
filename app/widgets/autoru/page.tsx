import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd, SITE_URL, SITE_NAME } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { WidgetLanding } from '@/components/widgets/WidgetLanding';

export const metadata: Metadata = buildMetadata({
  title: 'Чаты Авто.ру: виджет для amoCRM',
  description:
    'Чаты дилера с Авто.ру в сделках amoCRM: сделка и контакт по первому сообщению, ответы клиенту из карточки сделки, без дублей.',
  path: '/widgets/autoru',
  keywords: ['авто.ру amocrm', 'чаты авто.ру amocrm', 'интеграция авто.ру amocrm'],
});

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Чаты Авто.ру для amoCRM',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web (amoCRM)',
  description: 'Чаты дилера с Авто.ру в сделках amoCRM: сделка и контакт по первому сообщению, ответы клиенту из карточки сделки.',
  publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          softwareJsonLd,
          breadcrumbJsonLd([
            { name: 'Главная', url: '/' },
            { name: 'Виджеты', url: '/widgets' },
            { name: 'Чаты Авто.ру', url: '/widgets/autoru' },
          ]),
        ]}
      />
      <WidgetLanding slug="autoru" />
    </>
  );
}
