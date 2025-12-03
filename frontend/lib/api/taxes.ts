import { apiClient } from '../api-client';

export interface TaxRecord {
  id: string;
  vehicleId: string;
  date: string;
  amount: number | string;
  type: string;
  notes?: string;
  vehicle?: {
    plate: string;
    brand: string;
    model: string;
  };
}

export const taxesApi = {
  getAll: () => apiClient.get<TaxRecord[]>('/api/taxes'),
  getOne: (id: string) => apiClient.get<TaxRecord>(`/api/taxes/${id}`),
  create: (data: Omit<TaxRecord, 'id' | 'vehicle'>) => apiClient.post<TaxRecord>('/api/taxes', data),
  update: (id: string, data: Partial<TaxRecord>) => apiClient.patch<TaxRecord>(`/api/taxes/${id}`, data),
  delete: (id: string) => apiClient.delete(`/api/taxes/${id}`),
};
