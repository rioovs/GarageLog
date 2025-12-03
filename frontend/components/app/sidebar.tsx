"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Car, FileText, Settings, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { useLanguage } from "@/lib/i18n-context"
import { useState, useEffect } from "react"
import { usersApi, type User } from "@/lib/api/users"

interface AppSidebarProps {
  className?: string
}

export function AppSidebar({ className }: AppSidebarProps) {
  const pathname = usePathname()
  const { t } = useLanguage()

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    usersApi.getMe().then(setUser).catch(console.error)
  }, [])

  const navItems = [
    { href: "/app", label: t('dashboard.overview'), icon: Car },
    { href: "/app/vehicles", label: t('dashboard.vehicles'), icon: Car },
    { href: "/app/taxes", label: t('dashboard.taxes'), icon: FileText },
    ...(user?.role === 'ADMIN' ? [{ href: "/app/admin/users", label: t('dashboard.users'), icon: Users }] : []),
  ]

  return (
    <aside className={cn("w-64 border-r border-border bg-sidebar flex flex-col", className)}>
      {/* Logo */}
      <Link href="/" className="h-16 border-b border-border flex items-center gap-3 px-6">
        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">VM</span>
        </div>
        <span className="font-semibold text-foreground">VehicleHub</span>
      </Link>

      {/* Nav Items */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition",
                isActive ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-4 space-y-2">
        <div className="px-4 py-2 text-xs text-muted-foreground">
          Created by <a href="https://github.com/rioovs" target="_blank" rel="noopener noreferrer" className="hover:text-foreground underline">rioovs</a>
        </div>
      </div>
    </aside>
  )
}
