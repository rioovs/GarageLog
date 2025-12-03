
import { HeroSection } from "@/components/marketing/hero-section"
import { FeatureHighlight } from "@/components/marketing/feature-highlight"
import { LogoStrip } from "@/components/marketing/logo-strip"
import { StatsSection } from "@/components/marketing/stats-section"
import { TestimonialsSection } from "@/components/marketing/testimonials-section"
import { BottomCta } from "@/components/marketing/bottom-cta"


export const metadata = {
  title: "Vehicle Management App - Never Miss a Tax Again",
  description:
    "Organize all your vehicles in one place. Track maintenance, manage taxes, and never miss an important deadline.",
}

export default function HomePage() {
  return (
    <div className="bg-background">
      <HeroSection />
      <FeatureHighlight />
      <LogoStrip />
      <StatsSection />
      <TestimonialsSection />
      <BottomCta />
    </div>
  )
}
