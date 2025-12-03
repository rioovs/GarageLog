'use client';

import Link from 'next/link';
import { Button } from '@/components/ui';
import { useLanguage } from '@/lib/i18n-context';

export function CTA() {
  const { t } = useLanguage();

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 dark:bg-blue-700 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t('cta.title')}
          </h2>
          <p className="max-w-[600px] text-blue-100 md:text-xl/relaxed">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="w-full min-[400px]:w-auto font-semibold">
                {t('cta.button')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
