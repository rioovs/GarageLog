import { apiClient } from '../api-client';

export interface ServiceRecord {
  id: string;
  vehicleId: string;
  date: string;
  description: string;
  cost: number | string;
  odometer: number;
  type: string;
  notes?: string;
}

export const servicesApi = {
  getAll: (vehicleId?: string) => apiClient.get<ServiceRecord[]>(vehicleId ? `/api/vehicles/${vehicleId}/services` : '/api/services'),
  getOne: (id: string) => apiClient.get<ServiceRecord>(`/api/services/${id}`),
  create: (data: Omit<ServiceRecord, 'id'>) => apiClient.post<ServiceRecord>('/api/services', data),
  update: (id: string, data: Partial<ServiceRecord>) => apiClient.patch<ServiceRecord>(`/api/services/${id}`, data),
  delete: (id: string) => apiClient.delete(`/api/services/${id}`),
};
