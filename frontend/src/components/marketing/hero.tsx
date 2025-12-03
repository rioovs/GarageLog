'use client';

import Link from 'next/link';
import { Button } from '@/components/ui';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n-context';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm text-blue-700 dark:text-blue-300 font-medium">
                {t('hero.badge')}
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground">
                {t('hero.title')}
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                {t('hero.description')}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/register">
                <Button size="lg" className="w-full min-[400px]:w-auto gap-2">
                  {t('hero.getStarted')}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                  {t('hero.viewDashboard')}
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>{t('hero.free')}</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>{t('hero.secure')}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-video rounded-xl bg-slate-100 dark:bg-slate-800 shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
              {/* Mockup UI */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
                <div className="h-full w-full bg-background rounded-lg shadow-sm border border-border p-4">
                  <div className="flex items-center justify-between mb-6 border-b pb-4">
                    <div className="h-4 w-32 bg-muted rounded"></div>
                    <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="h-24 w-1/3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-100 dark:border-blue-800"></div>
                      <div className="h-24 w-1/3 bg-green-50 dark:bg-green-900/20 rounded border border-green-100 dark:border-green-800"></div>
                      <div className="h-24 w-1/3 bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-100 dark:border-purple-800"></div>
                    </div>
                    <div className="h-32 w-full bg-muted rounded border border-border"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
