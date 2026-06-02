import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Страница не найдена',
  description: 'Запрошенная страница не найдена. Вернитесь на главную ko:agency.',
  path: '/404',
  noindex: true,
});

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl text-muted-foreground">
        Страница не найдена или была перенесена.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-md bg-[#E60000] px-6 py-3 text-white hover:bg-[#cc0000] transition-colors"
      >
        На главную
      </Link>
    </div>
  );
}
