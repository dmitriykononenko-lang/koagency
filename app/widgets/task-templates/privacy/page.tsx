import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { WidgetDocPage, readDoc } from '@/components/widgets/WidgetDocPage';
import { PRIVACY_RU } from '@/data/widgetDocs';

const FILE = PRIVACY_RU;
const { meta } = readDoc(FILE);

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: '/widgets/task-templates/privacy',
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Главная', url: '/' },
          { name: 'Виджеты', url: '/widgets' },
          { name: 'Шаблоны задач', url: '/widgets/task-templates' },
          { name: 'Политика конфиденциальности', url: '/widgets/task-templates/privacy' },
        ])}
      />
      <WidgetDocPage file={FILE} backHref="/widgets/task-templates" backLabel="К странице виджета" kicker="Юридический документ" />
    </>
  );
}
