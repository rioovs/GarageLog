"use client"

import { CheckCircle2, Zap, Shield } from "lucide-react"
import { useLanguage } from "@/lib/i18n-context"

export function FeatureHighlight() {
  const { t } = useLanguage()

  const features = [
    {
      icon: CheckCircle2,
      title: t('featureHighlight.reminders.title'),
      description: t('featureHighlight.reminders.desc'),
    },
    {
      icon: Zap,
      title: t('featureHighlight.history.title'),
      description: t('featureHighlight.history.desc'),
    },
    {
      icon: Shield,
      title: t('featureHighlight.ownership.title'),
      description: t('featureHighlight.ownership.desc'),
    },
  ]

  return (
    <section id="features" className="px-6 py-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left - Gradient Blob */}
        <div className="hidden md:flex items-center justify-center">
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute inset-8 bg-gradient-to-br from-purple-300 via-pink-300 to-blue-300 rounded-full blur-2xl opacity-20"></div>
          </div>
        </div>

        {/* Right - Features */}
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-3">{t('featureHighlight.title')}</h2>
            <p className="text-lg text-muted-foreground">{t('featureHighlight.subtitle')}</p>
          </div>

          <div className="space-y-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
