import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { WidgetPrivacyPage } from '@/components/pages/WidgetPrivacyPage';

export const metadata: Metadata = buildMetadata({
  title: 'Политика конфиденциальности — Шаблоны задач для amoCRM',
  description:
    'Политика конфиденциальности виджета «Шаблоны задач»: какие данные обрабатываются, где хранятся, права пользователя.',
  path: '/widgets/task-templates/privacy',
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Главная', url: '/' },
          { name: 'Виджет «Шаблоны задач»', url: '/widgets/task-templates' },
          { name: 'Политика конфиденциальности', url: '/widgets/task-templates/privacy' },
        ])}
      />
      <WidgetPrivacyPage />
    </>
  );
}
