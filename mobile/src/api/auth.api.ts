import apiClient from './client';
import { AuthResponse } from '../types';

export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/register', { name, email, password });
    return response.data;
  },
};