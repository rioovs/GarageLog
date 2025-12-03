"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useLanguage } from "@/lib/i18n-context"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { vehiclesApi } from "@/lib/api/vehicles"
import { VehicleList } from "@/components/vehicles/vehicle-list"
import { VehicleSettings } from "@/components/vehicles/vehicle-settings"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"

export default function VehiclesPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState("overview")

  // Handle hash navigation
  useEffect(() => {
    if (window.location.hash === "#settings") {
      setActiveTab("settings")
    } else {
      setActiveTab("overview")
    }
  }, [])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (value === "settings") {
      router.push("/app/vehicles#settings")
    } else {
      router.push("/app/vehicles")
    }
  }

  const { data: vehicles, isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: vehiclesApi.getAll,
  })

  const deleteMutation = useMutation({
    mutationFn: vehiclesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] })
      toast({
        title: "Vehicle deleted",
        description: "The vehicle has been successfully deleted.",
      })
    },
  })

  const handleView = (id: string) => router.push(`/app/vehicles/${id}`)
  const handleEdit = (id: string) => router.push(`/app/vehicles/${id}/edit`)
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this vehicle?")) {
      deleteMutation.mutate(id)
    }
  }

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <p>Loading vehicles...</p>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-muted/10 min-h-screen">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Vehicles</h1>
            <p className="text-muted-foreground mt-1">Manage all your vehicles, service history, and tax in one place.</p>
          </div>
          {activeTab === "overview" && (
            <Button onClick={() => router.push('/app/vehicles/new')} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus size={18} className="mr-2" /> Add Vehicle
            </Button>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <VehicleList 
              vehicles={vehicles || []} 
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </TabsContent>

          <TabsContent value="settings">
            <VehicleSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
