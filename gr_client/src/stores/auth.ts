import { create } from "zustand";
import axios from "@/lib/axios";

interface User {
   id: string;
   email: string;
   name: string;
}

interface AuthStore {
   user: User | null;
   isAuthenticated: boolean;
   login: (user: User) => void;
   logout: () => Promise<void>;
   accessToken: string | null;
   setAccessToken: (token: string) => void;
   refreshAccessToken: () => Promise<string | null>;
}

const useAuthStore = create<AuthStore>((set) => ({
   user: null,
   accessToken: null,
   isAuthenticated: false,
   login: (user: User) => set({ user, isAuthenticated: true }),
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
         set({ accessToken: response.data.access_token });
         return response.data.access_token;
      } catch {
         set({ user: null, isAuthenticated: false });
         return null;
      }
   },
}));

export default useAuthStore;
