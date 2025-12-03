'use client';

import * as React from 'react';
import { Button } from '@/components/ui';
import { useLanguage } from '@/lib/i18n-context';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
      className="w-12 font-bold"
    >
      {language.toUpperCase()}
    </Button>
  );
}
