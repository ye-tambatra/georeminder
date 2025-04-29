import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const ReminderItem = ({ reminder }: { reminder: any }) => {
   return (
      <Card key={reminder.id}>
         <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between">
               <h3 className="text-lg font-semibold text-foreground">{reminder.title}</h3>
               <span className="text-sm text-muted-foreground capitalize">
                  {reminder.triggerType === "enter" ? "On Enter" : "On Exit"}
               </span>
            </div>

            {reminder.description && <p className="text-sm text-muted-foreground">{reminder.description}</p>}

            {reminder.locationName && (
               <p className="text-sm text-muted-foreground">
                  Location: <span className="font-medium text-foreground">{reminder.locationName}</span>
               </p>
            )}

            <div className="pt-2">
               <Link to={`/reminders/${reminder.id}`}>
                  <Button variant="outline" size="sm" className="w-full cursor-pointer" type="button">
                     View Details
                  </Button>
               </Link>
            </div>
         </CardContent>
      </Card>
   );
};

export default ReminderItem;
