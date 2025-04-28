import { useState, useEffect } from "react";
import useAuthStore from "./stores/auth";

type Props = {
   children: React.ReactNode;
};

const AppInitializer = ({ children }: Props) => {
   const [isReady, setIsReady] = useState(false);
   const refreshToken = useAuthStore((s) => s.refreshToken);

   useEffect(() => {
      async function initializeApp() {
         await refreshToken();
         setIsReady(true);
      }
      initializeApp();
   }, []);

   if (!isReady) {
      return <></>;
   }

   return <>{children}</>;
};

export default AppInitializer;
