import { useEffect, useState } from "react";
import ReminderForm from "@/components/reminders/ReminderForm";
import { useParams } from "react-router";
import { getReminderById } from "@/services/reminders";
import useSWR from "swr";
import { MarkerProps } from "@/components/Map";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Create a fetcher function for SWR
const fetcher = ([_, id]: [string, string]) => getReminderById(Number(id));

const UpdateReminder = () => {
   const { id } = useParams<{ id: string }>();
   const { data: reminder, isLoading, error } = useSWR(id ? ["api/users/reminders", id] : null, fetcher);

   const handleUpdateReminder = (values: any) => {
      // Handle update logic here (e.g., make an API call)
      console.log("Updating reminder:", values);
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
         <ReminderForm initialValues={reminder} onSubmit={handleUpdateReminder} />
      </>
   );
};

export default UpdateReminder;
