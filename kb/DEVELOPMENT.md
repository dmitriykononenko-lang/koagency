# Разработка Kommo Support KB

Это руководство для разработчиков и авторов контента.

## Настройка окружения

```bash
cd kb
npm install --legacy-peer-deps
npm run dev
```

Откройте http://localhost:3000

## Добавление новой статьи

### 1. Создайте файл в `src/content/docs/`

```bash
touch src/content/docs/новая-статья.md
```

### 2. Заполните фронтматтер

```yaml
---
title: Название статьи
section: Раздел
subsection: Подраздел
description: Описание для SEO (150-160 символов)
updated: "2026-07-13"
readingTime: 5 мин.
related: [slug-другой-статьи]
prev: slug-предыдущей-статьи
next: slug-следующей-статьи
---
```

### 3. Напишите контент на Markdown

Используйте компоненты для интерактивности:

```markdown
<Step n="1">
Текст первого шага
</Step>

<Screenshot src="/img/docs/новая-статья/step-1.png" alt="Описание" caption="Подпись" />

<Callout type="tip">
Полезная информация
</Callout>
```

### 4. Обновите навигацию в `nav.yaml`

```yaml
sections:
  - title: Ваш раздел
    subsections:
      - title: Ваш подраздел
        articles:
          - slug: новая-статья
            title: Название статьи
```

### 5. Генерируйте скриншоты

```bash
npm run gen:screenshots -- --slug новая-статья
```

Это создаст placeholder-ы в `/public/img/docs/новая-статья/`

## Integrация скриншотов с amocrm-instruction-builder

Когда будет готов реальный кабинет:

```bash
npm run gen:screenshots -- --slug новая-статья --json '[
  {"action":"click","selector":".login-btn"},
  {"action":"type","selector":"input[name=email]","text":"user@example.com"}
]'
```

Скрипт заменит placeholder-ы на реальные скриншоты.

## Деплой на Vercel

```bash
npm run build
vercel --prod
```

## Структура файлов

```
kb/
├── src/
│   ├── content/docs/        # Статьи в Markdown
│   ├── layouts/             # Layout для статей
│   ├── components/          # Компоненты UI
│   ├── pages/               # Маршруты (index, docs, SEO)
│   ├── styles/              # Глобальные стили
│   └── utils/               # Утилиты
├── public/img/docs/         # Скриншоты для статей
├── scripts/                 # CLI скрипты
├── dist/                    # Собранный сайт
└── README.md                # Документация для пользователей
```

## Команды разработки

| Команда | Описание |
|---------|---------|
| `npm run dev` | Запустить dev сервер (hot reload) |
| `npm run build` | Собрать для production + Pagefind |
| `npm run preview` | Предпросмотр собранного сайта |
| `npm run gen:screenshots` | Генерировать скриншоты |

## Тёмная тема

Автоматически переключается через кнопку в заголовке.
Сохраняется в localStorage.

Для кастомизации редактируйте CSS переменные в `src/styles/global.css`:

```css
:root {
  --text-primary: rgb(17, 24, 39);
  --bg-code: rgb(243, 244, 246);
}

:root.dark {
  --text-primary: rgb(243, 244, 246);
  --bg-code: rgb(31, 41, 55);
}
```

## SEO

- ✅ Динамический sitemap.xml
- ✅ robots.txt с правилами для поисковиков
- ✅ OG теги для соцсетей
- ✅ Meta descriptions из frontmatter
- ✅ Canonical URLs

Проверьте SEO перед деплоем:
1. `/sitemap.xml` — все статьи в списке
2. Lighthouse (Chrome DevTools)
3. Google Search Console

## Типичные ошибки

### Изображение не загружается

Убедитесь, что путь правильный: `/img/docs/{slug}/step-1.png`

### Статья не появляется на главной

Проверьте, что:
1. Файл находится в `src/content/docs/`
2. Фронтматтер валидный (скопируйте из примера)
3. Slug в файле совпадает с именем файла

### Ссылка на другую статью не работает

Используйте slug: `[Текст](/docs/slug-статьи)`

## Performance

- Pagefind индексирует сайт автоматически при `npm run build`
- Всё кэшируется (статичный сайт)
- Размер: ~150KB gzipped основной бандл

## Лицензия

MIT © 2026 ko:agency
