import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Map from "../Map";
import { Loader } from "lucide-react";
import { useState } from "react";
import { MarkerProps } from "@/components/Map";

const formSchema = z.object({
   title: z.string().min(2, {
      message: "Reminder title must be at least 2 characters.",
   }),
   description: z.string().optional(),
   triggerType: z.enum(["enter", "exit"], {
      message: "Select whether to trigger on enter or exit.",
   }),
   locationLat: z.number(),
   locationLng: z.number(),
});

export type ReminderFormValues = z.infer<typeof formSchema>;

const ReminderForm = ({
   initialValues,
   onSubmit,
   submitButtonLoading = false,
}: {
   initialValues?: ReminderFormValues;
   onSubmit: (values: ReminderFormValues) => void;
   submitButtonLoading?: boolean;
}) => {
   const form = useForm<ReminderFormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: initialValues ?? {
         title: "",
         description: "",
         triggerType: "enter",
         locationLat: undefined,
         locationLng: undefined,
      },
   });
   const [markers, setMarkers] = useState<MarkerProps[]>([]);

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Title Field */}
            <FormField
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Title</FormLabel>
                     <FormControl>
                        <Input placeholder="Enter reminder title" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
               control={form.control}
               name="title"
            />

            {/* Description Field */}
            <FormField
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Description</FormLabel>
                     <FormControl>
                        <Input placeholder="Optional description" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
               control={form.control}
               name="description"
            />

            {/* Trigger Type (Enter/Exit) */}
            <FormField
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Trigger Type</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                           <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a verified email to display" />
                           </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           <SelectItem value="exit">On Exit</SelectItem>
                           <SelectItem value="enter">On Enter</SelectItem>
                        </SelectContent>
                     </Select>
                     <FormMessage />
                  </FormItem>
               )}
               control={form.control}
               name="triggerType"
            />

            {/* Map Placeholder */}
            <div>
               <p className="mb-2">Select location on map</p>
               <div className="h-[300px] flex items-center justify-center">
                  <Map
                     markers={markers}
                     onClick={({ lat, lng }) => {
                        form.setValue("locationLat", lat);
                        form.setValue("locationLng", lng);
                        form.trigger(["locationLat", "locationLng"]); // Re-run validation after setting the values

                        setMarkers([
                           {
                              position: [lat, lng],
                           },
                        ]);
                     }}
                  />
               </div>
               {form.formState.errors.locationLat || form.formState.errors.locationLng ? (
                  <p className="text-destructive mt-2">Please select a position on the map.</p>
               ) : null}
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={submitButtonLoading} className="cursor-pointer">
               {submitButtonLoading ? (
                  <>
                     <Loader />
                     Saving...
                  </>
               ) : (
                  <>Save Reminder</>
               )}
            </Button>
         </form>
      </Form>
   );
};

export default ReminderForm;
