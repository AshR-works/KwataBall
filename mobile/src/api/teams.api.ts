import apiClient from './client';
import { Team, PaginatedResponse } from '../types';

export const teamsApi = {
  getAll: async (page = 1, limit = 20): Promise<PaginatedResponse<Team>> => {
    const response = await apiClient.get('/teams', { params: { page, limit } });
    return response.data;
  },

  getById: async (id: string): Promise<Team> => {
    const response = await apiClient.get(`/teams/${id}`);
    return response.data;
  },
};