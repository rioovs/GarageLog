
"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { VehicleForm } from "@/components/app/vehicle-form"
import { Vehicle } from "@/lib/api/vehicles"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface VehicleDialogsProps {
  selectedVehicle: Vehicle | null
  isViewOpen: boolean
  isEditOpen: boolean
  isDeleteOpen: boolean
  onClose: () => void
  onEditSubmit: (data: any) => Promise<void>
  onDeleteConfirm: () => Promise<void>
}

export function VehicleDialogs({
  selectedVehicle,
  isViewOpen,
  isEditOpen,
  isDeleteOpen,
  onClose,
  onEditSubmit,
  onDeleteConfirm,
}: VehicleDialogsProps) {
  if (!selectedVehicle) return null

  return (
    <>
      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Vehicle Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6">
            <div className="relative w-full h-48 bg-muted rounded-lg overflow-hidden">
               <Image 
                src={`https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3`} 
                alt={`${selectedVehicle.brand} ${selectedVehicle.model}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-muted-foreground text-sm">License Plate</h3>
                <p className="text-lg font-mono">{selectedVehicle.plate}</p>
              </div>
              <div>
                <h3 className="font-semibold text-muted-foreground text-sm">Status</h3>
                <Badge variant={selectedVehicle.status === 'owned' ? 'default' : 'secondary'} className="mt-1">
                  {selectedVehicle.status === 'owned' ? 'Owned' : 'Sold'}
                </Badge>
              </div>
              <div>
                <h3 className="font-semibold text-muted-foreground text-sm">Brand</h3>
                <p>{selectedVehicle.brand}</p>
              </div>
              <div>
                <h3 className="font-semibold text-muted-foreground text-sm">Model</h3>
                <p>{selectedVehicle.model}</p>
              </div>
              <div>
                <h3 className="font-semibold text-muted-foreground text-sm">Year</h3>
                <p>{selectedVehicle.year}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Vehicle</DialogTitle>
            <DialogDescription>
              Make changes to the vehicle details here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <VehicleForm 
            initialData={selectedVehicle} 
            onSubmit={onEditSubmit} 
          />
        </DialogContent>
      </Dialog>

      {/* Delete Alert Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the vehicle
              <span className="font-bold text-foreground mx-1">
                {selectedVehicle.brand} {selectedVehicle.model} ({selectedVehicle.plate})
              </span>
              and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
