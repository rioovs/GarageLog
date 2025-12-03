"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit2, Plus, Wrench } from "lucide-react"
import Link from "next/link"
import { vehiclesApi, type Vehicle } from "@/lib/api/vehicles"
import { servicesApi, type ServiceRecord } from "@/lib/api/services"
import { toast } from "sonner"

export default function VehicleDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [services, setServices] = useState<ServiceRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [vehicleData, servicesData] = await Promise.all([
        vehiclesApi.getOne(params.id as string),
        servicesApi.getAll(params.id as string)
      ])
      setVehicle(vehicleData)
      setServices(servicesData)
    } catch (error) {
      console.error("Failed to load data:", error)
      toast.error("Failed to load data")
      router.push("/app/vehicles")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div className="p-8">Loading...</div>
  }

  if (!vehicle) {
    return <div className="p-8">Vehicle not found</div>
  }

  return (
    <div className="p-8 bg-muted/20 min-h-screen">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/app/vehicles">
                <ArrowLeft size={20} />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {vehicle.brand} {vehicle.model}
              </h1>
              <p className="text-muted-foreground mt-2">{vehicle.plate}</p>
            </div>
          </div>
          <Button asChild>
            <Link href={`/app/vehicles/${vehicle.id}/edit`} className="gap-2">
              <Edit2 size={18} />
              Edit Vehicle
            </Link>
          </Button>
        </div>

        <Card className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">License Plate</h3>
              <p className="mt-1 text-lg font-medium text-foreground">{vehicle.plate}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Year</h3>
              <p className="mt-1 text-lg font-medium text-foreground">{vehicle.year}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                  vehicle.status === "owned" ? "bg-green-100 text-green-800" : "bg-muted text-foreground"
                }`}
              >
                {vehicle.status === "owned" ? "Owned" : "Sold"}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Last Service</h3>
              <p className="mt-1 text-lg font-medium text-foreground">{vehicle.lastService || "—"}</p>
            </div>
          </div>
        </Card>

        {/* Services Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Service History</h2>
            <Button asChild variant="outline">
              <Link href={`/app/vehicles/${vehicle.id}/services/new`} className="gap-2">
                <Plus size={16} />
                Add Service
              </Link>
            </Button>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Date</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Type</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Description</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-foreground">Odometer</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-foreground">Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {services.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                        No service records found
                      </td>
                    </tr>
                  ) : (
                    services.map((service) => (
                      <tr key={service.id} className="hover:bg-muted/50">
                        <td className="px-6 py-4 text-sm text-foreground">
                          {new Date(service.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{service.type}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{service.description}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground text-right">
                          {service.odometer.toLocaleString()} km
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-foreground text-right">
                          ${Number(service.cost || 0).toFixed(2)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
