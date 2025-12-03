"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { VehicleForm } from "@/components/app/vehicle-form"
import { vehiclesApi, type Vehicle } from "@/lib/api/vehicles"
import { toast } from "sonner"

export default function EditVehiclePage() {
  const router = useRouter()
  const params = useParams()
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    loadVehicle()
  }, [])

  const loadVehicle = async () => {
    try {
      const data = await vehiclesApi.getOne(params.id as string)
      setVehicle(data)
    } catch (error) {
      console.error("Failed to load vehicle:", error)
      toast.error("Failed to load vehicle")
      router.push("/app/vehicles")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (data: any) => {
    setIsSaving(true)
    try {
      await vehiclesApi.update(params.id as string, data)
      toast.success("Vehicle updated successfully")
      router.push("/app/vehicles")
    } catch (error) {
      console.error("Failed to update vehicle:", error)
      toast.error("Failed to update vehicle")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8 bg-muted/20 min-h-screen">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/app/vehicles">
              <ArrowLeft size={20} />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Edit Vehicle</h1>
            <p className="text-muted-foreground mt-2">Update vehicle details</p>
          </div>
        </div>

        <Card className="p-6">
          {vehicle && (
            <VehicleForm 
              initialData={vehicle} 
              onSubmit={handleSubmit} 
              isLoading={isSaving} 
            />
          )}
        </Card>
      </div>
    </div>
  )
}
