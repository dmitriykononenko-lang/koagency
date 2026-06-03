import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/Providers';
import { JsonLd } from '@/components/JsonLd';
import { AmoChat } from '@/components/AmoChat';
import {
  SITE_NAME,
  SITE_URL,
  organizationJsonLd,
  websiteJsonLd,
} from '@/lib/seo';
import './globals.css';

// router-shim использует useSearchParams() в Header — заставляем все страницы
// рендериться динамически, чтобы избежать "missing-suspense-with-csr-bailout" на SSG.
// Это не влияет на SEO: Google и Яндекс всё равно получают полный HTML на каждый запрос.
export const dynamic = 'force-dynamic';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Интеграция amoCRM и автоматизация продаж`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    'Интегратор amoCRM/Kommo. Настройка CRM, миграция Excel → amoCRM, автоматизация отделов продаж, Enterprise-решения. Калькулятор стоимости онлайн.',
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  generator: 'Next.js',
  referrer: 'strict-origin-when-cross-origin',
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning className={inter.variable}>
      <head>
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
      </head>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
        <AmoChat />
      </body>
    </html>
  );
}
