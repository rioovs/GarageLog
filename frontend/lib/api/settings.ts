import { apiClient } from '../api-client';

export interface Settings {
  id: string;
  user_id: string;
  currency: string;
  language: string;
  theme: string;
}

export interface UpdateSettingsDto {
  currency?: string;
  language?: string;
  theme?: string;
}

export const settingsApi = {
  get: async () => {
    return apiClient.get<Settings>('/api/settings');
  },

  update: async (data: UpdateSettingsDto) => {
    return apiClient.put<Settings>('/api/settings', data);
  },
};
