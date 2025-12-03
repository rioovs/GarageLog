'use client';

import Link from 'next/link';
import { Button } from '@/components/ui';
import { Car } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { LanguageToggle } from '@/components/language-toggle';
import { useLanguage } from '@/lib/i18n-context';

export function Navbar() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Car className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span>GarageLog</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.features')}
          </Link>
          <Link href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.testimonials')}
          </Link>
          <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.pricing')}
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <ModeToggle />
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            {t('nav.login')}
          </Link>
          <Link href="/register">
            <Button>{t('nav.signup')}</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
