import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { servicesData } from '@/data/services';
import { casesData } from '@/data/cases';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/calculator-amocrm`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/excel-amocrm`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/enterprise`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/support`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/cases`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/widgets/task-templates`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/legal/offer`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE_URL}/legal/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
  ];

  const servicePages: MetadataRoute.Sitemap = Object.keys(servicesData).map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const casePages: MetadataRoute.Sitemap = Object.keys(casesData).map((slug) => ({
    url: `${SITE_URL}/cases/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  return [...staticPages, ...servicePages, ...casePages];
}
