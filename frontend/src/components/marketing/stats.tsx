'use client';

import { useLanguage } from '@/lib/i18n-context';

export function Stats() {
  const { t } = useLanguage();

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background border-y border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400">100+</h3>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">{t('stats.vehicles')}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400">$50k+</h3>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">{t('stats.costs')}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400">500+</h3>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">{t('stats.records')}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400">0</h3>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">{t('stats.missed')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
