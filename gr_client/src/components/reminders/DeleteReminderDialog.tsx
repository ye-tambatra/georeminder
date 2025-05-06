import { useState } from "react";
import {
   AlertDialog,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface DeleteReminderDialogProps {
   isOpen: boolean;
   onOpenChange: (open: boolean) => void;
   onConfirm: () => Promise<void>;
   reminderTitle: string;
}

const DeleteReminderDialog = ({ isOpen, onOpenChange, onConfirm, reminderTitle }: DeleteReminderDialogProps) => {
   const [isDeleting, setIsDeleting] = useState(false);

   const handleConfirm = async () => {
      setIsDeleting(true);
      try {
         await onConfirm();
      } finally {
         setIsDeleting(false);
         onOpenChange(false);
      }
   };

   return (
      <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Are you sure you want to delete this reminder?</AlertDialogTitle>
               <AlertDialogDescription>
                  This will permanently delete the reminder "{reminderTitle}". This action cannot be undone.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel disabled={isDeleting} className="cursor-pointer">
                  Cancel
               </AlertDialogCancel>
               <Button
                  variant="destructive"
                  type="button"
                  className="cursor-pointer"
                  onClick={handleConfirm}
                  disabled={isDeleting}>
                  {isDeleting ? (
                     <>
                        <Spinner />
                        Deleting...
                     </>
                  ) : (
                     "Delete"
                  )}
               </Button>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};

export default DeleteReminderDialog;
