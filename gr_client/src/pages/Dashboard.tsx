import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Plus } from "lucide-react";
import { useEffect, useState } from "react";

const mockUser = {
   name: "Alex Johnson",
   email: "alex@example.com",
};

const mockReminders: any[] = [];

const DashboardPage = () => {
   const [user, setUser] = useState<{ name: string; email: string } | null>(null);
   const [reminders, setReminders] = useState<any[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      setTimeout(() => {
         setUser(mockUser);
         setReminders(mockReminders);
         setIsLoading(false);
      }, 3000);
   }, []);

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
      <div className="container px-4 lg:mx-auto max-w-4xl py-10">
         <div className="space-y-6 py-10">
            {/* Header with greeting */}
            <header className="flex flex-col md:flex-row  items-center justify-between">
               <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold tracking-tight">Hello, {user?.name || user?.email || "there"}</h1>
                  <p className="text-muted-foreground">Welcome to your GeoReminder dashboard</p>
               </div>
               <Button className="gap-2 cursor-pointer w-full md:w-auto my-5">
                  <Plus className="h-4 w-4" />
                  Create New Reminder
               </Button>
            </header>

            {/* Reminders section */}
            <section>
               <h2 className="mb-4 text-xl font-semibold tracking-tight">Your Reminders</h2>

               {reminders.length === 0 ? (
                  <Card className="border bg-card text-card-foreground">
                     <CardHeader className="flex flex-row items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                           <MapPin className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                           <CardTitle>No reminders yet</CardTitle>
                           <CardDescription>Start by creating your first location-based reminder</CardDescription>
                        </div>
                     </CardHeader>
                     <CardFooter>
                        <Button className="gap-2 cursor-pointer">
                           <Plus className="h-4 w-4" />
                           Create New Reminder
                        </Button>
                     </CardFooter>
                  </Card>
               ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                     {reminders.map((reminder) => (
                        <Card key={reminder.id}>
                           <CardContent>{/* Reminder content will go here */}</CardContent>
                        </Card>
                     ))}
                  </div>
               )}
            </section>

            {/* Map section */}
            <section>
               <h2 className="mb-4 text-xl font-semibold tracking-tight">Your Locations</h2>
               <Card className="overflow-hidden border bg-card text-card-foreground">
                  <CardContent className="p-0">
                     <div
                        className="h-[400px] w-full bg-muted/20"
                        style={{
                           backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='currentColor' fillOpacity='0.1' fillRule='evenodd'/%3E%3C/svg%3E")`,
                           backgroundPosition: "center",
                        }}
                        aria-label="Map placeholder - will be replaced with an interactive map">
                        <div className="flex h-full items-center justify-center">
                           <p className="text-muted-foreground">Map will be displayed here</p>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </section>
         </div>
      </div>
   );
};

export default DashboardPage;
