# Kommo Support KB — База знаний

Статический сайт-база знаний для Kommo (amoCRM) на Astro с полной поддержкой SEO, поиска и интеграции скриншотов.

## Быстрый старт

```bash
npm install
npm run dev
# Откройте http://localhost:3000
```

## Команды

- `npm run dev` — запустить dev сервер
- `npm run build` — собрать для production + индекс поиска Pagefind
- `npm run preview` — предпросмотр собранного сайта
- `npm run gen:screenshots` — генерировать скриншоты для статей

## Структура проекта

```
src/
├── content/
│   ├── docs/           # Статьи в Markdown
│   ├── config.ts       # Schema для контента
│   └── nav.yaml        # Структура меню
├── layouts/
│   └── DocLayout.astro # Основной layout для статей
├── components/
│   ├── Breadcrumbs.astro
│   ├── PrevNext.astro
│   ├── Related.astro
│   ├── Feedback.astro
│   ├── Toc.astro
│   └── content/        # Компоненты-шорткоды для MD
│       ├── Step.astro
│       ├── Screenshot.astro
│       ├── Callout.astro
│       └── Video.astro
├── pages/
│   ├── index.astro     # Главная страница
│   ├── docs/[...slug].astro  # Динамический роут
│   ├── [slug].md.ts    # Raw Markdown версии
│   ├── llms.txt.ts     # Индекс для LLM
│   ├── sitemap.xml.ts  # Sitemap
│   ├── robots.txt.ts   # Robots.txt
│   └── rss.xml.ts      # RSS (опционально)
├── styles/
│   └── global.css      # Глобальные стили
└── utils/
    └── helpers.ts      # Утилиты

public/img/docs/        # Скриншоты и изображения
scripts/
└── generate-screenshots.mjs  # Генератор скриншотов
```

## Написание статей

### Структура фронтматтера

```yaml
---
title: Название статьи
slug: kebab-case-slug
section: Раздел
subsection: Подраздел
description: Краткое описание для SEO
updated: 2026-07-13
readingTime: 5 мин.
related: [slug-другой-статьи]
prev: slug-предыдущей-статьи
next: slug-следующей-статьи
---
```

### Компоненты в Markdown

#### Step — нумерованный шаг

```markdown
<Step n="1">
Текст шага с описанием действия.
</Step>
```

#### Screenshot — картинка с подписью

```markdown
<Screenshot 
  src="/img/docs/my-article/step-1.png" 
  alt="Описание скриншота"
  caption="Подпись под изображением"
/>
```

#### Callout — блок внимания

```markdown
<Callout type="tip">
Совет или полезная информация
</Callout>

<Callout type="warning">
Важное предупреждение
</Callout>

<Callout type="note">
Обычная заметка
</Callout>
```

#### Video — видео или GIF

```markdown
<Video 
  src="/img/docs/my-article/animation.gif"
  caption="Подпись под видео"
/>
```

## Генерация скриншотов

### Использование скрипта

```bash
# Создать placeholder-ы для статьи
npm run gen:screenshots -- --slug login-kommo

# Интегрировать с amocrm-instruction-builder
npm run gen:screenshots -- --slug login-kommo --json '[{"action":"click"}]'
```

### Структура скриншотов

Скриншоты сохраняются в `/public/img/docs/{slug}/`:
```
public/img/docs/
├── login-kommo/
│   ├── step-1.png
│   ├── step-2.png
│   └── step-3.png
├── funnel-work/
│   ├── step-1.png
│   └── ...
```

## SEO

### Автоматическое

- ✅ Динамический sitemap.xml
- ✅ robots.txt
- ✅ OG теги для социальных сетей
- ✅ Meta descriptions
- ✅ Canonical URLs

### Вручную

Обновите в `astro.config.mjs`:
- `site` — основной URL KB

## Тёмная тема

Темная тема поддерживается автоматически:
- Переключатель в заголовке
- Сохранение выбора в localStorage
- CSS переменные для стилизации

## Поиск (Pagefind)

При сборке для production автоматически генерируется индекс поиска Pagefind.
Поиск работает офлайн на фронтенде.

```bash
npm run build  # Собирает и индексирует
```

## Деплой на Vercel

```bash
vercel --prod
```

Убедитесь, что в environment variables установлены нужные значения (если требуются).

## Интеграция с Claude

### Копировать как Markdown

Кнопка на каждой статье копирует raw Markdown версию.

### Открыть в Claude

Прямая интеграция с Claude API для анализа статей.

## Лучшие практики

1. **Название статьи** — краткое, ясное (3-5 слов)
2. **Slug** — kebab-case, на английском, уникальный
3. **Описание** — 150-160 символов, для SEO
4. **Структура** — Introduction → Steps/Examples → Tips → FAQ
5. **Изображения** — 800x600px, до 100KB, PNG или JPEG
6. **Связанные** — 3-4 статьи максимум
7. **Навигация** — prev/next для логической последовательности

## Лицензия

MIT © 2026 ko:agency
