'use client';

import Link from 'next/link';
import { Car } from 'lucide-react';
import { useLanguage } from '@/lib/i18n-context';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full py-12 bg-slate-900 dark:bg-slate-950 text-slate-400">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
              <Car className="h-6 w-6 text-blue-500" />
              <span>GarageLog</span>
            </Link>
            <p className="text-sm">
              {t('footer.desc')}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">{t('footer.product')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white">Features</Link></li>
              <li><Link href="#" className="hover:text-white">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white">Roadmap</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white">About</Link></li>
              <li><Link href="#" className="hover:text-white">Blog</Link></li>
              <li><Link href="#" className="hover:text-white">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">{t('footer.support')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm">
          <p>© {new Date().getFullYear()} GarageLog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
