"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/lib/i18n-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ModeToggle } from "@/components/mode-toggle"

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">VM</span>
          </div>
          <span className="font-semibold text-foreground">VehicleHub</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/features" className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
            {t('nav.features')}
          </Link>
          <Link href="/pricing" className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
            {t('nav.pricing')}
          </Link>
          <Link href="/#testimonials" className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
            {t('nav.testimonials')}
          </Link>
          <Link href="/contact" className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
            {t('nav.contact')}
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />
          <LanguageSwitcher />
          <Button variant="ghost" asChild>
            <Link href="/login">{t('nav.login')}</Link>
          </Button>
          <Button asChild>
            <Link href="/register">{t('auth.signUp')}</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ModeToggle />
          <LanguageSwitcher />
          <button className="p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-4 flex flex-col gap-4">
            <Link href="/features" className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
              {t('nav.features')}
            </Link>
            <Link href="/pricing" className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
              {t('nav.pricing')}
            </Link>
            <Link href="/#testimonials" className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
              {t('nav.testimonials')}
            </Link>
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/login">{t('nav.login')}</Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/register">{t('auth.signUp')}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
