"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n-context"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="px-6 py-20 md:py-32">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {t('hero.tagline')}
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
              {t('hero.subtitle')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/register">
                {t('hero.cta')}
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/app">{t('hero.secondaryCta')}</Link>
            </Button>
          </div>
        </div>

        {/* Right Column - Dashboard Mockup */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl blur-3xl opacity-40"></div>
          <div className="relative bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
            <div className="bg-muted/50 p-6 border-b border-border">
              <div className="flex gap-3">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded w-1/3"></div>
                <div className="h-6 bg-muted-foreground/20 rounded w-2/3"></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                  <div className="h-3 bg-blue-500/30 rounded w-1/2 mb-2"></div>
                  <div className="h-5 bg-blue-500/50 rounded w-2/3"></div>
                </div>
                <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                  <div className="h-3 bg-green-500/30 rounded w-1/2 mb-2"></div>
                  <div className="h-5 bg-green-500/50 rounded w-2/3"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
