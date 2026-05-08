"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserRole } from "@/lib/constants";

export interface User {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
  centerCode?: string;
  centerName?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "ccms-auth",
    }
  )
);
