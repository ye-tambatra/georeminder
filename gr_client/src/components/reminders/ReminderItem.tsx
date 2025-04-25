import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
               <Button variant="outline" size="sm" className="w-full cursor-pointer">
                  View Details
               </Button>
            </div>
         </CardContent>
      </Card>
   );
};

export default ReminderItem;
