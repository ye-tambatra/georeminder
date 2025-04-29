import ReminderForm, { ReminderFormValues } from "@/components/reminders/ReminderForm";
import { useNavigate, useParams } from "react-router";
import { getReminderById, TriggerType } from "@/services/reminders";
import useSWR from "swr";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { updateReminder as updateReminderService } from "@/services/reminders";
import useSWRMutation from "swr/mutation";
import { toast } from "sonner";

const fetcher = ([_, id]: [string, string]) => getReminderById(Number(id));

function updateReminder(_: string, { arg }: { arg: { id: number; reminder: ReminderFormValues } }) {
   const { id, reminder } = arg;
   return updateReminderService(id, {
      ...reminder,
      triggerType: reminder.triggerType as TriggerType,
   });
}

const UpdateReminder = () => {
   const { id } = useParams<{ id: string }>();
   const { data: reminder, isLoading, error } = useSWR(id ? ["api/users/reminders", id] : null, fetcher);
   const navigate = useNavigate();

   // SWR mutation for updating a reminder
   const { trigger, isMutating } = useSWRMutation("api/users/reminders", updateReminder, {
      onSuccess: () => {
         toast.success("Reminder updated successfully!");
         navigate(`/reminders/${id}`);
      },
      onError: () => {
         toast.error("Something went wrong, Please try again later.");
      },
   });

   const handleUpdateReminder = async (values: ReminderFormValues) => {
      await trigger({
         id: Number(id),
         reminder: values as ReminderFormValues,
      });
   };

   if (isLoading || !reminder) {
      return (
         <Card>
            <CardHeader>
               <CardTitle>Loading...</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="h-[300px] flex items-center justify-center">Loading reminder details...</div>
            </CardContent>
         </Card>
      );
   }

   if (error) {
      return <div>Error loading reminder: {error.message}</div>;
   }

   return (
      <>
         <ReminderForm submitButtonLoading={isMutating} initialValues={reminder} onSubmit={handleUpdateReminder} />
      </>
   );
};

export default UpdateReminder;
