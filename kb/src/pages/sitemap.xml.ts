import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const docs = await getCollection('docs');
  const baseUrl = 'https://kb.kommo.example.com';

  const urls = [
    { loc: '/', lastmod: new Date().toISOString().split('T')[0], priority: '1.0' },
    ...docs.map((doc) => ({
      loc: `/docs/${doc.slug}`,
      lastmod: doc.data.updated || new Date().toISOString().split('T')[0],
      priority: '0.8',
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <priority>${url.priority}</priority>
  </url>
  `
    )
    .join('')}
</urlset>
`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
