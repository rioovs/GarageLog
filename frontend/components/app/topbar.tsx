"use client"

import { Button } from "@/components/ui/button"
import { LogOut, Menu } from "lucide-react"
import { useLanguage } from "@/lib/i18n-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ModeToggle } from "@/components/mode-toggle"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AppSidebar } from "@/components/app/sidebar"

import { useState, useEffect } from "react"

import { useUser } from "@/hooks/use-user"

export function TopBar() {
  const { t } = useLanguage()
  const { user } = useUser()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        {!mounted ? (
          <button className="p-2 hover:bg-muted rounded-lg lg:hidden">
            <Menu size={20} />
          </button>
        ) : (
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 hover:bg-muted rounded-lg lg:hidden">
                <Menu size={20} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <AppSidebar className="w-full border-none" />
            </SheetContent>
          </Sheet>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <ModeToggle />
        <LanguageSwitcher />
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">{user?.name || "User"}</p>
            <p className="text-xs text-muted-foreground">{user?.email || "Loading..."}</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          onClick={async () => {
            await import("@/lib/api-client").then(m => m.supabase.auth.signOut())
            window.location.href = "/login"
          }}
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">{t('dashboard.logout')}</span>
        </Button>
      </div>
    </header>
  )
}
