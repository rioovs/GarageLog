import { apiClient } from '../api-client';

export interface User {
  id: string;
  full_name: string;
  role: 'USER' | 'ADMIN';
  is_active: boolean;
  created_at: string;
  _count?: {
    vehicles: number;
  };
}

export const usersApi = {
  getAll: async () => {
    return apiClient.get<User[]>('/api/profiles');
  },

  getMe: async () => {
    return apiClient.get<User>('/api/me');
  },

  update: async (id: string, data: Partial<User>) => {
    return apiClient.put<User>(`/api/profiles/${id}`, data);
  },

  delete: async (id: string) => {
    return apiClient.delete(`/api/profiles/${id}`);
  },
};
