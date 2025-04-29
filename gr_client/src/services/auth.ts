import axios from "@/lib/axios";

export const logout = async () => {
   await axios.post("api/auth/logout/");
};

export const refreshAccessToken = async (): Promise<string> => {
   const response = await axios.post<{ access: string }>("api/auth/token/refresh/");
   return response.data.access;
};

export const getMe = async () => {
   const response = await axios.get<{
      id: number;
      username: string;
      first_name: string;
      last_name: string;
      email: string;
   }>("api/auth/me");
   const { id, username, first_name: firstName, last_name: lastName, email } = response.data;

   return {
      id,
      username,
      firstName,
      lastName,
      email,
   };
};
