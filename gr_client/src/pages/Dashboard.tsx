import Map, { MarkerProps } from "@/components/Map";
import EmptyReminders from "@/components/reminders/EmptyReminders";
import ReminderItem from "@/components/reminders/ReminderItem";
import { Button } from "@/components/ui/button";
import { getReminders } from "@/services/reminders";
import useAuthStore from "@/stores/auth";
import { Plus } from "lucide-react";
import { Link } from "react-router";
import useSWR from "swr";
import { useState } from "react";

const REMINDERS_PER_LOAD = 6;

const DashboardPage = () => {
   const user = useAuthStore((s) => s.user);
   const { data: reminders, isLoading } = useSWR("api/users/reminders", getReminders);
   const [visibleCount, setVisibleCount] = useState(REMINDERS_PER_LOAD);
   const markers: MarkerProps[] =
      reminders?.map((reminder) => ({
         position: [reminder.locationLat, reminder.locationLng],
         popupText: reminder.title,
      })) ?? [];

   const handleShowMore = () => {
      setVisibleCount((prev) => prev + REMINDERS_PER_LOAD);
   };

   if (isLoading || !reminders) {
      return (
         <div className="container mx-auto max-w-4xl px-4 py-10">
            <div className="space-y-6 py-10">
               <div className="h-8 w-48 animate-pulse rounded-md bg-muted"></div>
               <div className="h-64 animate-pulse rounded-md bg-muted"></div>
               <div className="h-[400px] animate-pulse rounded-md bg-muted"></div>
            </div>
         </div>
      );
   }

   const visibleReminders = reminders.slice(0, visibleCount);
   const hasMoreReminders = visibleCount < reminders.length;

   return (
      <div className="container px-4 md:mx-auto max-w-4xl py-10">
         <div className="space-y-6 py-4">
            {/* Header with greeting */}
            <header className="flex flex-col md:flex-row  items-center justify-between">
               <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold tracking-tight">
                     Hello, {`${user?.firstName || ""} ${user?.lastName || ""}`.trim() || user?.email || "there"}
                  </h1>
                  <p className="text-muted-foreground">Welcome to your GeoReminder dashboard</p>
               </div>
               <Link to={"/reminders/create"}>
                  <Button className="gap-2 cursor-pointer w-full md:w-auto my-5" type="button">
                     <Plus className="h-4 w-4" />
                     Create New Reminder
                  </Button>
               </Link>
            </header>

            {/* Reminders section */}
            <section>
               <h2 className="mb-4 text-xl font-semibold tracking-tight">Your Reminders</h2>

               {reminders.length === 0 ? (
                  <EmptyReminders />
               ) : (
                  <div className="space-y-4">
                     <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
                        {visibleReminders.map((reminder) => (
                           <div key={reminder.id} className="break-inside-avoid mb-4">
                              <ReminderItem reminder={reminder} />
                           </div>
                        ))}
                     </div>
                     {hasMoreReminders && (
                        <div className="flex justify-center mt-6">
                           <Button
                              variant="secondary"
                              type="button"
                              className="cursor-pointer"
                              onClick={handleShowMore}>
                              Show More
                           </Button>
                        </div>
                     )}
                  </div>
               )}
            </section>

            {/* Map section */}
            <section>
               <h2 className="mb-4 text-xl font-semibold tracking-tight">All locations from your reminders</h2>
               <Map zoom={13} className="h-[400px]" markers={markers} />
            </section>
         </div>
      </div>
   );
};

export default DashboardPage;
