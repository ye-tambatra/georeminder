import { Route, Routes } from "react-router";
import HomePage from "@/pages/Home";
import DashboardPage from "@/pages/Dashboard";
import CreateReminder from "@/pages/CreateReminder";
import UpdateReminder from "@/pages/UpdateReminder";
import CreateUpdateReminderLayout from "./layouts/CreateUpdateReminder";
import NotFound from "./pages/NotFound";
import RealTimeTracking from "./pages/RealTimeTracking";

function AppRoutes() {
   return (
      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/dashboard" element={<DashboardPage />} />
         <Route element={<CreateUpdateReminderLayout />}>
            <Route path="/reminders/create" element={<CreateReminder />} />
            <Route path="/reminders/:id/edit" element={<UpdateReminder />} />
         </Route>
         <Route path="/tracking" element={<RealTimeTracking />} />
         <Route path="*" element={<NotFound />} />
      </Routes>
   );
}

export default AppRoutes;
