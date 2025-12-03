"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { taxesApi, type TaxRecord } from "@/lib/api/taxes"
import { toast } from "sonner"
import { TaxList } from "@/components/taxes/tax-list"
import { TaxDialogs } from "@/components/taxes/tax-dialogs"

export default function TaxesPage() {
  const [taxes, setTaxes] = useState<TaxRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Modal State
  const [selectedTax, setSelectedTax] = useState<TaxRecord | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  useEffect(() => {
    loadTaxes()
  }, [])

  const loadTaxes = async () => {
    try {
      const data = await taxesApi.getAll()
      setTaxes(data)
    } catch (error) {
      console.error("Failed to load taxes:", error)
      toast.error("Failed to load taxes")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = () => {
    setIsCreateOpen(true)
  }

  const handleEdit = (id: string) => {
    const tax = taxes.find(t => t.id === id)
    if (tax) {
      setSelectedTax(tax)
      setIsEditOpen(true)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this tax record?")) {
      try {
        await taxesApi.delete(id)
        toast.success("Tax record deleted")
        loadTaxes()
      } catch (error) {
        console.error("Failed to delete tax:", error)
        toast.error("Failed to delete tax record")
      }
    }
  }

  const handleClose = () => {
    setIsCreateOpen(false)
    setIsEditOpen(false)
    setTimeout(() => setSelectedTax(null), 300)
  }

  const onCreateSubmit = async (data: any) => {
    try {
      await taxesApi.create(data)
      toast.success("Tax record created")
      handleClose()
      loadTaxes()
    } catch (error) {
      console.error("Failed to create tax:", error)
      toast.error("Failed to create tax record")
    }
  }

  const onEditSubmit = async (data: any) => {
    if (selectedTax) {
      try {
        await taxesApi.update(selectedTax.id, data)
        toast.success("Tax record updated")
        handleClose()
        loadTaxes()
      } catch (error) {
        console.error("Failed to update tax:", error)
        toast.error("Failed to update tax record")
      }
    }
  }

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <p>Loading taxes...</p>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-muted/10 min-h-screen">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Taxes</h1>
            <p className="text-muted-foreground mt-1">Manage vehicle taxes and documents</p>
          </div>
          <Button onClick={handleCreate} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus size={18} className="mr-2" />
            Add Tax Record
          </Button>
        </div>

        {/* Content */}
        <TaxList 
          taxes={taxes} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Dialogs */}
        <TaxDialogs 
          selectedTax={selectedTax}
          isCreateOpen={isCreateOpen}
          isEditOpen={isEditOpen}
          onClose={handleClose}
          onCreateSubmit={onCreateSubmit}
          onEditSubmit={onEditSubmit}
        />
      </div>
    </div>
  )
}
