import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { decodeToken } from '../utils/jwt';

interface AuthState {
  token: string | null;
  roles: string[];
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      roles: [],
      setToken: (token) => {
        const { authorities = [] } = decodeToken(token);
        console.log(authorities);
        set({ token, roles: authorities });
      },
      logout: () => set({ token: null, roles: [] }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
