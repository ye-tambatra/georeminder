import ReminderForm from "@/components/reminders/ReminderForm";

const CreateReminder = () => {
   const handleCreateReminder = (values: any) => {
      // Handle creation logic here (e.g., make an API call)
      console.log("Creating reminder:", values);
   };

   return (
      <>
         <h2 className="text-2xl font-semibold mb-4">Create New Reminder</h2>
         <ReminderForm onSubmit={handleCreateReminder} />
      </>
   );
};

export default CreateReminder;
