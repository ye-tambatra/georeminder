import { useEffect, useState } from "react";

const useUserLocation = () => {
   const [location, setLocation] = useState<[number, number] | undefined>();
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const handleSuccess = (position: GeolocationPosition) => {
         const { latitude, longitude } = position.coords;
         setLocation([latitude, longitude]);
         setError(null);
      };

      const handleError = (error: GeolocationPositionError) => {
         setError(error.message);
      };

      if (navigator.geolocation) {
         navigator.geolocation.watchPosition(handleSuccess, handleError);
      } else {
         const errorMessage = "Geolocation is not supported by this browser.";
         setError(errorMessage);
      }

      return () => {
         // Cleanup
      };
   }, []);

   return { location, error };
};

export { useUserLocation };
