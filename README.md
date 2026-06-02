# ko:agency — Next.js 14 версия

Миграция Figma Make / Vite → Next.js 14 (App Router) для полноценного SEO и production-деплоя.

## Что внутри

- **Next.js 14** App Router, React 18, TypeScript
- **Tailwind 4** через PostCSS
- **Все компоненты** Figma Make перенесены: Radix UI, Framer Motion, calculator pages
- **Metadata API** на каждой странице (title/description/OG/Twitter)
- **JSON-LD** Schema.org (Organization, WebSite, Service, Breadcrumb)
- **Динамические `sitemap.xml` и `robots.txt`**
- **`react-router-dom` шим** в `lib/router-shim.tsx` — компоненты остались без переписывания

## Быстрый старт

```bash
npm install
cp .env.example .env.local
# заполнить NEXT_PUBLIC_SUPABASE_URL и др. в .env.local
npm run dev
# открыть http://localhost:3000
```

Production:
```bash
npm run build
npm start
```

## Деплой на Vercel

```bash
npm install -g vercel
vercel link
vercel --prod
```

Или через GitHub: пуш в `main` → автодеплой.

### Переменные окружения в Vercel
Скопировать ключи из `.env.example`:
- `NEXT_PUBLIC_SITE_URL` (обязательно, влияет на canonical и hreflang)
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_YANDEX_METRIKA_ID`

### Домен
1. В Vercel → Settings → Domains → добавить `koagency.me`
2. Прописать у регистратора A-запись на `76.76.21.21` и CNAME `www → cname.vercel-dns.com`
3. SSL подтянется автоматически

## Структура

```
app/                       # Next.js маршруты
  layout.tsx               # корневой layout, JSON-LD, providers
  page.tsx                 # / (HomePage)
  calculator/              # /calculator
  calculator-amocrm/       # /calculator-amocrm
  excel-amocrm/            # /excel-amocrm
  enterprise/              # /enterprise
  about/                   # /about
  services/                # /services и /services/[slug]
  privacy/                 # /privacy
  sitemap.ts               # динамический sitemap
  robots.ts                # динамический robots.txt
  manifest.ts              # PWA manifest

components/                # все UI-компоненты + страницы
  pages/                   # client-компоненты страниц
  ui/                      # shadcn/Radix
  SEO/                     # SEOHead, Breadcrumbs (legacy, не нужны)
  Providers.tsx            # объединение Theme + Language + Layout
  JsonLd.tsx               # Server Component для Schema.org

lib/
  i18n/                    # переводы + LanguageContext (CSR)
  router-shim.tsx          # совместимость react-router-dom API
  seo.ts                   # buildMetadata, JSON-LD генераторы

data/                      # services.ts (контент услуг)
docs/                      # планы миграции i18n, deployment notes
public/                    # статика, og-image, favicon, манифест
styles/                    # Tailwind globals + theme
supabase/                  # Edge Functions (если используете)
```

## SEO-чеклист после деплоя

- [ ] Поменять `NEXT_PUBLIC_SITE_URL` на реальный домен
- [ ] Заменить `public/og-image.jpg` на брендированную картинку 1200×630
- [ ] Заменить `public/favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`
- [ ] Подключить Google Search Console + verify файл
- [ ] Подключить Яндекс.Вебмастер + verify файл
- [ ] Подключить Google Analytics 4 и Яндекс.Метрику (см. `app/layout.tsx`)
- [ ] Проверить `/sitemap.xml` отдаёт все URL
- [ ] Проверить `/robots.txt`
- [ ] Lighthouse: цель 90+ по всем 4 метрикам
- [ ] Mobile Friendly Test
- [ ] Добавить структурированные данные: Service для каждой услуги (уже сделано)

## Что ещё нужно сделать

См. `docs/I18N_PLAN.md` — план перехода на `next-intl` с URL-сегментами `/ru/` и `/en/` для полноценного двуязычного SEO (фаза 2).

## Параллельный Vite-проект

В соседней папке `koagency-vite/` — оригинальный Vite-проект с хотфиксом:
- Убран `noindex,nofollow` из `index.html`
- Добавлены `public/robots.txt` и `public/sitemap.xml`
- Можно задеплоить как временную версию пока готовится Next.js
