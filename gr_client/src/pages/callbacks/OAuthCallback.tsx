import { fetchUserWithToken } from "@/services/users";
import useAuthStore from "@/stores/auth";
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";

const OAuthCallback = () => {
   const navigate = useNavigate();
   const [searchParams] = useSearchParams();
   const accessToken = searchParams.get("token");
   const updateState = useAuthStore((s) => s.updateState);

   useEffect(() => {
      const authenticateUser = async () => {
         if (accessToken) {
            try {
               const user = await fetchUserWithToken(accessToken);
               updateState({
                  accessToken: accessToken,
                  isAuthenticated: true,
                  user: user,
               });
               navigate("/dashboard");
            } catch {
               navigate("/");
            }
         }
      };

      authenticateUser();
   }, [searchParams, updateState, navigate]);

   return <div>Authenticating...</div>;
};

export default OAuthCallback;
