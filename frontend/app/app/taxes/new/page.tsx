"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { taxesApi } from "@/lib/api/taxes"
import { vehiclesApi, type Vehicle } from "@/lib/api/vehicles"
import { toast } from "sonner"

export default function NewTaxPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])

  useEffect(() => {
    loadVehicles()
  }, [])

  const loadVehicles = async () => {
    try {
      const data = await vehiclesApi.getAll()
      setVehicles(data)
    } catch (error) {
      console.error("Failed to load vehicles:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const data = {
      vehicleId: formData.get("vehicleId") as string,
      type: formData.get("type") as string,
      amount: parseFloat(formData.get("amount") as string),
      date: formData.get("date") as string,
      notes: formData.get("notes") as string,
    }

    try {
      await taxesApi.create(data)
      toast.success("Tax record created successfully")
      router.push("/app/taxes")
    } catch (error) {
      console.error("Failed to create tax record:", error)
      toast.error("Failed to create tax record")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8 bg-muted/20 min-h-screen">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/app/taxes">
              <ArrowLeft size={20} />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Add Tax Record</h1>
            <p className="text-muted-foreground mt-2">Record a new tax payment</p>
          </div>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="vehicleId">Vehicle</Label>
              <Select name="vehicleId" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {v.plate} - {v.brand} {v.model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select name="type" required defaultValue="annual">
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">Annual Tax</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="registration">Registration</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" name="amount" type="number" step="0.01" required placeholder="0.00" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" name="date" type="date" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Input id="notes" name="notes" placeholder="Optional notes" />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Record"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
