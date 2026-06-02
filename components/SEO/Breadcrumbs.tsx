import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `${window.location.origin}${item.href}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex items-center space-x-2 text-sm">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-[#666666] mx-2" />
              )}
              {index === items.length - 1 ? (
                <span className="text-[#101010] font-medium">{item.label}</span>
              ) : (
                <a
                  href={item.href}
                  className="text-[#666666] hover:text-[#E60000] transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.history.pushState({}, '', item.href);
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
