import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /.astro/

Sitemap: https://kb.kommo.example.com/sitemap.xml

# OpenAI
User-agent: GPTBot
Allow: /

# Claude
User-agent: Claude-Web
Allow: /

# Google
User-agent: Googlebot
Allow: /
Crawl-delay: 0

# Other search engines
User-agent: *
Allow: /
Crawl-delay: 1
`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
