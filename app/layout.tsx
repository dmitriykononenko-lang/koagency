import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
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
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Интеграция amoCRM и автоматизация продаж`,
    description:
      'Интегратор amoCRM/Kommo. Внедрение под ключ, AI-квалификация лидов, 200+ проектов, 9 лет на рынке.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ko:agency — Интеграция amoCRM и автоматизация продаж',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Интеграция amoCRM и автоматизация продаж`,
    description: 'Интегратор amoCRM/Kommo. Внедрение, AI-квалификация, поддержка 24/7.',
    images: ['/og-image.jpg'],
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
        {/* Google Analytics 4 (G-F3XEVMHM2B) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F3XEVMHM2B"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-F3XEVMHM2B');
            `,
          }}
        />
        {/* Yandex.Metrika counter */}
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=112550385', 'ym');
              ym(112550385, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
            `,
          }}
        />
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/112550385"
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
