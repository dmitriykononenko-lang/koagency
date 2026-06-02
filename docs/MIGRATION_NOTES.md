# Заметки по миграции Vite → Next.js

## Что было автоматизировано

1. **`react-router-dom` → шим `@/lib/router-shim`** — все импорты заменены sed-скриптом. API сохранён: `useLocation`, `useNavigate`, `useParams`, `Link`, `NavLink`, `BrowserRouter` (stub).
2. **`'use client'`** — добавлен в 66+ компонентов, использующих хуки, framer-motion, browser API. Корневой `Providers.tsx` оборачивает всё в Theme + Language.
3. **`SEOHead` (CSR через useEffect) → Next Metadata API** — каждая страница в `app/*/page.tsx` экспортирует `metadata` или `generateMetadata`. Старый `components/SEO/SEOHead.tsx` можно удалить.
4. **`index.html`** заменён на `app/layout.tsx` с `<html>`, `<head>`, JSON-LD, шрифтом через `next/font`.

## Что нужно проверить руками после `npm install`

### 1. Запустить dev и проверить, что страницы открываются
```bash
npm run dev
```
Открыть:
- `http://localhost:3000/`
- `http://localhost:3000/calculator`
- `http://localhost:3000/calculator-amocrm`
- `http://localhost:3000/excel-amocrm`
- `http://localhost:3000/enterprise`
- `http://localhost:3000/about`
- `http://localhost:3000/services`
- `http://localhost:3000/services/amocrm-implementation`
- `http://localhost:3000/privacy`

### 2. Возможные ошибки и быстрые фиксы

**«Cannot read property 'X' of undefined» на сервере** — компонент обращается к `window`/`document`/`localStorage` вне useEffect. Найти и обернуть в `if (typeof window !== 'undefined')` или вынести в `useEffect`.

**«Functions cannot be passed directly to Client Components»** — Server Component передаёт функцию-проп в Client Component. Маркировать Server-обёртку как `'use client'` или убрать функцию.

**Hydration mismatch** — компонент рендерит разный HTML на сервере и клиенте. Часто это `LanguageContext`/`ThemeProvider`. Решение: добавить `suppressHydrationWarning` на `<html>` (уже сделано) и/или `useEffect` для синхронизации с `localStorage`.

**`figma:asset/*` импорты** — Figma Make использовала виртуальный префикс. Если в компонентах остались такие импорты, заменить на обычные относительные пути или скопировать ассеты в `public/`.

### 3. Supabase backend
Папка `supabase/functions/server` содержит Edge Functions (Deno-стиль с Hono). Деплоить отдельно через Supabase CLI:
```bash
supabase functions deploy server
```
Из Next вызывать через `NEXT_PUBLIC_SUPABASE_URL` или прокси через `app/api/*/route.ts`.

### 4. Удалить устаревшее

После проверки:
- `components/SEO/SEOHead.tsx` (заменён на Metadata API)
- `components/Router.tsx` (был самописный роутер, не используется в Next)
- `components/pages/HomePage.tsx` импорт `SEOHead` можно удалить из верха файла, если он там был
- Старый `App.tsx` и `main.tsx` — больше не нужны

### 5. Иконки и OG-картинка

Положить в `public/`:
- `favicon.ico`
- `apple-touch-icon.png` (180×180)
- `icon-192.png` и `icon-512.png` (для PWA manifest)
- `og-image.jpg` (1200×630) — главная картинка для соцсетей и поисковой выдачи

Без них всё работает, но в OG-карточках будет broken image.

## Что осталось на следующие итерации

1. **next-intl** для URL `/ru/` и `/en/` — см. `I18N_PLAN.md`
2. **Server Actions** для лид-форм вместо клиентского fetch к Supabase
3. **next/image** для всех `<img>` тегов — критично для Core Web Vitals
4. **Шрифты** — если использовали кастомные через `<link>`, переехать на `next/font/local`
5. **Аналитика** — добавить компонент `<Analytics />` в `app/layout.tsx`:
   ```tsx
   import { GoogleAnalytics } from '@next/third-parties/google';
   import Script from 'next/script';
   // ...
   <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
   ```
