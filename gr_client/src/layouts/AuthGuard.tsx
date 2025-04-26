import useAuthStore from "@/stores/auth";
import { Navigate, Outlet } from "react-router";

const AuthGuardLayout = () => {
   const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

   if (!isAuthenticated) {
      return <Navigate to="/" />;
   }

   return <>{<Outlet />}</>;
};

export default AuthGuardLayout;
