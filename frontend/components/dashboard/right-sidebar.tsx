
"use client"

import { Card } from "@/components/ui/card"
import { useLanguage } from "@/lib/i18n-context"
import { Calendar, ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface RightSidebarProps {
  upcomingTasks: any[]
}

export function RightSidebar({ upcomingTasks }: RightSidebarProps) {
  const { t } = useLanguage()

  return (
    <div className="space-y-6 h-full">
      {/* Upcoming Tasks Section */}
      <div className="bg-white dark:bg-card rounded-xl p-6 shadow-sm border border-border">
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Upcoming Tasks</h3>
            <div className="p-2 bg-muted rounded-full">
                <Calendar size={18} />
            </div>
        </div>

        <div className="space-y-4">
            {upcomingTasks.length === 0 ? (
                <p className="text-sm text-muted-foreground">No upcoming tasks</p>
            ) : (
                upcomingTasks.slice(0, 4).map((task) => (
                    <div key={task.id} className="flex items-center justify-between group cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-muted-foreground">{task.date}</span>
                                <span className="text-sm font-semibold">{task.task}</span>
                                <span className="text-xs text-muted-foreground">{task.vehicle}</span>
                            </div>
                        </div>
                        <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                ))
            )}
            
            <button className="w-full text-center text-xs text-muted-foreground hover:text-primary mt-4 flex items-center justify-center gap-1">
                See all tasks <ArrowUpRight size={12} />
            </button>
        </div>
      </div>

      {/* Stats/Progress Section */}
      <div className="bg-white dark:bg-card rounded-xl p-6 shadow-sm border border-border">
        <h3 className="font-bold text-lg mb-6">Vehicle Health</h3>
        
        <div className="space-y-6">
            <div>
                <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Tax Compliance</span>
                    <span className="text-muted-foreground">92%</span>
                </div>
                <Progress value={92} className="h-2" />
            </div>
            
            <div>
                <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Service Schedule</span>
                    <span className="text-muted-foreground">78%</span>
                </div>
                <Progress value={78} className="h-2" />
            </div>
            
            <div>
                <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Fleet Utilization</span>
                    <span className="text-muted-foreground">85%</span>
                </div>
                <Progress value={85} className="h-2" />
            </div>
        </div>
      </div>
    </div>
  )
}
