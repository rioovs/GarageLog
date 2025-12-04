
import { apiClient } from '../api-client';

export interface DashboardStats {
  label: string;
  value: string;
  icon: string;
}

export interface UpcomingTask {
  id: string;
  vehicle: string;
  task: string;
  date: string;
  status: string;
}

export interface RecentService {
  id: string;
  vehicle: string;
  service: string;
  date: string;
}

export interface DashboardData {
  user: {
    name: string;
    email: string;
    role: string;
  };
  stats: DashboardStats[];
  upcomingTasks: UpcomingTask[];
  recentServices: RecentService[];
}

export const dashboardApi = {
  getData: () => apiClient.get<DashboardData>('/dashboard'),
};
