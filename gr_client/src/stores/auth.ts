import { create } from "zustand";
import axios from "@/lib/axios";

export const Providers = {
   GOOGLE: "google",
   GITHUB: "github",
} as const;
const PROVIDERS_PATH_MAP = {
   [Providers.GOOGLE]: `${import.meta.env.VITE_API_URL}/social/login/google-oauth2/`,
   [Providers.GITHUB]: `${import.meta.env.VITE_API_URL}/social/login/github/`,
};

export type Provider = (typeof Providers)[keyof typeof Providers];

export interface User {
   id: string;
   email: string;
   name: string;
}

interface AuthStore {
   user: User | null;
   isAuthenticated: boolean;
   login: (provider: Provider) => void;
   logout: () => Promise<void>;
   accessToken: string | null;
   setAccessToken: (token: string) => void;
   refreshAccessToken: () => Promise<string | null>;
   _loginWithAccessToken: (token: string) => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({
   user: null,
   accessToken: null,
   isAuthenticated: false,
   login: (provider: Provider) => {
      window.location.href = PROVIDERS_PATH_MAP[provider];
   },
   logout: async () => {
      try {
         await axios.post("social/logout/");
      } finally {
         set({ user: null, isAuthenticated: false });
      }
   },
   setAccessToken: (token: string) => set({ accessToken: token }),
   refreshAccessToken: async () => {
      try {
         const response = await axios.post<{ access_token: string }>("social/token/refresh/");
         set({ accessToken: response.data.access_token, isAuthenticated: true, user: null });
         return response.data.access_token;
      } catch {
         set({ user: null, isAuthenticated: false });
         return null;
      }
   },
   _loginWithAccessToken: async (token: string) => {
      set({ user: null, isAuthenticated: true, accessToken: token });
   },
}));

export default useAuthStore;
