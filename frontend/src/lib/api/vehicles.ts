import { apiRequest } from './client';
import { Vehicle } from '../types';

export const vehiclesApi = {
  getAll: async (): Promise<Vehicle[]> => {
    return apiRequest<Vehicle[]>('/vehicles');
  },
  getOne: async (id: string): Promise<Vehicle> => {
    return apiRequest<Vehicle>(`/vehicles/${id}`);
  },
  create: async (data: Partial<Vehicle>): Promise<Vehicle> => {
    return apiRequest<Vehicle>('/vehicles', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  update: async (id: string, data: Partial<Vehicle>): Promise<Vehicle> => {
    return apiRequest<Vehicle>(`/vehicles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  delete: async (id: string): Promise<void> => {
    return apiRequest<void>(`/vehicles/${id}`, {
      method: 'DELETE',
    });
  }
};
