import { githubLogin, googleLogin } from "@/services/oauth";
import useAuthStore from "@/stores/auth";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

const OAuthCallback = () => {
   const [searchParams] = useSearchParams();
   const state = searchParams.get("state");
   const code = searchParams.get("code");
   const updateAuthState = useAuthStore((s) => s.updateState);

   useEffect(() => {
      const requestToken = async () => {
         if (!code || !state) {
            return;
         }

         let data;
         if (state === "github") {
            data = await githubLogin(code);
         } else if (state === "google") {
            data = await googleLogin(code);
         }

         if (!data) {
            return;
         }

         const {
            access,
            user: { pk: id, username, email, first_name: firstName, last_name: lastName },
         } = data;

         updateAuthState({
            accessToken: access,
            isAuthenticated: true,
            user: {
               id,
               username,
               email,
               firstName,
               lastName,
            },
         });
         return;
      };

      requestToken();
   }, [searchParams]);

   return <div>Authenticating...</div>;
};

export default OAuthCallback;
