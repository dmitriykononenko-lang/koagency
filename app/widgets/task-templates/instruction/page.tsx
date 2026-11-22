import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { WidgetDocPage, readDoc } from '@/components/widgets/WidgetDocPage';
import { INSTRUCTION_RU } from '@/data/widgetDocs';

const FILE = INSTRUCTION_RU;
const { meta } = readDoc(FILE);

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: '/widgets/task-templates/instruction',
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Главная', url: '/' },
          { name: 'Виджеты', url: '/widgets' },
          { name: 'Шаблоны задач', url: '/widgets/task-templates' },
          { name: 'Инструкция', url: '/widgets/task-templates/instruction' },
        ])}
      />
      <WidgetDocPage file={FILE} backHref="/widgets/task-templates" backLabel="К странице виджета" kicker="Инструкция" />
    </>
  );
}
