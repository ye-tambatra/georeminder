import { Loader, LogOutIcon, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import useAuthStore from "@/stores/auth";
import { toast } from "sonner";

const Header = () => {
   const [loading, setLoading] = useState(false);
   const logout = useAuthStore((s) => s.logout);
   const naviate = useNavigate();

   const handleLogoutClick = async () => {
      setLoading(true);
      try {
         await logout();
         toast.success("Successfully logged out!");
         naviate("/");
      } catch {
         toast.error("Error logging out. Please try again.");
      } finally {
         setLoading(false);
      }
   };

   return (
      <header className="px-4 py-5 border-b">
         <div className="flex items-center justify-between container mx-auto">
            <Link to={"/dashboard"} className="text-3xl font-semibold tracking-tight flex items-center">
               <MapPin className="mr-2 h-6 w-6 text-primary" />
               GeoReminder
            </Link>
            <div className="flex items-center gap-4">
               <Button
                  variant="outline"
                  className="cursor-pointer"
                  type="button"
                  onClick={handleLogoutClick}
                  disabled={loading}>
                  {loading ? (
                     <>
                        <Loader />
                        Logging out...
                     </>
                  ) : (
                     <>
                        <LogOutIcon />
                        Logout
                     </>
                  )}
               </Button>
            </div>
         </div>
      </header>
   );
};

export default Header;
