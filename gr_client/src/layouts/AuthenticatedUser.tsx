import Header from "@/components/Header";
import { Outlet } from "react-router";

const AuthenticatedUserLayout = () => {
   return (
      <>
         <Header />
         <Outlet />
      </>
   );
};

export default AuthenticatedUserLayout;
