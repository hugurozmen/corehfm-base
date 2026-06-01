import { create } from "zustand";

interface AuthState {
  email: string | null;
  isAuthenticated: boolean;
  login(email: string): void;
  logout(): void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: null,
  isAuthenticated: false,
  login: (email) => set({ email, isAuthenticated: true }),
  logout: () => set({ email: null, isAuthenticated: false }),
}));
