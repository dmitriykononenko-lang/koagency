'use client';

import { SEOHead } from '../SEO/SEOHead';
import { Breadcrumbs } from '../SEO/Breadcrumbs';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Check, ArrowRight, Star } from 'lucide-react';

interface ServicePageProps {
  service: {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    keywords: string;
    hero: {
      title: string;
      description: string;
      features: string[];
    };
    benefits: Array<{
      title: string;
      description: string;
    }>;
    process: Array<{
      step: string;
      title: string;
      description: string;
    }>;
    pricing: {
      from: string;
      description: string;
    };
    faq: Array<{
      question: string;
      answer: string;
    }>;
    caseStudies: Array<{
      company: string;
      industry: string;
      result: string;
    }>;
  };
}

export function ServicePage({ service }: ServicePageProps) {
  const scrollToContact = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
    setTimeout(() => {
      const element = document.getElementById('contact');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "ko:agency",
      "url": "https://koagency.me"
    },
    "areaServed": "RU",
    "offers": {
      "@type": "Offer",
      "price": service.pricing.from,
      "priceCurrency": "RUB"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title={`${service.title} | ko:agency`}
        description={service.description}
        keywords={service.keywords}
        canonical={`/services/${service.slug}`}
        structuredData={structuredData}
      />

      <div className="pt-20">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Услуги', href: '/services' },
              { label: service.title, href: `/services/${service.slug}` }
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#f5f5f5]">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E60000]/10 rounded-full mb-6">
                  <div className="w-2 h-2 bg-[#E60000] rounded-full animate-pulse" />
                  <span className="text-sm font-mono text-[#E60000]">{service.subtitle}</span>
                </div>

                <h1 className="mb-6 text-[#101010]">
                  {service.hero.title}
                </h1>
                
                <p className="text-lg text-[#666666] mb-8 leading-relaxed">
                  {service.hero.description}
                </p>

                <div className="space-y-3 mb-8">
                  {service.hero.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#E60000] flex-shrink-0" />
                      <span className="text-[#101010]">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    onClick={scrollToContact}
                    className="bg-[#E60000] hover:bg-[#cc0000] text-white"
                  >
                    Заказать консультацию
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={scrollToContact}
                  >
                    Получить расчёт
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="p-8 bg-white border-black/10 shadow-lg">
                  <div className="space-y-6">
                    <div>
                      <div className="text-sm text-[#666666] mb-2">Стоимость от</div>
                      <div className="text-3xl font-mono text-[#E60000] font-semibold mb-2">
                        {service.pricing.from}
                      </div>
                      <div className="text-sm text-[#666666]">{service.pricing.description}</div>
                    </div>

                    <div className="border-t border-black/10 pt-6">
                      <div className="text-sm text-[#666666] mb-4">Включено:</div>
                      <div className="space-y-3">
                        {service.hero.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-[#E60000] flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-[#101010]">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button 
                      onClick={scrollToContact}
                      className="w-full bg-[#E60000] hover:bg-[#cc0000]"
                    >
                      Начать проект
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-center mb-12 text-[#101010]">
              Преимущества решения
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.benefits.map((benefit, idx) => (
                <Card key={idx} className="p-6 bg-white border-black/10 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-[#E60000]/10 rounded-xl flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-[#E60000] rounded-lg" />
                  </div>
                  <h3 className="mb-3 text-[#101010] font-semibold">
                    {benefit.title}
                  </h3>
                  <p className="text-[#666666] text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f5f5f5]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-center mb-12 text-[#101010]">
              Как мы работаем
            </h2>

            <div className="space-y-6">
              {service.process.map((step, idx) => (
                <Card key={idx} className="p-6 bg-white border-black/10">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-[#E60000] rounded-xl flex items-center justify-center">
                        <span className="text-white font-mono font-semibold">{step.step}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 text-[#101010] font-semibold">
                        {step.title}
                      </h3>
                      <p className="text-[#666666] text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-center mb-12 text-[#101010]">
              Кейсы клиентов
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {service.caseStudies.map((caseStudy, idx) => (
                <Card key={idx} className="p-6 bg-white border-black/10 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 fill-[#E60000] text-[#E60000]" />
                    <span className="text-sm font-mono text-[#999999]">{caseStudy.industry}</span>
                  </div>
                  <h3 className="mb-3 text-[#101010] font-semibold">
                    {caseStudy.company}
                  </h3>
                  <p className="text-[#666666] text-sm">
                    {caseStudy.result}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f5f5f5]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12 text-[#101010]">
              Частые вопросы
            </h2>

            <div className="space-y-4">
              {service.faq.map((item, idx) => (
                <Card key={idx} className="p-6 bg-white border-black/10">
                  <h3 className="mb-3 text-[#101010] font-semibold">
                    {item.question}
                  </h3>
                  <p className="text-[#666666] leading-relaxed">
                    {item.answer}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-6 text-[#101010]">
              Готовы начать?
            </h2>
            <p className="text-lg text-[#666666] mb-8">
              Оставьте заявку и получите бесплатную консультацию и расчёт стоимости
            </p>
            <Button 
              size="lg"
              onClick={scrollToContact}
              className="bg-[#E60000] hover:bg-[#cc0000] text-white"
            >
              Получить консультацию
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
