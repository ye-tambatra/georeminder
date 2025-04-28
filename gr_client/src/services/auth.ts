import axios from "@/lib/axios";

interface UserResponse {
   id: number;
   email: string;
   firstName: string;
   lastName: string;
}

interface RefreshTokenResponse {
   access_token: string;
   user: UserResponse;
}

export const logout = async () => {
   await axios.post("social/logout/");
};

export const refreshToken = async (): Promise<{ accessToken: string; user: UserResponse }> => {
   const { data } = await axios.post<RefreshTokenResponse>("social/token/refresh/");
   const { access_token, user } = data;

   return {
      accessToken: access_token,
      user: {
         id: user.id,
         email: user.email,
         firstName: user.firstName,
         lastName: user.lastName,
      },
   };
};
