import { apiRequest } from './client';
import { TaxEntry } from '../types';

export const taxesApi = {
  getAll: async (vehicleId: string): Promise<TaxEntry[]> => {
    return apiRequest<TaxEntry[]>(`/vehicles/${vehicleId}/taxes`);
  },
  getOne: async (id: string): Promise<TaxEntry> => {
    return apiRequest<TaxEntry>(`/taxes/${id}`);
  },
  create: async (vehicleId: string, data: Partial<TaxEntry>): Promise<TaxEntry> => {
    return apiRequest<TaxEntry>(`/vehicles/${vehicleId}/taxes`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  update: async (id: string, data: Partial<TaxEntry>): Promise<TaxEntry> => {
    return apiRequest<TaxEntry>(`/taxes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  delete: async (id: string): Promise<void> => {
    return apiRequest<void>(`/taxes/${id}`, {
      method: 'DELETE',
    });
  }
};
