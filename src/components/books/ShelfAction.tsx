import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover"
import { Close } from "@radix-ui/react-popover";
import { BookCheckIcon, BookmarkIcon, BookOpenTextIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import React from "react";
import { Button } from "../ui/button";
import MuiltiShelvesSelector from "./shelves/MuiltiShelvesSelector";

export default function ShelfAction({ customClass = "w-full" }: { customClass?: string }) {
   const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
   const [isModalOpen, setIsModalOpen] = React.useState(false)

   const handlePopoverClick = () => {
      setIsPopoverOpen(false)
      setIsModalOpen(true)
   }


   return (
      <>
         <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger className={"bg-white text-black rounded-md px-4 py-2 mt-4 mb-2 text-lg " + customClass}>
               Want to read
            </PopoverTrigger>

            <PopoverContent className="p-0 pb-2 w-[250px] z-[999]">
               <h1 className="px-4 pt-3 pb-2 font-sans font-bold">Add to your reading list</h1>

               <Close className="absolute top-0 right-0 m-2 hover:bg-gray-300 dark:hover:bg-gray-800 rounded-full p-2 transition-colors" >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
               </Close>
               <div className="flex flex-col">
                  <Close className="flex text-lg w-full justify-start hover:bg-gray-200 dark:hover:bg-gray-800/60 py-2 px-4 transition-colors" onClick={handlePopoverClick}>
                     <BookmarkIcon className="mr-2" />
                     Want to read
                  </Close>
                  <Close className="flex text-lg w-full justify-start hover:bg-gray-200 dark:hover:bg-gray-800/60 py-2 px-4 transition-colors" onClick={handlePopoverClick}>
                     <BookOpenTextIcon className="mr-2" />
                     Currently Reading
                  </Close>
                  <Close className="flex text-lg w-full justify-start hover:bg-gray-200 dark:hover:bg-gray-800/60 py-2 px-4 transition-colors" onClick={handlePopoverClick}>
                     <BookCheckIcon className="mr-2" />
                     Read
                  </Close>
                  {/* TODO: Add more options */}
               </div>
            </PopoverContent>
         </Popover>
         <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="w-[360px] " >
               <DialogHeader>
                  <DialogTitle className="dark:text-white text-center">Add this book to your shelf</DialogTitle>
               </DialogHeader>
               <MuiltiShelvesSelector />
               <Button onClick={() => setIsModalOpen(false)}>Update</Button>
            </DialogContent>
         </Dialog></>
   )
}