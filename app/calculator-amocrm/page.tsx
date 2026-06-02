import type { Metadata } from 'next';
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd, SITE_URL } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { AmoCalculatorPage } from '@/components/pages/AmoCalculatorPage';

export const metadata: Metadata = buildMetadata({
  title: 'Калькулятор лицензий amoCRM',
  description:
    'Точный расчёт стоимости лицензий amoCRM по количеству пользователей и тарифу. Сравнение Базовый / Расширенный / Профессиональный.',
  path: '/calculator-amocrm',
  keywords: ['калькулятор amoCRM', 'цена amoCRM', 'тарифы amoCRM', 'стоимость лицензии amoCRM'],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd(
            'Калькулятор лицензий amoCRM',
            'Расчёт стоимости лицензий amoCRM по тарифам и количеству пользователей',
            `${SITE_URL}/calculator-amocrm`
          ),
          breadcrumbJsonLd([
            { name: 'Главная', url: '/' },
            { name: 'Калькулятор amoCRM', url: '/calculator-amocrm' },
          ]),
        ]}
      />
      <AmoCalculatorPage />
    </>
  );
}
