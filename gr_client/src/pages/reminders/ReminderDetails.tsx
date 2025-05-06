import Map, { MarkerProps } from "@/components/Map";
import DeleteReminderDialog from "@/components/reminders/DeleteReminderDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteReminder, getReminderById } from "@/services/reminders";
import { formatDateTime, formatRelativeTime } from "@/lib/date";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import useSWR from "swr";

const fetcher = ([_, id]: [string, number]) => {
   return getReminderById(id);
};

const ReminderDetails = () => {
   const { id } = useParams<{ id: string }>();
   const { data: reminder, isLoading } = useSWR(["api/users/reminders", id], fetcher);
   const [markers, setMarkers] = useState<MarkerProps[]>([]);
   const [center, setCenter] = useState<[number, number] | undefined>();
   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
   const navigate = useNavigate();

   const handleDelete = async () => {
      if (id) {
         await deleteReminder(Number(id));
         navigate("/dashboard");
      }
   };

   useEffect(() => {
      if (reminder) {
         setCenter([reminder.locationLat, reminder.locationLng]);
         setMarkers([
            {
               position: [reminder.locationLat, reminder.locationLng],
            },
         ]);
      }
   }, [reminder]);

   if (isLoading || !reminder) {
      return <>Loading...</>;
   }

   return (
      <>
         <Card>
            <CardHeader>
               <CardTitle>
                  <h1 className="text-2xl">{reminder.title}</h1>
               </CardTitle>
               <CardDescription>
                  <p>{reminder.description}</p>
                  <p className="mt-3">
                     <span className="font-semibold">Location:</span> {reminder.locationName}
                  </p>
                  <p className="mt-3">
                     <span className="font-semibold">Created:</span> {formatDateTime(reminder.createdAt ?? "")}
                     <span className="text-sm text-muted-foreground ml-2">
                        ({formatRelativeTime(reminder.createdAt ?? "")})
                     </span>
                  </p>
                  {reminder.updatedAt && (
                     <p className="mt-1">
                        <span className="font-semibold">Updated:</span> {formatDateTime(reminder.updatedAt)}
                        <span className="text-sm text-muted-foreground ml-2">
                           ({formatRelativeTime(reminder.updatedAt)})
                        </span>
                     </p>
                  )}
               </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
               <Map markers={markers} center={center} zoom={18} />
            </CardContent>
            <CardFooter>
               <div className="flex space-x-4">
                  <Link to={`/reminders/${reminder.id}/edit`}>
                     <Button className="px-5 cursor-pointer">Edit</Button>
                  </Link>
                  <Button variant="outline" className="cursor-pointer" onClick={() => setIsDeleteDialogOpen(true)}>
                     Delete
                  </Button>
               </div>
            </CardFooter>
         </Card>

         <DeleteReminderDialog
            isOpen={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            onConfirm={handleDelete}
            reminderTitle={reminder.title}
         />
      </>
   );
};

export default ReminderDetails;
