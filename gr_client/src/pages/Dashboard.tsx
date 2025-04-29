import Map from "@/components/Map";
import EmptyReminders from "@/components/reminders/EmptyReminders";
import ReminderItem from "@/components/reminders/ReminderItem";
import { Button } from "@/components/ui/button";
import { getReminders } from "@/services/reminders";
import useAuthStore from "@/stores/auth";
import { Plus } from "lucide-react";
import { Link } from "react-router";
import useSWR from "swr";

const DashboardPage = () => {
   const user = useAuthStore((s) => s.user);
   const { data: reminders, isLoading } = useSWR("api/users/reminders", getReminders);

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
                  <div className="grid gap-4 sm:grid-cols-2">
                     {reminders.map((reminder) => (
                        <ReminderItem key={reminder.id} reminder={reminder} />
                     ))}
                  </div>
               )}
            </section>

            {/* Map section */}
            <section>
               <h2 className="mb-4 text-xl font-semibold tracking-tight">Your Locations</h2>
               <Map zoom={17} className="h-[400px]" />
            </section>
         </div>
      </div>
   );
};

export default DashboardPage;
