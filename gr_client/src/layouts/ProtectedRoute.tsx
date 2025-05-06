import useAuthStore from "@/stores/auth";
import { Navigate, Outlet } from "react-router";

const ProtectedRouteLayout = ({ allowAuthenticatedUser = true }: { allowAuthenticatedUser?: boolean }) => {
   const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

   // Default behavior: block unauthenticated users when allowAuthenticatedUser=true
   if (!isAuthenticated && allowAuthenticatedUser) {
      return <Navigate to="/" replace />;
   }

   // Handle routes that should be blocked for authenticated users
   if (isAuthenticated && !allowAuthenticatedUser) {
      return <Navigate to="/dashboard" replace />;
   }

   return <Outlet />;
};

export default ProtectedRouteLayout;
