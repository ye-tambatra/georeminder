import { create } from "zustand";
import { logout, refreshToken } from "@/services/auth";

export const AuthProviders = {
   GOOGLE: "google",
   GITHUB: "github",
} as const;

const PROVIDER_URLS = {
   [AuthProviders.GOOGLE]: `${import.meta.env.VITE_API_URL}/social/login/google-oauth2/`,
   [AuthProviders.GITHUB]: `${import.meta.env.VITE_API_URL}/social/login/github/`,
};

export type AuthProvider = (typeof AuthProviders)[keyof typeof AuthProviders];

export interface User {
   id: number;
   email: string;
   firstName: string;
   lastName: string;
}

interface AuthState {
   user: User | null;
   isAuthenticated: boolean;
   login: (provider: AuthProvider) => void;
   logout: () => Promise<void>;
   accessToken: string | null;
   setToken: (token: string) => void;
   refreshToken: () => Promise<string | null>;
   updateState: (data: { user?: User | null; isAuthenticated?: boolean; accessToken?: string }) => void;
}

const useAuthStore = create<AuthState>((set) => ({
   user: null,
   accessToken: null,
   isAuthenticated: false,
   login: (provider: AuthProvider) => {
      window.location.href = PROVIDER_URLS[provider];
   },
   logout: async () => {
      try {
         await logout();
      } finally {
         set({ user: null, isAuthenticated: false });
      }
   },
   setToken: (token: string) => set({ accessToken: token }),
   refreshToken: async () => {
      try {
         const { accessToken, user } = await refreshToken();
         set({
            accessToken,
            isAuthenticated: true,
            user: { ...user },
         });
         return accessToken;
      } catch {
         set({ user: null, isAuthenticated: false });
         return null;
      }
   },
   updateState(data) {
      set({
         ...data,
      });
   },
}));

export default useAuthStore;
