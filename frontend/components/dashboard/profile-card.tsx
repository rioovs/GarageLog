
"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLanguage } from "@/lib/i18n-context"
import { Users, Car, FileText } from "lucide-react"

interface ProfileCardProps {
  user: {
    name: string
    email: string
    role: string
  }
  stats: {
    vehicles: number
    services: number
    taxes: number
  }
}

export function ProfileCard({ user, stats }: ProfileCardProps) {
  const { t } = useLanguage()

  return (
    <Card className="p-6 flex flex-col items-center text-center bg-white dark:bg-card border-border shadow-sm h-full justify-center">
      <div className="relative mb-4">
        <div className="w-24 h-24 rounded-full border-4 border-blue-100 dark:border-blue-900 flex items-center justify-center p-1">
             <Avatar className="w-full h-full">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-foreground">{user.name}</h3>
      <p className="text-sm text-muted-foreground mb-6">{user.role}</p>

      <div className="flex gap-6 w-full justify-center">
        <div className="flex flex-col items-center gap-1">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-full text-orange-600 dark:text-orange-400">
                <Users size={16} />
            </div>
            <span className="font-bold text-foreground">{stats.vehicles}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-full text-purple-600 dark:text-purple-400">
                <Car size={16} />
            </div>
            <span className="font-bold text-foreground">{stats.services}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
            <div className="p-2 bg-pink-100 dark:bg-pink-900/20 rounded-full text-pink-600 dark:text-pink-400">
                <FileText size={16} />
            </div>
            <span className="font-bold text-foreground">{stats.taxes}</span>
        </div>
      </div>
    </Card>
  )
}
