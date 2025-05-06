import { githubLogin, googleLogin } from "@/services/oauth";
import useAuthStore from "@/stores/auth";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

const OAuthCallback = () => {
   const [searchParams] = useSearchParams();
   const { state, code, error } = extractAuthParams(searchParams);
   const navigate = useNavigate();
   const updateAuthState = useAuthStore((s) => s.updateState);

   useEffect(() => {
      handleAuthentication({ state, code, error, navigate, updateAuthState });
   }, [searchParams]);

   return <div>Authenticating...</div>;
};

const extractAuthParams = (searchParams: URLSearchParams) => {
   return {
      state: searchParams.get("state"),
      code: searchParams.get("code"),
      error: searchParams.get("error"),
   };
};

type HandleAuthParams = {
   state: string | null;
   code: string | null;
   error: string | null;
   navigate: ReturnType<typeof useNavigate>;
   updateAuthState: (state: any) => void;
};

const handleAuthentication = async ({ state, code, error, navigate, updateAuthState }: HandleAuthParams) => {
   if (error) {
      navigate("/");
      return;
   }

   if (!code || !state) {
      return;
   }

   const authData = await fetchAuthData(state, code);
   if (!authData) return;

   const { access, user } = authData;
   const { pk: id, username, email, first_name: firstName, last_name: lastName } = user;

   updateAuthState({
      accessToken: access,
      isAuthenticated: true,
      user: { id, username, email, firstName, lastName },
   });
};

const fetchAuthData = async (state: string, code: string) => {
   switch (state) {
      case "github":
         return await githubLogin(code);
      case "google":
         return await googleLogin(code);
      default:
         return null;
   }
};

export default OAuthCallback;
