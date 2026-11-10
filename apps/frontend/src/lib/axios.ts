import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    console.error('API Error:', (error as any)?.response || (error as any)?.message);

    if ((error as any)?.response?.status === 401) {
      useAuthStore.getState().clearToken();
      window.location.href = '/login';
    }

    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
);

export default apiClient;
