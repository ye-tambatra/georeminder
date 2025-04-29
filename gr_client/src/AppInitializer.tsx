import { useState, useEffect } from "react";
import useAuthStore from "@/stores/auth";

type Props = {
   children: React.ReactNode;
};

const AppInitializer = ({ children }: Props) => {
   const [isReady, setIsReady] = useState(false);
   const refreshAccessToken = useAuthStore((s) => s.refreshAccessToken);

   useEffect(() => {
      async function initializeApp() {
         try {
            await refreshAccessToken();
         } finally {
            setIsReady(true);
         }
      }
      initializeApp();
   }, []);

   if (!isReady) {
      return <></>;
   }

   return <>{children}</>;
};

export default AppInitializer;
