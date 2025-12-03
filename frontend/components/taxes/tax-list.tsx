
"use client"

import { useState } from "react"
import { TaxRecord } from "@/lib/api/taxes"
import { TaxCard } from "./tax-card"
import { Input } from "@/components/ui/input"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination"
import { Search } from "lucide-react"

interface TaxListProps {
  taxes: TaxRecord[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

const ITEMS_PER_PAGE = 8

export function TaxList({ taxes, onEdit, onDelete }: TaxListProps) {
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  // Filter logic
  const filteredTaxes = taxes.filter(tax => {
    const searchLower = search.toLowerCase()
    return (
      (tax.vehicle?.plate?.toLowerCase() || "").includes(searchLower) ||
      (tax.vehicle?.brand?.toLowerCase() || "").includes(searchLower) ||
      (tax.type?.toLowerCase() || "").includes(searchLower)
    )
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredTaxes.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedTaxes = filteredTaxes.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-4 rounded-lg border border-border shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search by plate, brand, or type..." 
            className="pl-9"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedTaxes.map((tax) => (
          <TaxCard 
            key={tax.id} 
            tax={tax} 
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Empty State */}
      {paginatedTaxes.length === 0 && (
        <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed border-border">
          <p className="text-muted-foreground">No tax records found matching your criteria.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(currentPage - 1)} 
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {(() => {
                const pages = [];
                const maxVisiblePages = 5;

                if (totalPages <= maxVisiblePages) {
                  for (let i = 1; i <= totalPages; i++) {
                    pages.push(i);
                  }
                } else {
                  if (currentPage <= 3) {
                    pages.push(1, 2, 3, '...', totalPages);
                  } else if (currentPage >= totalPages - 2) {
                    pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
                  } else {
                    pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
                  }
                }

                return pages.map((page, i) => (
                  <PaginationItem key={i}>
                    {page === '...' ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink 
                        isActive={currentPage === page}
                        onClick={() => handlePageChange(page as number)}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ));
              })()}

              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
