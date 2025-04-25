import { useEffect, useState } from "react";
import ReminderForm from "@/components/reminders/ReminderForm";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

const UpdateReminder = () => {
   const [reminder, setReminder] = useState<any | null>(null);

   useEffect(() => {
      // Simulate fetching reminder data (e.g., from API)
      const fetchedReminder = {
         id: "1",
         title: "Call Mom",
         description: "Call her when you get to the mall.",
         triggerType: "enter",
         locationLat: 40.7128,
         locationLng: -74.006,
      };
      setReminder(fetchedReminder);
   }, []);

   const handleUpdateReminder = (values: any) => {
      // Handle update logic here (e.g., make an API call)
      console.log("Updating reminder:", values);
   };

   if (!reminder) return <p>Loading...</p>;

   return (
      <>
         <ReminderForm initialValues={reminder} onSubmit={handleUpdateReminder} />
      </>
   );
};

export default UpdateReminder;
