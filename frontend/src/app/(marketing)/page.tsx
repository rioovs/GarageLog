import { Hero } from '@/components/marketing/hero';
import { Features } from '@/components/marketing/features';
import { Stats } from '@/components/marketing/stats';
import { Testimonials } from '@/components/marketing/testimonials';
import { CTA } from '@/components/marketing/cta';

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <Stats />
      <Testimonials />
      <CTA />
    </>
  );
}
