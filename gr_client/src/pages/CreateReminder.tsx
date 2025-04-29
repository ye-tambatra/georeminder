import ReminderForm, { ReminderFormValues } from "@/components/reminders/ReminderForm";
import { createReminder as createReminderService, TriggerType } from "@/services/reminders";
import useSWRMutation from "swr/mutation";
import { toast } from "sonner";
import { useNavigate } from "react-router";

async function createReminder(_: string, { arg }: { arg: Required<ReminderFormValues> }) {
   return createReminderService({
      description: arg.description,
      locationLat: arg.locationLat,
      locationLng: arg.locationLng,
      title: arg.title,
      triggerType: arg.triggerType as TriggerType,
   });
}

const CreateReminder = () => {
   const navigate = useNavigate();

   // SWR mutation for creating a reminder
   const { trigger, isMutating } = useSWRMutation("api/users/reminders", createReminder, {
      onSuccess: () => {
         toast.success("Reminder created successfully!");
         navigate("/dashboard");
      },
      onError: () => {
         toast.error("Something went wrong, Please try again later.");
      },
   });

   const handleCreateReminder = async (values: ReminderFormValues) => {
      await trigger(values as Required<ReminderFormValues>);
   };

   return (
      <>
         <h2 className="text-2xl font-semibold mb-4">Create New Reminder</h2>
         <ReminderForm onSubmit={handleCreateReminder} submitButtonLoading={isMutating} />
      </>
   );
};

export default CreateReminder;
