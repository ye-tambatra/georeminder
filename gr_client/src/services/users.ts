import axios from "@/lib/axios";
import manualAxios from "axios";

export interface FetchUserResponse {
   id: number;
   email: string;
   first_name: string;
   last_name: string;
}

export const fetchCurrentUser = async () => {
   const response = await axios.get<FetchUserResponse>("/social/me");
   const { email, first_name: firstName, id, last_name: lastName } = response.data;
   return {
      email,
      id,
      firstName,
      lastName,
   };
};

export const fetchUserWithToken = async (token: string) => {
   const response = await manualAxios.get<FetchUserResponse>("/social/me", {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   const { email, first_name: firstName, id, last_name: lastName } = response.data;
   return {
      email,
      id,
      firstName,
      lastName,
   };
};
