import { apiRequest } from './client';
import { Vehicle } from '../types';

export async function getVehicles(): Promise<Vehicle[]> {
  return apiRequest<Vehicle[]>('/vehicles');
}

export async function getVehicle(id: string): Promise<Vehicle> {
  return apiRequest<Vehicle>(`/vehicles/${id}`);
}

export async function createVehicle(data: Partial<Vehicle>): Promise<Vehicle> {
  return apiRequest<Vehicle>('/vehicles', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateVehicle(id: string, data: Partial<Vehicle>): Promise<Vehicle> {
  return apiRequest<Vehicle>(`/vehicles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteVehicle(id: string): Promise<void> {
  return apiRequest<void>(`/vehicles/${id}`, {
    method: 'DELETE',
  });
}
