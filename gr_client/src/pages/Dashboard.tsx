import Map from "@/components/Map";
import EmptyReminders from "@/components/reminders/EmptyReminders";
import ReminderItem from "@/components/reminders/ReminderItem";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/stores/auth";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const mockReminders: any[] = [
   {
      id: "1",
      title: "Call Mom",
      description: "Don't forget to check in with Mom once you reach the mall.",
      triggerType: "enter",
      locationName: "Central Mall",
   },
   {
      id: "2",
      title: "Buy Groceries",
      description: "Pick up milk, eggs, and bread when leaving the supermarket.",
      triggerType: "exit",
      locationName: "Greenfield Supermarket",
   },
   {
      id: "3",
      title: "Gym Reminder",
      description: "Quick workout if you're near the gym after 6 PM.",
      triggerType: "enter",
      locationName: "IronFit Gym",
   },
   {
      id: "4",
      title: "Send Work Email",
      description: "Email the team once you get home.",
      triggerType: "enter",
      locationName: "Home",
   },
];

const DashboardPage = () => {
   const [reminders, setReminders] = useState<any[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const user = useAuthStore((s) => s.user);

   if (isLoading) {
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
