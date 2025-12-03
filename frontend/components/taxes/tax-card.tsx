
"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Calendar, FileText, DollarSign } from "lucide-react"
import { TaxRecord } from "@/lib/api/taxes"
import { useCurrency } from "@/hooks/use-currency"

interface TaxCardProps {
  tax: TaxRecord
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function TaxCard({ tax, onEdit, onDelete }: TaxCardProps) {
  const { formatCurrency } = useCurrency()
  return (
    <Card className="overflow-hidden border-border shadow-sm hover:shadow-md transition-shadow group p-5 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <FileText size={20} />
            </div>
            <div>
              <h3 className="font-bold text-foreground">{tax.type}</h3>
              <p className="text-sm text-muted-foreground">{tax.vehicle?.plate} • {tax.vehicle?.brand}</p>
            </div>
          </div>
          <Badge variant="outline" className="font-mono">
            {new Date(tax.date).toLocaleDateString()}
          </Badge>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <DollarSign size={16} /> Amount
            </span>
            <span className="font-bold text-foreground text-lg">
              {formatCurrency(tax.amount)}
            </span>
          </div>
          
          {tax.notes && (
            <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
              <span className="font-medium text-foreground block mb-1">Notes:</span>
              {tax.notes}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t border-border/50 mt-auto">
        <Button variant="ghost" size="sm" onClick={() => onEdit(tax.id)} className="h-8 px-2 text-muted-foreground hover:text-primary">
          <Edit size={16} className="mr-1.5" /> Edit
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete(tax.id)} className="h-8 px-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
          <Trash2 size={16} className="mr-1.5" /> Delete
        </Button>
      </div>
    </Card>
  )
}
