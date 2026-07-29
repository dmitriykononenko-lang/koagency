import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata, breadcrumbJsonLd, SITE_URL, SITE_NAME } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { CasePage } from '@/components/pages/CasePage';
import { casesData } from '@/data/cases';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return Object.keys(casesData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const c = casesData[params.slug];
  if (!c) return {};
  return buildMetadata({
    title: `${c.company} — кейс`,
    description: c.hero.subtitle,
    path: `/cases/${params.slug}`,
    keywords: c.tags.map((t) => t.toLowerCase()),
  });
}

function caseStudyJsonLd(c: (typeof casesData)[string]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${c.company} — ${c.hero.tagline}`,
    description: c.hero.subtitle,
    articleSection: 'Case Study',
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/cases/${c.slug}`,
    },
    about: {
      '@type': 'Thing',
      name: c.industry,
    },
  };
}

export default function Page({ params }: { params: Params }) {
  const c = casesData[params.slug];
  if (!c) notFound();

  return (
    <>
      <JsonLd
        data={[
          caseStudyJsonLd(c),
          breadcrumbJsonLd([
            { name: 'Главная', url: '/' },
            { name: 'Кейсы', url: '/cases' },
            { name: c.company, url: `/cases/${params.slug}` },
          ]),
        ]}
      />
      <CasePage caseStudy={c} />
    </>
  );
}
