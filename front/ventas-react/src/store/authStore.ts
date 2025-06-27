import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { decodeToken } from '../utils/jwt';

interface AuthState {
  token: string | null;
  username: string | null;
  roles: string[];
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      username: null,
      roles: [],
      setToken: (token) => {
        const decoded = decodeToken(token);
        const roles = decoded?.authorities || [];
        const username = decoded?.sub || null;

        console.log('Usuario:', username);
        console.log('Roles:', roles);

        set({ token, roles, username });
      },
      logout: () => set({ token: null, username: null, roles: [] }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
