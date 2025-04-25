import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
   title: z.string().min(2, {
      message: "Reminder title must be at least 2 characters.",
   }),
   description: z.string().optional(),
   triggerType: z.enum(["enter", "exit"], {
      message: "Select whether to trigger on enter or exit.",
   }),
   // Coordinates for the location; in the future, this will be handled by the map pin
   locationLat: z.number().optional(),
   locationLng: z.number().optional(),
});

type ReminderFormValues = z.infer<typeof formSchema>;

const ReminderForm = ({
   initialValues,
   onSubmit,
}: {
   initialValues?: ReminderFormValues;
   onSubmit: (values: ReminderFormValues) => void;
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
            <div className="h-[300px] bg-gray-200 flex items-center justify-center">
               <p>Select location on map (Map integration goes here)</p>
            </div>

            {/* Submit Button */}
            <Button type="submit">Save Reminder</Button>
         </form>
      </Form>
   );
};

export default ReminderForm;
