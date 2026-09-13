import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const docs = await getCollection('docs');

  const content = `# Kommo Support — Индекс статей

Последнее обновление: ${new Date().toISOString().split('T')[0]}

## Все статьи

${docs
  .map(
    (doc) => `
### ${doc.data.title}
- URL: https://kb.kommo.example.com/docs/${doc.slug}
- Раздел: ${doc.data.section}
- Подраздел: ${doc.data.subsection}
- Описание: ${doc.data.description}
- Опубликована: ${doc.data.updated || 'не указана'}
`
  )
  .join('\n')}

## Структура

${docs
  .map(
    (doc) => `
- [${doc.data.title}](/docs/${doc.slug})
  - Раздел: ${doc.data.section}
  - Подраздел: ${doc.data.subsection}
`
  )
  .join('\n')}

## Сырые версии

Каждую статью можно получить в формате Markdown по адресу:
- /docs/[slug].md

Например:
- /login-kommo.md
- /funnel-work.md
- /deal-fields-setup.md
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
