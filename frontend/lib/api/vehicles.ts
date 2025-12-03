import { apiClient } from '../api-client';

export interface Vehicle {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  status: 'owned' | 'sold';
  lastService?: string;
}

export const vehiclesApi = {
  getAll: async () => {
    return apiClient.get<Vehicle[]>('/api/vehicles');
  },

  getOptions: async () => {
    return apiClient.get<{ brands: string[], models: string[] }>('/api/vehicles/options');
  },

  getOne: (id: string) => apiClient.get<Vehicle>(`/api/vehicles/${id}`),
  create: (data: Omit<Vehicle, 'id'>) => apiClient.post<Vehicle>('/api/vehicles', data),
  update: (id: string, data: Partial<Vehicle>) => apiClient.put<Vehicle>(`/api/vehicles/${id}`, data),
  delete: (id: string) => apiClient.delete(`/api/vehicles/${id}`),
};
