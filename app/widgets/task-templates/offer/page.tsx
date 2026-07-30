import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { WidgetOfferPage } from '@/components/pages/WidgetOfferPage';

export const metadata: Metadata = buildMetadata({
  title: 'Публичная оферта — Шаблоны задач для amoCRM',
  description:
    'Публичная оферта на использование виджета «Шаблоны задач» для amoCRM. Условия подписки, оплата, поддержка, ответственность.',
  path: '/widgets/task-templates/offer',
  noindex: false,
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Главная', url: '/' },
          { name: 'Виджет «Шаблоны задач»', url: '/widgets/task-templates' },
          { name: 'Публичная оферта', url: '/widgets/task-templates/offer' },
        ])}
      />
      <WidgetOfferPage />
    </>
  );
}
