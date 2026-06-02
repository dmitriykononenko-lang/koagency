'use client';

import { useState, useEffect } from 'react';
import { ServicePage } from '../pages/ServicePage';
import { servicesData } from '../data/services';
import { Header } from './Header';
import { Hero } from './Hero';
import { Services } from './Services';
import { Process } from './Process';
import { Benefits } from './Benefits';
import { Partners } from './Partners';
import { Pricing } from './Pricing';
import { Cases } from './Cases';
import { Testimonials } from './Testimonials';
import { FAQ } from './FAQ';
import { Contact } from './Contact';
import { Footer } from './Footer';

export function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Service pages
  if (currentPath.startsWith('/services/')) {
    const slug = currentPath.replace('/services/', '');
    const service = servicesData[slug as keyof typeof servicesData];
    
    if (service) {
      return (
        <>
          <Header />
          <ServicePage service={service} />
          <Contact />
          <Footer />
        </>
      );
    }
  }

  // Services listing page
  if (currentPath === '/services') {
    return (
      <>
        <Header />
        <div className="pt-20">
          <Services />
          <div className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-center mb-12 text-[#101010]">Все услуги</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {Object.entries(servicesData).map(([slug, service]) => (
                  <div
                    key={slug}
                    onClick={() => {
                      window.history.pushState({}, '', `/services/${slug}`);
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }}
                    className="p-8 bg-white border border-black/10 rounded-2xl hover:shadow-lg hover:border-[#E60000]/30 transition-all cursor-pointer group"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E60000]/10 rounded-full mb-4">
                      <span className="text-sm font-mono text-[#E60000]">{service.subtitle}</span>
                    </div>
                    <h3 className="mb-3 text-[#101010] font-semibold group-hover:text-[#E60000] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-[#666666] text-sm mb-4">{service.description}</p>
                    <div className="text-[#E60000] font-mono font-semibold">
                      От {service.pricing.from}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Contact />
          <Footer />
        </div>
      </>
    );
  }

  // Homepage
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Process />
      <Benefits />
      <Partners />
      <Pricing />
      <Cases />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}
