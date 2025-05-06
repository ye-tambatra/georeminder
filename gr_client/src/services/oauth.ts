import axios from "@/lib/axios";

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const buildOAuthUrl = (base: string, params: Record<string, string>) => {
   const query = new URLSearchParams(params).toString();
   return `${base}?${query}`;
};

export const redirectToGoogleOAuth = () => {
   const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
   const params = {
      client_id: GOOGLE_CLIENT_ID,
      response_type: "code",
      scope: "email profile",
      redirect_uri: "http://localhost:5173/oauth/callback",
      state: "google",
   };

   window.location.href = buildOAuthUrl(baseUrl, params);
};

export const redirectToGithubOAuth = () => {
   const baseUrl = "https://github.com/login/oauth/authorize";
   const params = {
      client_id: GITHUB_CLIENT_ID,
      scope: "user",
      redirect_uri: "http://localhost:5173/oauth/callback",
      state: "github",
   };

   window.location.href = buildOAuthUrl(baseUrl, params);
};

export interface LoginResponse {
   access: string;
   user: { pk: number; email: string; first_name: string; last_name: string; username: string };
}

export const githubLogin = async (code: string) => {
   const url = "/api/auth/login/github/";
   const response = await axios.post<LoginResponse>(url, {
      code,
   });
   return response.data;
};

export const googleLogin = async (code: string) => {
   const url = "/api/auth/login/google/";
   const response = await axios.post<LoginResponse>(url, {
      code,
   });
   return response.data;
};
