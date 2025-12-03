"use client"

import { useLanguage } from "@/lib/i18n-context"
import { useQuery } from "@tanstack/react-query"
import { dashboardApi } from "@/lib/api/dashboard"
import { ProfileCard } from "@/components/dashboard/profile-card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { AnalyticsChart } from "@/components/dashboard/analytics-chart"
import { RightSidebar } from "@/components/dashboard/right-sidebar"
import { Car, FileText, CheckCircle2 } from "lucide-react"

export default function DashboardPage() {
  const { t } = useLanguage()

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: dashboardApi.getData,
  })

  // Fallback/Loading state
  if (isLoading) {
    return (
      <div className="p-8 bg-muted/20 min-h-screen flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    )
  }

  const activeVehicles = data?.stats.find(s => s.label === "Active Vehicles")?.value || "0"
  const upcomingTasksCount = data?.stats.find(s => s.label === "Upcoming Tasks")?.value || "0"
  const taxRecords = data?.stats.find(s => s.label === "Tax Records")?.value || "0"

  const upcomingTasks = data?.upcomingTasks || []

  return (
    <div className="p-6 bg-gray-50 dark:bg-muted/10 min-h-screen">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-8 flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Welcome, User</h1>
                <p className="text-muted-foreground text-sm">Your personal dashboard overview</p>
            </div>
            {/* Search bar could go here */}
        </div>

        <div className="grid grid-cols-12 gap-6">
            {/* Main Content - Left Side */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
                {/* Top Row: Profile + Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:h-[320px]">
                    {/* Profile Card */}
                    <div className="md:col-span-1 h-full">
                        <ProfileCard 
                            user={{ name: "User Name", email: "user@example.com", role: "Fleet Manager" }}
                            stats={{ 
                                vehicles: parseInt(activeVehicles), 
                                services: 12, // Mock for now
                                taxes: parseInt(taxRecords) 
                            }}
                        />
                    </div>

                    {/* Stats Cards */}
                    <div className="md:col-span-2 grid grid-cols-2 gap-6 h-full">
                        <StatsCard 
                            title="Active Vehicles"
                            value={activeVehicles}
                            subtitle="Vehicles in operation"
                            icon={Car}
                            gradient="linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)"
                            className="h-full"
                        />
                        <StatsCard 
                            title="Pending Taxes"
                            value={upcomingTasksCount}
                            subtitle="Due in next 30 days"
                            icon={FileText}
                            gradient="linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)"
                            className="h-full"
                        />
                    </div>
                </div>

                {/* Analytics Chart */}
                <div>
                    <AnalyticsChart />
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="col-span-12 lg:col-span-4">
                <RightSidebar upcomingTasks={upcomingTasks} />
            </div>
        </div>
      </div>
    </div>
  )
}
