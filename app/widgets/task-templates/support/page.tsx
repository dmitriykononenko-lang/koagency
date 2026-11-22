import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { WidgetDocPage, readDoc } from '@/components/widgets/WidgetDocPage';
import { SUPPORT_RU } from '@/data/widgetDocs';

const FILE = SUPPORT_RU;
const { meta } = readDoc(FILE);

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: '/widgets/task-templates/support',
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Главная', url: '/' },
          { name: 'Виджеты', url: '/widgets' },
          { name: 'Шаблоны задач', url: '/widgets/task-templates' },
          { name: 'Поддержка', url: '/widgets/task-templates/support' },
        ])}
      />
      <WidgetDocPage file={FILE} backHref="/widgets/task-templates" backLabel="К странице виджета" kicker="Поддержка" />
    </>
  );
}
