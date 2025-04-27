import useAuthStore from "@/stores/auth";
import { Navigate, Outlet } from "react-router";

const ProtectedRouteLayout = ({ allowAuthenticatedUser = true }: { allowAuthenticatedUser?: boolean }) => {
   const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

   if (!isAuthenticated && allowAuthenticatedUser) {
      return <Navigate to="/" />;
   }

   if (isAuthenticated && !allowAuthenticatedUser) {
      return <Navigate to={"/dashboard"} />;
   }

   return <>{<Outlet />}</>;
};

export default ProtectedRouteLayout;
