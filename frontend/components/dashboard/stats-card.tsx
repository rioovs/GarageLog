
"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  subtitle: string
  icon: LucideIcon
  className?: string
  gradient?: string
}

export function StatsCard({ title, value, subtitle, icon: Icon, className, gradient }: StatsCardProps) {
  return (
    <Card className={cn("p-6 text-white border-none shadow-md relative overflow-hidden", className)} style={{ background: gradient }}>
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-white/90">{title}</h3>
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Icon size={20} className="text-white" />
          </div>
        </div>
        
        <div className="mt-4">
          <h2 className="text-4xl font-bold mb-1">{value}</h2>
          <p className="text-sm text-white/80">{subtitle}</p>
        </div>
      </div>
      
      {/* Decorative circles */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
      <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
    </Card>
  )
}
