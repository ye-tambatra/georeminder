import Map, { MarkerProps } from "@/components/Map";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getReminderById } from "@/services/reminders";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useSWR from "swr";

const fetcher = ([_, id]: [string, number]) => {
   return getReminderById(id);
};

const ReminderDetails = () => {
   const { id } = useParams<{ id: string }>();
   const { data: reminder, isLoading } = useSWR(["api/users/reminders", id], fetcher);
   const [markers, setMarkers] = useState<MarkerProps[]>([]);
   const [center, setCenter] = useState<[number, number] | undefined>();

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
               <CardDescription>{reminder.description}</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
               <Map markers={markers} center={center} zoom={18} />
            </CardContent>
            <CardFooter>
               <div className="flex space-x-4">
                  <Link to={`/reminders/${reminder.id}/edit`}>
                     <Button className="px-5 cursor-pointer">Edit</Button>
                  </Link>
                  <Button variant={"outline"} className="cursor-pointer">
                     Delete
                  </Button>
               </div>
            </CardFooter>
         </Card>
      </>
   );
};

export default ReminderDetails;
