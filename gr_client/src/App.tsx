import { BrowserRouter } from "react-router";
import AppRoutes from "@/routes";
import { Toaster } from "@/components/ui/sonner";

function App() {
   return (
      <BrowserRouter>
         <Toaster />
         <AppRoutes />
      </BrowserRouter>
   );
}

export default App;
