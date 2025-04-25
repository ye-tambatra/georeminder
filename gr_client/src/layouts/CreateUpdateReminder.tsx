import { ArrowLeft } from "lucide-react";
import { Link, Outlet } from "react-router";

const CreateUpdateReminderLayout = () => {
   return (
      <div className="max-w-2xl mx-auto px-6 py-10 my-10">
         <div className="mt-5 mb-10">
            <Link
               to="/dashboard"
               className="text-sm text-muted-foreground flex flex-row items-center inline-flex hover:text-primary">
               <ArrowLeft className="mr-3" />
               Go back
            </Link>
         </div>
         <Outlet />
      </div>
   );
};

export default CreateUpdateReminderLayout;
