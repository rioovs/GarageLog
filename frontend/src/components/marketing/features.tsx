'use client';

import { Bell, Calendar, ShieldCheck, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useLanguage } from '@/lib/i18n-context';

export function Features() {
  const { t } = useLanguage();

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm text-blue-700 dark:text-blue-300 font-medium">
              {t('features.badge')}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
              {t('features.title')}
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t('features.description')}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-card border-border shadow-sm">
              <CardHeader className="pb-2">
                <Bell className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
                <CardTitle className="text-lg">{t('features.tax.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('features.tax.desc')}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border shadow-sm">
              <CardHeader className="pb-2">
                <Calendar className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                <CardTitle className="text-lg">{t('features.service.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('features.service.desc')}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border shadow-sm">
              <CardHeader className="pb-2">
                <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" />
                <CardTitle className="text-lg">{t('features.cost.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('features.cost.desc')}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border shadow-sm">
              <CardHeader className="pb-2">
                <ShieldCheck className="h-8 w-8 text-orange-600 dark:text-orange-400 mb-2" />
                <CardTitle className="text-lg">{t('features.ownership.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('features.ownership.desc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
