import {Button} from "@/components/ui/button.tsx";
import LocationCard from "@/components/books/borrowing/LocationCard.tsx";
import {DialogDescription} from "@/components/ui/dialog.tsx";

function AlreadyBorrowingScreen({onClose}:{onClose:()=>void}) {
    return (
        <div className="dark:text-white w-full flex-col flex">
            <h1>You have already borrow this book. Please return it on time at our library office.</h1>
            <LocationCard
                title="Library and Digital Knowledge Center"
                address="Dich Vong Hau, Cau Giay, Hanoi"
            />
           <DialogDescription  className="mx-20 mt-3">
               <Button onClick={onClose} className="w-full" >
                   Ok, I got it
               </Button>
           </DialogDescription>
        </div>

    )
}

export default AlreadyBorrowingScreen;