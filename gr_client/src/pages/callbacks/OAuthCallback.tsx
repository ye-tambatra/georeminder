import useAuthStore from "@/stores/auth";
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";

const OAuthCallback = () => {
   const navigate = useNavigate();
   const [searchParams] = useSearchParams();
   const accessToken = searchParams.get("token");
   const loginWithAccessToken = useAuthStore((s) => s._loginWithAccessToken);

   useEffect(() => {
      if (accessToken) {
         loginWithAccessToken(accessToken);
         navigate("/dashboard");
      }
   }, [accessToken, loginWithAccessToken]);

   return <div>Authenticating...</div>;
};

export default OAuthCallback;
