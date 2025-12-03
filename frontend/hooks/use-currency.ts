
"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { settingsApi, UpdateSettingsDto } from "@/lib/api/settings"

export function useCurrency() {
  const queryClient = useQueryClient()

  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: settingsApi.get,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const updateSettingsMutation = useMutation({
    mutationFn: settingsApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
    },
  })

  const currency = settings?.currency || "USD"

  const formatCurrency = (amount: number | string) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
    if (isNaN(numAmount)) return amount.toString()

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(numAmount)
  }

  const setCurrency = async (newCurrency: string) => {
    await updateSettingsMutation.mutateAsync({ currency: newCurrency })
  }

  return {
    currency,
    formatCurrency,
    setCurrency,
    isLoading,
    isUpdating: updateSettingsMutation.isPending
  }
}
