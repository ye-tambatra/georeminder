import { githubLogin, googleLogin } from "@/services/oauth";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

const OAuthCallback = () => {
   const [searchParams] = useSearchParams();
   const state = searchParams.get("state");
   const code = searchParams.get("code");

   useEffect(() => {
      const requestTokens = async () => {
         if (!code || !state) {
            return;
         }

         if (state === "github") {
            const data = await githubLogin(code);
            console.log({
               data,
            });
            return;
         }

         if (state === "google") {
            const data = await googleLogin(code);
            console.log({
               data,
            });
            return;
         }
      };

      requestTokens();
   }, [searchParams]);

   return <div>Authenticating...</div>;
};

export default OAuthCallback;
