
"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash2, Calendar, AlertCircle, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import { Vehicle } from "@/lib/api/vehicles"

interface VehicleCardProps {
  vehicle: Vehicle & {
    imageUrl?: string
    nextTaxDate?: string
    taxStatus?: 'ON_TIME' | 'DUE_SOON' | 'OVERDUE'
  }
  onView: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function VehicleCard({ vehicle, onView, onEdit, onDelete }: VehicleCardProps) {
  // Mock data if missing
  const imageUrl = vehicle.imageUrl || `https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3`
  const nextTaxDate = vehicle.nextTaxDate || "2025-08-15"
  const taxStatus = vehicle.taxStatus || "ON_TIME"

  const getTaxStatusColor = (status: string) => {
    switch (status) {
      case 'ON_TIME': return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case 'DUE_SOON': return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
      case 'OVERDUE': return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getTaxStatusIcon = (status: string) => {
    switch (status) {
      case 'ON_TIME': return <CheckCircle2 size={14} className="mr-1" />
      case 'DUE_SOON': return <AlertCircle size={14} className="mr-1" />
      case 'OVERDUE': return <AlertCircle size={14} className="mr-1" />
      default: return null
    }
  }

  return (
    <Card className="overflow-hidden border-border shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex flex-col sm:flex-row h-full">
        {/* Image Section */}
        <div className="w-full sm:w-48 h-48 sm:h-auto relative flex-shrink-0 bg-muted">
          <Image 
            src={imageUrl} 
            alt={`${vehicle.brand} ${vehicle.model}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg text-foreground">{vehicle.brand} {vehicle.model} {vehicle.year}</h3>
              <Badge variant={vehicle.status === 'owned' ? 'default' : 'secondary'}>
                {vehicle.status === 'owned' ? 'Owned' : 'Sold'}
              </Badge>
            </div>
            
            <div className="mb-4">
              <p className="text-2xl font-mono font-medium text-foreground tracking-wider">{vehicle.plate}</p>
              <p className="text-sm text-muted-foreground mt-1">{vehicle.year} • {vehicle.brand} • {vehicle.model}</p>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className={`flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getTaxStatusColor(taxStatus)}`}>
                {getTaxStatusIcon(taxStatus)}
                <span>Next Tax: {nextTaxDate}</span>
              </div>
              <span className="text-xs text-muted-foreground hidden sm:inline">Annual Tax</span>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-border/50">
            <Button variant="ghost" size="sm" onClick={() => onView(vehicle.id)} className="h-8 px-2 text-muted-foreground hover:text-primary">
              <Eye size={16} className="mr-1.5" /> View
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onEdit(vehicle.id)} className="h-8 px-2 text-muted-foreground hover:text-primary">
              <Edit size={16} className="mr-1.5" /> Edit
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(vehicle.id)} className="h-8 px-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
              <Trash2 size={16} className="mr-1.5" /> Delete
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
