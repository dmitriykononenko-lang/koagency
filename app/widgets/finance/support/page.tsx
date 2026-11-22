import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { WidgetDocPage } from '@/components/widgets/WidgetDocPage';
import { SUPPORT } from '../docs';

const PATH = '/widgets/finance/support';
const TITLE = 'Поддержка виджета «Финансовый учёт»';

// buildMetadata добавляет « — ko:agency», шаблон title в app/layout.tsx добавляет его ещё раз,
// поэтому title задаём отдельно.
export const metadata: Metadata = {
  ...buildMetadata({
    title: TITLE,
    description: 'Что умеет виджет «Финансовый учёт» для amoCRM, установка, первые шаги, частые вопросы и контакты поддержки KO:AGENCY.',
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
          { name: TITLE, url: PATH },
        ])}
      />
      <WidgetDocPage file={SUPPORT} backHref="/widgets" backLabel="Ко всем виджетам" kicker="Поддержка"></WidgetDocPage>
    </>
  );
}
