import apiClient from './client';
import { Player, PaginatedResponse } from '../types';

export const playersApi = {
  getAll: async (page = 1, limit = 20): Promise<PaginatedResponse<Player>> => {
    const response = await apiClient.get('/players', { params: { page, limit } });
    return response.data;
  },

  getById: async (id: string): Promise<Player> => {
    const response = await apiClient.get(`/players/${id}`);
    return response.data;
  },

  getByTeam: async (teamId: string): Promise<Player[]> => {
    const response = await apiClient.get(`/players/team/${teamId}`);
    return response.data;
  },
};