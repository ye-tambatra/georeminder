import Map from "@/components/Map";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Reminder } from "@/services/reminders";
import EmptyReminders from "./EmptyReminders";
import { useState } from "react";
import ReminderListItem from "./ReminderListItem";

const RemindersSplitView = ({ reminders }: { reminders: Reminder[] }) => {
   const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
   const handleReminderClick = (lat: number, lng: number) => {
      setSelectedLocation([lat, lng]);
   };

   return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
         {/* Map on the left - taking up 3/5 of the space on medium screens and up */}
         <div className="md:col-span-3 max-h-[500px]">
            <Map
               zoom={selectedLocation ? 16 : 13} // Zoom higher when a location is selected
               center={selectedLocation || undefined}
               className="h-full w-full"
               markers={reminders.map((reminder) => ({
                  position: [reminder.locationLat, reminder.locationLng],
                  popupText: reminder.title,
               }))}
            />
         </div>

         {/* Scrollable reminders list on the right - taking up 2/5 of the space on medium screens and up */}
         <ScrollArea className="md:col-span-2 h-[500px] border rounded-md p-4">
            <div className="pr-4">
               {reminders.length === 0 ? (
                  <EmptyReminders />
               ) : (
                  reminders.map((reminder) => (
                     <div
                        key={reminder.id}
                        onClick={() => handleReminderClick(reminder.locationLat, reminder.locationLng)}
                        className="cursor-pointer">
                        <ReminderListItem reminder={reminder} />
                     </div>
                  ))
               )}
            </div>
         </ScrollArea>
      </div>
   );
};

export default RemindersSplitView;
