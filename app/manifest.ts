import type { MetadataRoute } from 'next';
import { SITE_NAME } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Интеграция amoCRM`,
    short_name: SITE_NAME,
    description: 'Интегратор amoCRM/Kommo. Автоматизация продаж под ключ.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0a0a0a',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    lang: 'ru-RU',
  };
}
