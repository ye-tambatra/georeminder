import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const NotFound = () => {
   const navigate = useNavigate();

   const handleRedirectHome = () => {
      navigate("/");
   };

   return (
      <div className="flex items-center justify-center min-h-screen">
         <div className="text-center">
            <h1 className="text-4xl font-semibold text-primary mb-4">404</h1>
            <p className="text-lg text-muted-foreground mb-6">Oops! The page you are looking for doesn't exist.</p>
            <Button onClick={handleRedirectHome} variant="outline" className="cursor-pointer">
               Go Back to Home
            </Button>
         </div>
      </div>
   );
};

export default NotFound;
