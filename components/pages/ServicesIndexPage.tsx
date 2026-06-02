'use client';

import { servicesData } from '../../data/services';
import { Container } from '../ui/container';
import { Link } from '@/lib/router-shim';
import { ArrowRight } from 'lucide-react';

export function ServicesIndexPage() {
  return (
    <div className="py-20 pt-10">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#101010] mb-6">
            Наши услуги
          </h1>
          <p className="text-xl text-[#666666]">
            Комплексные решения для автоматизации ваших продаж
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(servicesData).map(([slug, service]) => (
            <Link
              key={slug}
              to={`/services/${slug}`}
              className="group block p-8 bg-white border border-black/10 rounded-2xl hover:shadow-xl hover:border-[#E60000]/30 transition-all duration-300"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E60000]/10 rounded-full mb-6">
                <span className="text-sm font-mono text-[#E60000] uppercase tracking-wider">
                  {service.subtitle}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-[#101010] group-hover:text-[#E60000] transition-colors">
                {service.title}
              </h3>
              
              <p className="text-[#666666] mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-black/5">
                <div className="text-[#E60000] font-mono font-semibold text-lg">
                  От {service.pricing.from}
                </div>
                <span className="flex items-center text-[#101010] font-medium group-hover:translate-x-1 transition-transform">
                  Подробнее <ArrowRight className="w-4 h-4 ml-2" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
