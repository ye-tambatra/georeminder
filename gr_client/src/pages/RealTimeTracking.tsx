import Map from "@/components/Map";

const RealTimeTracking = () => {
   return (
      <div className="min-h-screen py-10 ">
         <div className="flex flex-col items-center justify-center space-y-4 p-6">
            <h1 className="text-3xl font-semibold text-muted-foreground mb-4">Real-Time Location Tracking</h1>
            <p className="text-lg text-gray-600">Live tracking of your location and nearby geofences.</p>
         </div>
         <div className="max-w-2xl w-full mx-auto bg-red-500">
            <Map className="h-[500px] w-full" />
         </div>
      </div>
   );
};

export default RealTimeTracking;
