import type { Metadata } from 'next';
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd, SITE_URL } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { CalculatorPage } from '@/components/pages/CalculatorPage';

export const metadata: Metadata = buildMetadata({
  title: 'Калькулятор стоимости интеграции',
  description:
    'Рассчитайте стоимость внедрения amoCRM/Kommo за 1 минуту. Прозрачный расчёт по этапам: настройка, интеграции, обучение.',
  path: '/calculator',
  keywords: ['калькулятор amoCRM', 'стоимость внедрения CRM', 'цена настройки amoCRM'],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd(
            'Калькулятор стоимости интеграции CRM',
            'Онлайн-расчёт стоимости внедрения amoCRM/Kommo',
            `${SITE_URL}/calculator`
          ),
          breadcrumbJsonLd([
            { name: 'Главная', url: '/' },
            { name: 'Калькулятор', url: '/calculator' },
          ]),
        ]}
      />
      <CalculatorPage />
    </>
  );
}
