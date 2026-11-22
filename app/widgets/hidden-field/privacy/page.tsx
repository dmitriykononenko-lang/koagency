import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { WidgetDocPage } from '@/components/widgets/WidgetDocPage';
import { PRIVACY } from '../docs';

const PATH = '/widgets/hidden-field/privacy';
const TITLE = 'Политика конфиденциальности «Скрытие полей»';

// buildMetadata добавляет « — ko:agency», шаблон title в app/layout.tsx добавляет его ещё раз,
// поэтому title задаём отдельно.
export const metadata: Metadata = {
  ...buildMetadata({
    title: TITLE,
    description: 'Какие данные использует виджет «Скрытие полей» для amoCRM, что передаётся KO Agency и как удалить данные.',
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
      <WidgetDocPage file={PRIVACY} backHref="/widgets/hidden-field" backLabel="К странице виджета" kicker="Юридический документ" />
    </>
  );
}
