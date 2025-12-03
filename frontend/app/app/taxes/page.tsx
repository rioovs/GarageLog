"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { taxesApi, type TaxRecord } from "@/lib/api/taxes"
import { toast } from "sonner"
import { TaxList } from "@/components/taxes/tax-list"
import { useRouter } from "next/navigation"

export default function TaxesPage() {
  const [taxes, setTaxes] = useState<TaxRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

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

  const handleEdit = (id: string) => {
    router.push(`/app/taxes/${id}/edit`)
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
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/app/taxes/new" className="gap-2">
              <Plus size={18} />
              Add Tax Record
            </Link>
          </Button>
        </div>

        {/* Content */}
        <TaxList 
          taxes={taxes} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}
