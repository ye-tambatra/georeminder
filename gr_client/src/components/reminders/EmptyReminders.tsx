import { Card, CardHeader, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Plus } from "lucide-react";
import { Link } from "react-router";

const EmptyReminders = () => {
   return (
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
            <Link to={"/reminders/create"}>
               <Button className="gap-2 cursor-pointer" type="button">
                  <Plus className="h-4 w-4" />
                  Create New Reminder
               </Button>
            </Link>
         </CardFooter>
      </Card>
   );
};

export default EmptyReminders;
