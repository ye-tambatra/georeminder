import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Reminder } from "@/types/reminder";
import { truncateString } from "@/lib/utils";
import { formatRelativeTime, areDatesEqual } from "@/lib/date";

const ReminderListItem = ({ reminder }: { reminder: Reminder }) => {
   return (
      <div className="group flex items-center justify-between py-5 border-b hover:bg-secondary transition-colors duration-200 p-5">
         <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-foreground">{reminder.title}</h3>
            <p className="text-muted-foreground text-sm">{truncateString(reminder.locationName ?? "", 30)}</p>
            <p className="text-muted-foreground text-xs">Created {formatRelativeTime(reminder.createdAt ?? "")}</p>
            {reminder.updatedAt && !areDatesEqual(reminder.updatedAt, reminder.createdAt as string) && (
               <p className="text-muted-foreground text-xs">Updated {formatRelativeTime(reminder.updatedAt)}</p>
            )}
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
