import { Route, Routes } from "react-router";
import HomePage from "@/pages/Home";
import DashboardPage from "@/pages/Dashboard";

function AppRoutes() {
   return (
      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
   );
}

export default AppRoutes;
