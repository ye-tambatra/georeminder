import EmptyReminders from "@/components/reminders/EmptyReminders";
import ReminderItem from "@/components/reminders/ReminderItem";
import { Button } from "@/components/ui/button";
import { Reminder } from "@/services/reminders";
import { useState } from "react";

const REMINDERS_PER_LOAD = 6;

const RemindersGridView = ({ reminders }: { reminders: Reminder[] }) => {
   const [visibleCount, setVisibleCount] = useState(REMINDERS_PER_LOAD);

   const handleShowMore = () => {
      setVisibleCount((prev) => prev + REMINDERS_PER_LOAD);
   };
   const visibleReminders = reminders.slice(0, visibleCount);
   const hasMoreReminders = visibleCount < reminders.length;

   return (
      <section>
         <h2 className="mb-4 text-xl font-semibold tracking-tight">Your Reminders</h2>
         {reminders.length === 0 ? (
            <EmptyReminders />
         ) : (
            <div className="space-y-4">
               <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
                  {visibleReminders.map((reminder) => (
                     <div key={reminder.id} className="break-inside-avoid mb-4">
                        <ReminderItem reminder={reminder} />
                     </div>
                  ))}
               </div>
               {hasMoreReminders && (
                  <div className="flex justify-center mt-6">
                     <Button variant="secondary" type="button" className="cursor-pointer" onClick={handleShowMore}>
                        Show More
                     </Button>
                  </div>
               )}
            </div>
         )}
      </section>
   );
};

export default RemindersGridView;
