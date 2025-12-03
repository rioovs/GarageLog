import { createClient } from '@supabase/supabase-js';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vjhtsxyytxzzmpcjsbod.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a dummy client if key is missing to prevent build errors
export const supabase = SUPABASE_ANON_KEY 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : createClient(SUPABASE_URL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqaHRzeHl5dHh6em1wY2pzYm9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NTc3NzksImV4cCI6MjA4MDIzMzc3OX0.placeholder-key-for-build');

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions extends RequestInit {
  token?: string;
}

async function request<T>(
  endpoint: string,
  method: RequestMethod,
  data?: any,
  options: RequestOptions = {}
): Promise<T> {
  const { token, headers, ...customConfig } = options;

  let authToken = token;
  if (!authToken) {
    const { data } = await supabase.auth.getSession();
    authToken = data.session?.access_token;
  }

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...headers,
    },
    ...customConfig,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || response.statusText || 'Something went wrong');
  }

  // Handle empty responses (e.g. 204 No Content)
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, 'GET', undefined, options),
  post: <T>(endpoint: string, data: any, options?: RequestOptions) =>
    request<T>(endpoint, 'POST', data, options),
  put: <T>(endpoint: string, data: any, options?: RequestOptions) =>
    request<T>(endpoint, 'PUT', data, options),
  patch: <T>(endpoint: string, data: any, options?: RequestOptions) =>
    request<T>(endpoint, 'PATCH', data, options),
  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, 'DELETE', undefined, options),
};
