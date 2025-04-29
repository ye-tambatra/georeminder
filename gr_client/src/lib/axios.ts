import useAuthStore from "@/stores/auth";
import axios from "axios";

const api = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
   withCredentials: true,
});

api.interceptors.request.use((config) => {
   const authStore = useAuthStore.getState();
   const accessToken = authStore.accessToken;

   if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
   }
   return config;
});

let refreshTokenPromise: Promise<string | null> | null = null;

api.interceptors.response.use(
   (response) => response,
   async (error) => {
      const originalRequest = error.config;

      const isAccessTokenExpired =
         error.response?.status === 401 &&
         error.response?.data?.code === "token_not_valid" &&
         Array.isArray(error.response?.data?.messages) &&
         error.response.data.messages.some(
            (msg: any) => msg.message === "Token is expired" && msg.token_type === "access"
         );

      if (isAccessTokenExpired && !originalRequest._retry) {
         originalRequest._retry = true;

         try {
            if (!refreshTokenPromise) {
               refreshTokenPromise = useAuthStore
                  .getState()
                  .refreshAccessToken()
                  .then((accessToken) => accessToken)
                  .finally(() => {
                     refreshTokenPromise = null;
                  });
            }

            const newAccessToken = await refreshTokenPromise;

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
         } catch (refreshError) {
            const authStore = useAuthStore.getState();
            authStore.clientSideLogout();
            return Promise.reject(refreshError);
         }
      }

      return Promise.reject(error);
   }
);

export default api;
