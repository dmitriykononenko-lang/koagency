import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export async function getStaticPaths() {
  const docs = await getCollection('docs');
  return docs.map((doc) => ({
    params: { slug: `${doc.slug}.md` },
    props: { doc },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { doc } = props;
  const { body } = doc;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': `inline; filename="${doc.slug}.md"`,
    },
  });
};
