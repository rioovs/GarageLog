"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n-context"

export function BottomCta() {
  const { t } = useLanguage()

  return (
    <section className="px-6 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{t('cta.title')}</h2>
        <p className="text-xl text-muted-foreground mb-8">
          {t('cta.subtitle')}
        </p>
        <Button asChild size="lg">
          <Link href="/register">{t('cta.button')}</Link>
        </Button>
      </div>
    </section>
  )
}
