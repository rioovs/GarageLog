"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Edit2, Save, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCurrency } from "@/hooks/use-currency"

interface ServiceType {
  id: string
  name: string
  defaultCost?: number
}

export function VehicleSettings() {
  const { toast } = useToast()
  const { currency, setCurrency, isUpdating } = useCurrency()
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([])
  const [newType, setNewType] = useState("")
  const [newCost, setNewCost] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")
  const [editCost, setEditCost] = useState("")

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("vehicle_service_types")
    if (saved) {
      setServiceTypes(JSON.parse(saved))
    } else {
      // Default types
      const defaults = [
        { id: "1", name: "Oil Change", defaultCost: 50 },
        { id: "2", name: "Tire Rotation", defaultCost: 30 },
        { id: "3", name: "Inspection", defaultCost: 100 },
      ]
      setServiceTypes(defaults)
      localStorage.setItem("vehicle_service_types", JSON.stringify(defaults))
    }
  }, [])

  // Save to localStorage whenever types change
  const saveTypes = (types: ServiceType[]) => {
    setServiceTypes(types)
    localStorage.setItem("vehicle_service_types", JSON.stringify(types))
  }

  const handleAdd = () => {
    if (!newType.trim()) return

    const newServiceType: ServiceType = {
      id: Date.now().toString(),
      name: newType,
      defaultCost: newCost ? Number(newCost) : undefined,
    }

    saveTypes([...serviceTypes, newServiceType])
    setNewType("")
    setNewCost("")
    toast({
      title: "Service Type Added",
      description: `${newType} has been added to your service types.`,
    })
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this service type?")) {
      const updated = serviceTypes.filter(t => t.id !== id)
      saveTypes(updated)
      toast({
        title: "Service Type Deleted",
        description: "The service type has been removed.",
      })
    }
  }

  const startEdit = (type: ServiceType) => {
    setEditingId(type.id)
    setEditName(type.name)
    setEditCost(type.defaultCost?.toString() || "")
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditName("")
    setEditCost("")
  }

  const saveEdit = () => {
    if (!editName.trim()) return

    const updated = serviceTypes.map(t => {
      if (t.id === editingId) {
        return {
          ...t,
          name: editName,
          defaultCost: editCost ? Number(editCost) : undefined,
        }
      }
      return t
    })

    saveTypes(updated)
    setEditingId(null)
    toast({
      title: "Service Type Updated",
      description: "Changes have been saved.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Service Types</CardTitle>
          <CardDescription>
            Manage the types of services available for your vehicles. These will appear in dropdowns when adding new service records.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add New */}
          <div className="flex gap-4 items-end border-b pb-6">
            <div className="space-y-2 flex-1">
              <label className="text-sm font-medium">Service Name</label>
              <Input 
                placeholder="e.g. Brake Pad Replacement" 
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
              />
            </div>
            <div className="space-y-2 w-32">
              <label className="text-sm font-medium">Default Cost</label>
              <Input 
                type="number" 
                placeholder="0.00" 
                value={newCost}
                onChange={(e) => setNewCost(e.target.value)}
              />
            </div>
            <Button onClick={handleAdd} disabled={!newType.trim()}>
              <Plus className="w-4 h-4 mr-2" /> Add
            </Button>
          </div>

          {/* List */}
          <div className="space-y-4">
            {serviceTypes.map((type) => (
              <div key={type.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
                {editingId === type.id ? (
                  <div className="flex items-center gap-4 flex-1">
                    <Input 
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1"
                    />
                    <Input 
                      type="number"
                      value={editCost}
                      onChange={(e) => setEditCost(e.target.value)}
                      className="w-32"
                    />
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" onClick={saveEdit}>
                        <Save className="w-4 h-4 text-green-600" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={cancelEdit}>
                        <X className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <h4 className="font-medium">{type.name}</h4>
                      {type.defaultCost && (
                        <p className="text-sm text-muted-foreground">Default: ${type.defaultCost}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" onClick={() => startEdit(type)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(type.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}

            {serviceTypes.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No service types defined.</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>
            Configure global application settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="flex items-center justify-between p-4 border rounded-lg">
             <div>
               <h4 className="font-medium">Currency</h4>
               <p className="text-sm text-muted-foreground">Default currency for cost display</p>
             </div>
             <div className="flex items-center gap-2">
               <Select value={currency} onValueChange={setCurrency} disabled={isUpdating}>
                 <SelectTrigger className="w-[180px]">
                   <SelectValue placeholder="Select currency" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="USD">USD ($)</SelectItem>
                   <SelectItem value="IDR">IDR (Rp)</SelectItem>
                   <SelectItem value="EUR">EUR (€)</SelectItem>
                   <SelectItem value="GBP">GBP (£)</SelectItem>
                   <SelectItem value="JPY">JPY (¥)</SelectItem>
                 </SelectContent>
               </Select>
             </div>
           </div>
           
           <div className="flex items-center justify-between p-4 border rounded-lg">
             <div>
               <h4 className="font-medium">Distance Unit</h4>
               <p className="text-sm text-muted-foreground">Default unit for odometer readings</p>
             </div>
             <div className="flex items-center gap-2">
               <span className="text-sm font-medium bg-muted px-3 py-1 rounded">Kilometers (km)</span>
             </div>
           </div>
        </CardContent>
      </Card>
    </div>
  )
}
