'use client';

import { motion } from 'framer-motion';

const logos = [
  { src: '/clients/electronics.svg', alt: 'Electronix' },
  { src: '/clients/construction.svg', alt: 'БетонГрад' },
  { src: '/clients/education.svg', alt: 'EduFlow' },
  { src: '/clients/b2b-services.svg', alt: 'IT.Sigma' },
  { src: '/clients/retail.svg', alt: 'TradeMark' },
  { src: '/clients/logistics.svg', alt: 'Cargo+' },
  { src: '/clients/realestate.svg', alt: 'ЖК Премьер' },
  { src: '/clients/beauty.svg', alt: 'Studio Nova' },
];

export function LogoWall() {
  return (
    <section className="border-y border-black/5 bg-white py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-[#999999]">
            Нам доверяют · 200+ клиентов
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8">
          {logos.map((logo, i) => (
            <motion.div
              key={logo.alt}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-8 max-w-full opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-9"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-[#999999]">
          Логотипы клиентов показаны с их разрешения. Полный список кейсов — в разделе{' '}
          <a
            href="/cases"
            className="text-[#E60000] hover:underline underline-offset-4"
          >
            Кейсы
          </a>
        </p>
      </div>
    </section>
  );
}
