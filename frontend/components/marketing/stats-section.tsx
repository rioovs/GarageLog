"use client"

import { useLanguage } from "@/lib/i18n-context"

export function StatsSection() {
  const { t } = useLanguage()

  return (
    <section className="px-6 py-20 md:py-32 bg-gradient-to-b from-muted/50 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Gradient Background */}
          <div className="hidden md:block relative h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted/50 to-background rounded-2xl"></div>
          </div>

          {/* Right - Stats */}
          <div className="flex flex-col gap-12">
            <div>
              <div className="text-6xl md:text-7xl font-bold text-foreground leading-tight">2,584,201</div>
              <p className="text-xl text-muted-foreground mt-3">{t('stats.totalRecords')}</p>
              <p className="text-muted-foreground mt-4">
                {t('stats.totalRecordsDesc')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-foreground">847K+</div>
                <p className="text-sm text-muted-foreground">{t('stats.activeVehicles')}</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-foreground">99.2%</div>
                <p className="text-sm text-muted-foreground">{t('stats.uptime')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
