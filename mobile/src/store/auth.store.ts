import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  loadToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  // Indique si l'utilisateur est authentifié ou non
  // Par défaut, 
  // on peut supposer que l'utilisateur n'est pas authentifié
  // pour pouvoir faire les tests
  isAuthenticated: true,

  login: async (token: string, user: User) => {
    await AsyncStorage.setItem('access_token', token);
    set({ token, user, isAuthenticated: true });
  },

  logout: async () => {
    await AsyncStorage.removeItem('access_token');
    set({ token: null, user: null, isAuthenticated: false });
  },

  loadToken: async () => {
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      set({ token, isAuthenticated: true });
    }
  },
}));