import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { WidgetDocPage, readDoc } from '@/components/widgets/WidgetDocPage';
import { SUPPORT } from '../docs';

const FILE = SUPPORT;
const { meta } = readDoc(FILE);
const PATH = '/widgets/autoru/support';

const TITLE = meta.title;

// buildMetadata уже добавляет « — ko:agency», а шаблон title в app/layout.tsx добавляет его второй раз,
// поэтому title задаём отдельно: суффикс один, из шаблона.
export const metadata: Metadata = {
  ...buildMetadata({
    title: TITLE,
    description: meta.description,
    path: PATH,
  }),
  title: TITLE,
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Главная', url: '/' },
          { name: 'Виджеты', url: '/widgets' },
          { name: 'Чаты Авто.ру', url: '/widgets/autoru' },
          { name: 'Поддержка «Чаты Авто.ру»', url: PATH },
        ])}
      />
      <WidgetDocPage file={FILE} backHref="/widgets/autoru" backLabel="К странице виджета" kicker="Поддержка" />
    </>
  );
}
