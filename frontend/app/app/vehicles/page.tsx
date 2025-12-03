"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useLanguage } from "@/lib/i18n-context"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { vehiclesApi, Vehicle } from "@/lib/api/vehicles"
import { VehicleList } from "@/components/vehicles/vehicle-list"
import { VehicleSettings } from "@/components/vehicles/vehicle-settings"
import { VehicleDialogs } from "@/components/vehicles/vehicle-dialogs"
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

  // Modal State
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  // Handle hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash === "#settings") {
        setActiveTab("settings")
      } else {
        setActiveTab("overview")
      }
    }

    // Check on mount
    handleHashChange()

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange)
    
    return () => {
      window.removeEventListener("hashchange", handleHashChange)
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

  // Mutations
  const createMutation = useMutation({
    mutationFn: vehiclesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] })
      toast({ title: "Vehicle created", description: "New vehicle has been added successfully." })
      handleClose()
    },
    onError: () => toast({ title: "Error", description: "Failed to create vehicle.", variant: "destructive" })
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => vehiclesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] })
      toast({ title: "Vehicle updated", description: "Changes have been saved successfully." })
      handleClose()
    },
    onError: () => toast({ title: "Error", description: "Failed to update vehicle.", variant: "destructive" })
  })

  const deleteMutation = useMutation({
    mutationFn: vehiclesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] })
      toast({
        title: "Vehicle deleted",
        description: "The vehicle has been successfully deleted.",
      })
      handleClose()
    },
    onError: () => toast({ title: "Error", description: "Failed to delete vehicle.", variant: "destructive" })
  })

  // Handlers
  const handleCreate = () => {
    setIsCreateOpen(true)
  }

  const handleView = (id: string) => {
    const vehicle = vehicles?.find(v => v.id === id)
    if (vehicle) {
      setSelectedVehicle(vehicle)
      setIsViewOpen(true)
    }
  }

  const handleEdit = (id: string) => {
    const vehicle = vehicles?.find(v => v.id === id)
    if (vehicle) {
      setSelectedVehicle(vehicle)
      setIsEditOpen(true)
    }
  }

  const handleDelete = (id: string) => {
    const vehicle = vehicles?.find(v => v.id === id)
    if (vehicle) {
      setSelectedVehicle(vehicle)
      setIsDeleteOpen(true)
    }
  }

  const handleClose = () => {
    setIsCreateOpen(false)
    setIsViewOpen(false)
    setIsEditOpen(false)
    setIsDeleteOpen(false)
    setTimeout(() => setSelectedVehicle(null), 300) // Clear after animation
  }

  const onCreateSubmit = async (data: any) => {
    await createMutation.mutateAsync(data)
  }

  const onEditSubmit = async (data: any) => {
    if (selectedVehicle) {
      await updateMutation.mutateAsync({ id: selectedVehicle.id, data })
    }
  }

  const onDeleteConfirm = async () => {
    if (selectedVehicle) {
      await deleteMutation.mutateAsync(selectedVehicle.id)
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
            <Button onClick={handleCreate} className="bg-primary text-primary-foreground hover:bg-primary/90">
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

        {/* Dialogs */}
        <VehicleDialogs 
          selectedVehicle={selectedVehicle}
          isCreateOpen={isCreateOpen}
          isViewOpen={isViewOpen}
          isEditOpen={isEditOpen}
          isDeleteOpen={isDeleteOpen}
          onClose={handleClose}
          onCreateSubmit={onCreateSubmit}
          onEditSubmit={onEditSubmit}
          onDeleteConfirm={onDeleteConfirm}
        />
      </div>
    </div>
  )
}
