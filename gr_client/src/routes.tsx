import { Route, Routes } from "react-router";
import HomePage from "@/pages/Home";
import DashboardPage from "@/pages/Dashboard";
import CreateReminder from "@/pages/CreateReminder";
import UpdateReminder from "@/pages/UpdateReminder";
import CreateUpdateReminderLayout from "./layouts/CreateUpdateReminder";
import NotFound from "./pages/NotFound";
import RealTimeTracking from "./pages/RealTimeTracking";
import OAuthCallback from "./pages/callbacks/OAuthCallback";
import ProtectedRouteLayout from "./layouts/ProtectedRoute";
import AuthenticatedUserLayout from "./layouts/AuthenticatedUser";
import ReminderDetails from "./pages/ReminderDetails";

const AppRoutes = () => {
   return (
      <Routes>
         <Route element={<ProtectedRouteLayout allowAuthenticatedUser={false} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/oauth/callback" element={<OAuthCallback />} />
         </Route>

         <Route element={<ProtectedRouteLayout />}>
            <Route element={<AuthenticatedUserLayout />}>
               <Route path="/dashboard" element={<DashboardPage />} />
               <Route element={<CreateUpdateReminderLayout />}>
                  <Route path="/reminders/create" element={<CreateReminder />} />
                  <Route path="/reminders/:id" element={<ReminderDetails />} />
                  <Route path="/reminders/:id/edit" element={<UpdateReminder />} />
               </Route>
               <Route path="/tracking" element={<RealTimeTracking />} />
            </Route>
         </Route>

         <Route path="*" element={<NotFound />} />
      </Routes>
   );
};

export default AppRoutes;
