'use client';

import { Hero } from '../Hero';
import { Services } from '../Services';
import { Process } from '../Process';
import { Benefits } from '../Benefits';
import { Training } from '../Training';
import { Partners } from '../Partners';
import { EnterpriseBanner } from '../EnterpriseBanner';
import { Pricing } from '../Pricing';
import { Cases } from '../Cases';
import { Testimonials } from '../Testimonials';
import { FAQ } from '../FAQ';
import { Contact } from '../Contact';

export function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Benefits />
      <Training />
      <Partners />
      <EnterpriseBanner />
      <Pricing />
      <Cases />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}