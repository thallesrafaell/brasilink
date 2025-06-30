import { Trash } from "lucide-react";
import { toast } from "sonner";

import deleteService from "@/actions/services/deleteService";
import { DeleteServiceSchema } from "@/actions/services/schemas";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function DeleteServiceButton(data: DeleteServiceSchema) {
  const handleDeleteService = async () => {
    try {
      await deleteService(data);
      toast.success("Service deleted successfully!");
    } catch (error) {
      toast.error(
        `Error deleting service: ${error instanceof Error ? error.message : "Unknown error"}`
      );
      console.error("Error deleting service:", error);
      throw new Error("Error deleting service");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="gap-2 text-red-500 hover:bg-red-800"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            service.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600 dark:text-white"
            onClick={handleDeleteService}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
