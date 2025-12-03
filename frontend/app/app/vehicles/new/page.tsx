"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { VehicleForm } from "@/components/app/vehicle-form"
import { vehiclesApi } from "@/lib/api/vehicles"
import { toast } from "sonner"

export default function NewVehiclePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      await vehiclesApi.create(data)
      toast.success("Vehicle created successfully")
      router.push("/app/vehicles")
    } catch (error) {
      console.error("Failed to create vehicle:", error)
      toast.error("Failed to create vehicle")
    } finally {
      setIsLoading(false)
    }
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
            <h1 className="text-3xl font-bold text-foreground">Add Vehicle</h1>
            <p className="text-muted-foreground mt-2">Enter the details of the new vehicle</p>
          </div>
        </div>

        <Card className="p-6">
          <VehicleForm onSubmit={handleSubmit} isLoading={isLoading} />
        </Card>
      </div>
    </div>
  )
}
