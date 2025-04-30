import { Button } from "@/components/ui/button";
import { getReminders } from "@/services/reminders";
import useAuthStore from "@/stores/auth";
import { Plus } from "lucide-react";
import { Link } from "react-router";
import useSWR from "swr";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RemindersGridView from "@/components/reminders/RemindersGridView";
import RemindersSplitView from "@/components/reminders/RemindersSplitView";

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
      <div className="container px-4 md:mx-auto py-10">
         <div className="space-y-6 py-4">
            <header className="flex flex-col md:flex-row items-center justify-between">
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

            <Tabs defaultValue="split" className="w-full">
               <TabsList>
                  <TabsTrigger value="split">Split View</TabsTrigger>
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
               </TabsList>
               <TabsContent value="split">
                  <RemindersSplitView reminders={reminders} />
               </TabsContent>
               <TabsContent value="grid" className="space-y-6">
                  <RemindersGridView reminders={reminders} />
               </TabsContent>
            </Tabs>
         </div>
      </div>
   );
};

export default DashboardPage;
