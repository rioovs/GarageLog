"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { TaxForm } from "./tax-form"
import { TaxRecord } from "@/lib/api/taxes"

interface TaxDialogsProps {
  selectedTax: TaxRecord | null
  isCreateOpen: boolean
  isEditOpen: boolean
  onClose: () => void
  onCreateSubmit: (data: any) => Promise<void>
  onEditSubmit: (data: any) => Promise<void>
}

export function TaxDialogs({
  selectedTax,
  isCreateOpen,
  isEditOpen,
  onClose,
  onCreateSubmit,
  onEditSubmit,
}: TaxDialogsProps) {
  return (
    <>
      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Tax Record</DialogTitle>
            <DialogDescription>
              Add a new tax payment record for your vehicle.
            </DialogDescription>
          </DialogHeader>
          <TaxForm onSubmit={onCreateSubmit} />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Tax Record</DialogTitle>
            <DialogDescription>
              Make changes to the tax record here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {selectedTax && (
            <TaxForm 
              initialData={selectedTax} 
              onSubmit={onEditSubmit} 
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
