import { create } from "zustand";
import * as authService from "@/services/auth";
import * as oauthService from "@/services/oauth";
import { User } from "@/types/user";

export const AuthProviders = {
   GOOGLE: "google",
   GITHUB: "github",
} as const;

export type AuthProvider = (typeof AuthProviders)[keyof typeof AuthProviders];

interface AuthState {
   accessToken: string | null;
   user: User | null;
   isAuthenticated: boolean;
   logIn: (provider: AuthProvider) => void;
   logOut: () => Promise<void>;
   clientSideLogout: () => void;
   refreshAccessToken: () => Promise<string | null>;

   updateState: (data: { accessToken?: string; user?: User; isAuthenticated?: boolean }) => void;
}

const useAuthStore = create<AuthState>((set) => ({
   accessToken: null,
   user: null,
   isAuthenticated: false,

   logIn(provider) {
      if (provider === AuthProviders.GOOGLE) {
         oauthService.redirectToGithubOAuth();
      } else if (provider === AuthProviders.GITHUB) {
         oauthService.redirectToGithubOAuth();
      }
   },

   async logOut() {
      try {
         await authService.logout();
      } finally {
         set({
            user: null,
            accessToken: null,
            isAuthenticated: false,
         });
      }
   },

   clientSideLogout() {
      set({
         user: null,
         accessToken: null,
         isAuthenticated: false,
      });
   },

   async refreshAccessToken() {
      try {
         const accessToken = await authService.refreshAccessToken();
         set({
            accessToken,
         });
         const user = await authService.getMe();
         set({
            user: {
               ...user,
            },
            isAuthenticated: true,
         });
         return accessToken;
      } catch {
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
