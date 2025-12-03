"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { servicesApi } from "@/lib/api/services"
import { toast } from "sonner"

export default function NewServicePage() {
  const router = useRouter()
  const params = useParams()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const data = {
      vehicleId: params.id as string,
      type: formData.get("type") as string,
      description: formData.get("description") as string,
      cost: parseFloat(formData.get("cost") as string),
      odometer: parseInt(formData.get("odometer") as string),
      date: formData.get("date") as string,
      notes: formData.get("notes") as string,
    }

    try {
      await servicesApi.create(data)
      toast.success("Service record created successfully")
      router.push(`/app/vehicles/${params.id}`)
    } catch (error) {
      console.error("Failed to create service record:", error)
      toast.error("Failed to create service record")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8 bg-muted/20 min-h-screen">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/app/vehicles/${params.id}`}>
              <ArrowLeft size={20} />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Add Service Record</h1>
            <p className="text-muted-foreground mt-2">Record a new service or maintenance</p>
          </div>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select name="type" required defaultValue="maintenance">
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="repair">Repair</SelectItem>
                    <SelectItem value="upgrade">Upgrade</SelectItem>
                    <SelectItem value="inspection">Inspection</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" type="date" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" required placeholder="e.g. Oil Change" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="cost">Cost</Label>
                <Input id="cost" name="cost" type="number" step="0.01" required placeholder="0.00" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="odometer">Odometer (km)</Label>
                <Input id="odometer" name="odometer" type="number" required placeholder="0" />
              </div>
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
