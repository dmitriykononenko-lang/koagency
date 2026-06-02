# План перехода на next-intl с URL-сегментами /ru и /en

## Текущее состояние (V1 — то, что сделано сейчас)

- `LanguageContext` работает клиентски через `localStorage`
- Один URL отдаёт обе версии (RU/EN), переключение на клиенте
- `hreflang` в `<head>` уже расставлен (см. `lib/seo.ts`) — ссылается на гипотетический `/en/...` URL
- Это рабочий вариант для запуска. **SEO-минус:** Google индексирует только RU-версию (то что в HTML на серверный рендер)

## V2 — полноценный двуязычный SEO (рекомендую сделать через 2–4 недели после запуска)

### Шаг 1. Установка
```bash
npm install next-intl
```

### Шаг 2. Реструктура `app/`
Перенести все маршруты под `[locale]`:
```
app/
  [locale]/
    layout.tsx
    page.tsx
    calculator/page.tsx
    calculator-amocrm/page.tsx
    ...
  layout.tsx (минимальный, прокидывает в [locale])
```

### Шаг 3. Middleware
`middleware.ts` в корне:
```ts
import createMiddleware from 'next-intl/middleware';
export default createMiddleware({
  locales: ['ru', 'en'],
  defaultLocale: 'ru',
  localePrefix: 'as-needed', // RU без префикса, EN с /en/
});
export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] };
```

### Шаг 4. Переиспользовать существующие переводы
Уже есть `lib/i18n/translations.ts` — разделить на `messages/ru.json` и `messages/en.json`. Хуки `useTranslations()` вместо самописного `useLanguage().t`.

### Шаг 5. Hreflang генерируется автоматически
`next-intl` сам ставит правильные `<link rel="alternate" hreflang>` теги.

### Шаг 6. Sitemap
Обновить `app/sitemap.ts` — для каждой страницы добавить и `/ru/...` и `/en/...` варианты с `alternates`.

## Когда делать V2

- Если англоязычный трафик действительно нужен → делать сразу после стабилизации запуска
- Если только RU → V1 достаточно, удалить `en-US` из hreflang в `lib/seo.ts`

## Решение для текущего запуска

Если англоязычные клиенты НЕ нужны:
1. Удалить `'en-US'` из `lib/seo.ts` (alternates.languages)
2. Из `components/LanguageSwitcher.tsx` убрать переключатель или скрыть
3. Перевести содержимое только на RU
