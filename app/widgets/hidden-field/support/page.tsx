import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { WidgetDocPage } from '@/components/widgets/WidgetDocPage';
import { SUPPORT } from '../docs';

const PATH = '/widgets/hidden-field/support';
const TITLE = 'Поддержка виджета «Скрытие полей»';

// buildMetadata добавляет « — ko:agency», шаблон title в app/layout.tsx добавляет его ещё раз,
// поэтому title задаём отдельно.
export const metadata: Metadata = {
  ...buildMetadata({
    title: TITLE,
    description: 'Как связаться с поддержкой виджета «Скрытие полей» для amoCRM, когда ответим и что прислать в письме.',
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
          { name: 'Скрытие полей', url: '/widgets/hidden-field' },
          { name: TITLE, url: PATH },
        ])}
      />
      <WidgetDocPage file={SUPPORT} backHref="/widgets/hidden-field" backLabel="К странице виджета" kicker="Поддержка" />
    </>
  );
}
