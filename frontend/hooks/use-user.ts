
"use client"

import { useQuery } from "@tanstack/react-query"
import { dashboardApi } from "@/lib/api/dashboard"

export function useUser() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard'], // Reusing dashboard query key for shared cache
    queryFn: dashboardApi.getData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  return {
    user: data?.user,
    isLoading,
  }
}
