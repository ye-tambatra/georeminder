import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@fontsource/inter";
import AppInitializer from "@/AppInitializer.tsx";
import { ThemeProvider } from "@/providers/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
   <AppInitializer>
      <ThemeProvider>
         <App />
      </ThemeProvider>
   </AppInitializer>
);
