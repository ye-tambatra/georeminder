import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useTheme } from "@/providers/ThemeProvider";
import { formatRelativeTime } from "@/lib/date";
import { Reminder } from "@/services/reminders";

const LIGHT_COLORS = ["#FFE8A4", "#D0E89D", "#94E6C2", "#92DCE5", "#A3B18A"];
const DARK_COLORS = ["#3B3B3B", "#4F4F4F", "#616161", "#757575", "#8D8D8D"];

const ReminderItem = ({ reminder }: { reminder: Reminder }) => {
   const { theme } = useTheme();
   const isDarkMode = theme === "dark";

   const colors = isDarkMode ? DARK_COLORS : LIGHT_COLORS;
   const randomColor = colors[Math.floor(Math.random() * colors.length)];
   const textColorClass = isDarkMode ? "text-gray-100" : "text-foreground";
   const mutedTextColorClass = isDarkMode ? "text-gray-300" : "text-muted-foreground";

   return (
      <Card
         className="rounded-sm p-5"
         key={reminder.id}
         style={{ backgroundColor: randomColor, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
         <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between">
               <h3 className={`text-lg font-semibold ${textColorClass}`}>{reminder.title}</h3>
               <span className={`text-sm ${mutedTextColorClass} capitalize`}>
                  {reminder.triggerType === "enter" ? "On Enter" : "On Exit"}
               </span>
            </div>

            {reminder.description && <p className={`text-sm ${mutedTextColorClass}`}>{reminder.description}</p>}

            {reminder.locationName && (
               <p className={`text-sm ${mutedTextColorClass}`}>
                  Location: <span className={`font-medium ${textColorClass}`}>{reminder.locationName}</span>
               </p>
            )}

            <p className={`text-sm ${mutedTextColorClass}`}>Created {formatRelativeTime(reminder.createdAt ?? "")}</p>
            {reminder.updatedAt && (
               <p className={`text-sm ${mutedTextColorClass}`}>Updated {formatRelativeTime(reminder.updatedAt)}</p>
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
