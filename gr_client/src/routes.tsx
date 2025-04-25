import { Route, Routes } from "react-router";
import HomePage from "@/pages/HomePage";

function AppRoutes() {
   return (
      <Routes>
         <Route path="/" element={<HomePage />} />
      </Routes>
   );
}

export default AppRoutes;
