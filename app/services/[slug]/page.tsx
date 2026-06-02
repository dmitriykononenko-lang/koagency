import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd, SITE_URL } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { ServicePage } from '@/components/pages/ServicePage';
import { servicesData } from '@/data/services';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return Object.keys(servicesData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const service = (servicesData as any)[params.slug];
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${params.slug}`,
    keywords: service.keywords?.split(',').map((s: string) => s.trim()),
  });
}

export default function Page({ params }: { params: Params }) {
  const service = (servicesData as any)[params.slug];
  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd(
            service.title,
            service.description,
            `${SITE_URL}/services/${params.slug}`
          ),
          breadcrumbJsonLd([
            { name: 'Главная', url: '/' },
            { name: 'Услуги', url: '/services' },
            { name: service.title, url: `/services/${params.slug}` },
          ]),
        ]}
      />
      <ServicePage service={service} />
    </>
  );
}
