import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd, SITE_URL, SITE_NAME } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { WidgetLanding } from '@/components/widgets/WidgetLanding';

export const metadata: Metadata = buildMetadata({
  title: 'Время и страна клиента: виджет для amoCRM',
  description:
    'Местное время и страна клиента рядом с номером телефона в карточке и списках amoCRM. Заполнение полей страны, часового пояса и региона.',
  path: '/widgets/client-time',
  keywords: ['время клиента amocrm', 'часовой пояс amocrm', 'страна по номеру amocrm'],
});

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Время и страна клиента для amoCRM',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web (amoCRM)',
  description: 'Местное время и страна клиента рядом с номером телефона в карточке и списках amoCRM. Заполнение полей страны, часового пояса и региона.',
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
            { name: 'Время и страна клиента', url: '/widgets/client-time' },
          ]),
        ]}
      />
      <WidgetLanding slug="client-time" />
    </>
  );
}
