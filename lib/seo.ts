import type { Metadata } from 'next';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://koagency.me';
export const SITE_NAME = 'ko:agency';
export const DEFAULT_OG_IMAGE = '/og-image.jpg';

type SEOInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  ogImage?: string;
  noindex?: boolean;
};

/** Универсальный генератор Next Metadata с canonical, OG, Twitter */
export function buildMetadata({
  title,
  description,
  path = '/',
  keywords,
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
}: SEOInput): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        'ru-RU': url,
        'en-US': new URL(`/en${path === '/' ? '' : path}`, SITE_URL).toString(),
        'x-default': url,
      },
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-image-preview': 'large' },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'ru_RU',
      url,
      title: fullTitle,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

/** Schema.org JSON-LD генераторы */
export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  sameAs: [],
};

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'ru-RU',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export function serviceJsonLd(name: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    areaServed: 'RU',
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: new URL(it.url, SITE_URL).toString(),
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}
