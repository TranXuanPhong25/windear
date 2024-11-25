import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
import { MoreHorizontal, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button"
import { BookTableData } from '@/types/BookTableData';
import { useDeleteInternalBook } from '@/hooks/admin/useDeleteInternalBook';

function BookActions({ book }: { book: BookTableData }) {
   const { mutate: deleteBookWithId } = useDeleteInternalBook();
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const handleDialogOpen = () => setIsDialogOpen(true);
   const handleDialogClose = () => setIsDialogOpen(false);

   const handleEditBook = () => {
      window.dispatchEvent(new CustomEvent('edit-book', {
        detail: book.id
      }));
   }

   const handleDeleteBook = () => {
      deleteBookWithId(book.id,
         {
            onSuccess: () => {
               handleDialogClose();
            }
         })
   }

   return (
      <>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
               <DropdownMenuLabel>Actions</DropdownMenuLabel>
               <DropdownMenuItem className="flex items-center gap-1" onClick={handleEditBook}>
                  <Pencil className="size-4" />
                  <span>Edit book</span>
               </DropdownMenuItem>
               <DropdownMenuItem className="flex items-center gap-1 hover:!bg-red-400 text-red-400 dark:hover:text-white"
                  onClick={handleDialogOpen}>
                  <Trash2 className="size-4" />
                  <span>Delete book</span>
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
         <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
            </AlertDialogTrigger>
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                     This action cannot be undone. This will permanently delete your account and remove all associated data.
                  </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <AlertDialogCancel className="dark:text-white dark:hover:!bg-white/10" onClick={handleDialogClose}>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                     className="text-white bg-red-500 hover:!bg-white hover:!text-red-500 hover:!border-red-500 dark:bg-red-500  dark:hover:!bg-white dark:hover:!text-black"
                     onClick={handleDeleteBook}>
                     Delete
                  </AlertDialogAction>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </>
   );
}
export default BookActions;