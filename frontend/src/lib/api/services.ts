import { apiRequest } from './client';
import { ServiceRecord } from '../types';

export const servicesApi = {
  getAll: async (vehicleId: string): Promise<ServiceRecord[]> => {
    return apiRequest<ServiceRecord[]>(`/vehicles/${vehicleId}/services`);
  },
  getOne: async (id: string): Promise<ServiceRecord> => {
    return apiRequest<ServiceRecord>(`/services/${id}`);
  },
  create: async (vehicleId: string, data: Partial<ServiceRecord>): Promise<ServiceRecord> => {
    return apiRequest<ServiceRecord>(`/vehicles/${vehicleId}/services`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  update: async (id: string, data: Partial<ServiceRecord>): Promise<ServiceRecord> => {
    return apiRequest<ServiceRecord>(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  delete: async (id: string): Promise<void> => {
    return apiRequest<void>(`/services/${id}`, {
      method: 'DELETE',
    });
  }
};
