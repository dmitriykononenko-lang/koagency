import type { Metadata } from 'next';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { WidgetDocPage } from '@/components/widgets/WidgetDocPage';
import { LegalRequisites } from '@/components/LegalRequisites';
import { PRIVACY } from '../docs';

const PATH = '/widgets/finance/privacy';
const TITLE = 'Политика конфиденциальности «Финансовый учёт»';

// buildMetadata добавляет « — ko:agency», шаблон title в app/layout.tsx добавляет его ещё раз,
// поэтому title задаём отдельно.
export const metadata: Metadata = {
  ...buildMetadata({
    title: TITLE,
    description: 'Какие данные обрабатывает виджет «Финансовый учёт» для amoCRM, где они хранятся и как их удалить.',
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
      <WidgetDocPage file={PRIVACY} backHref="/widgets" backLabel="Ко всем виджетам" kicker="Юридический документ">
        <h2 className="mb-4 mt-12 text-2xl font-bold tracking-tight text-[#101010]">Реквизиты</h2>
        <LegalRequisites compact />
      </WidgetDocPage>
    </>
  );
}
