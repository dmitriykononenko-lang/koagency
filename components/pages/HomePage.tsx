'use client';

import { Hero } from '../Hero';
import { LogoWall } from '../LogoWall';
import { Services } from '../Services';
import { HowWeBuild } from '../HowWeBuild';
import { Process } from '../Process';
import { Benefits } from '../Benefits';
import { Training } from '../Training';
import { Partners } from '../Partners';
import { WazzupPartner } from '../WazzupPartner';
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
      <LogoWall />
      <HowWeBuild />
      <Services />
      <Process />
      <Benefits />
      <Training />
      <Partners />
      <WazzupPartner />
      {/* <EnterpriseBanner /> hidden temporarily */}
      <Pricing />
      <Cases />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}