import { create } from "zustand";
import { User, UserLimit } from "@/types";

interface AuthState {
  user: User | null;
  limits: UserLimit | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setLimits: (limits: UserLimit | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  limits: null,
  isLoading: true,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setLimits: (limits) => set({ limits }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null, limits: null, isAuthenticated: false }),
}));
