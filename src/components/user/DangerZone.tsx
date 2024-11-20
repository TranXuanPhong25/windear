
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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useDeleteUser } from "@/hooks/user/useDeleteUser";
import { Trash2 } from "lucide-react"

export default function DangerZone() {
   const { mutate: deleteUser, isPending } = useDeleteUser();
   return (

      <div className="rounded-lg bg-red-500/25 p-6 !mt-32">
         <h2 className="mb-4 text-lg font-semibold text-destructive">Danger Zone</h2>
         <div className="flex items-center justify-between">
            <div className="space-y-1">
               <h3 className="font-medium text-destructive">Delete this Account {isPending ? "..." : ""}</h3>
               <p className="text-sm text-muted-foreground">
                  Once you delete your account, there is no going back. Please be certain.
               </p>
            </div>
            <AlertDialog>
               <AlertDialogTrigger asChild>
                  <Button variant="ghost" className="bg-red-500 hover:!bg-white hover:!text-red-500 text-white">Delete<Trash2 className="size-5 ml-1" /></Button>
               </AlertDialogTrigger>
               <AlertDialogContent>
                  <AlertDialogHeader>
                     <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                     <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove all associated data.
                     </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                     <AlertDialogCancel className="dark:text-white dark:hover:!bg-white/10">Cancel</AlertDialogCancel>
                     <AlertDialogAction
                        className="text-white bg-red-500 hover:!bg-white hover:!text-red-500 hover:!border-red-500 dark:bg-red-500  dark:hover:!bg-white dark:hover:!text-black"

                        onClick={() => {
                           // Add your delete logic here
                           deleteUser();
                        }}
                     >
                        Delete
                     </AlertDialogAction>
                  </AlertDialogFooter>
               </AlertDialogContent>
            </AlertDialog>
         </div>
      </div>

   )
}