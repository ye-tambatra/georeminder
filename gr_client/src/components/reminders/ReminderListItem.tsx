import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Reminder } from "@/services/reminders";
import { truncateString } from "@/lib/utils";

const ReminderListItem = ({ reminder }: { reminder: Reminder }) => {
   return (
      <div className="group flex items-center justify-between py-5 border-b hover:bg-secondary transition-colors duration-200 p-5">
         <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-foreground">{reminder.title}</h3>
            <p className="text-muted-foreground text-sm">{truncateString(reminder.locationName ?? "", 30)}</p>
         </div>
         <Link to={`/reminders/${reminder.id}`}>
            <Button variant="outline" size="sm">
               View
            </Button>
         </Link>
      </div>
   );
};

export default ReminderListItem;
