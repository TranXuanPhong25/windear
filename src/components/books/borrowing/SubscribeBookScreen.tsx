import {Button} from "@/components/ui/button.tsx";
import {useSubscribeBook} from "@/hooks/borrowing/useSubcribeBook.ts";
import {useAuth0} from "@auth0/auth0-react";
import {DialogDescription} from "@/components/ui/dialog.tsx";
import {Bell, BellRing} from "lucide-react";

export default function SubscribeBookScreen({data, onClose}: {
    data: { bookId: string, title: string, authorName: string },
    onClose: () => void
}) {
    const {user} = useAuth0();
    const {mutate: subscribeBook} = useSubscribeBook();
    const handleSubscribeBook = () => {
        subscribeBook({
            userId: user?.sub || "",
            bookId: data.bookId,
            title: data.title,
            authorName: data.authorName
        }, {
            onSuccess: () => {
                onClose();
            }
        });
    }
    return (
        <div className="dark:text-white w-full flex-col flex">
            <h1>Sorry for the inconvenience, we will try to restock more copies of the book as soon as possible.</h1>
            <DialogDescription className="mt-4">
                    You can subscribe to get notified when the book is available.
            </DialogDescription>
            <Button onClick={handleSubscribeBook} className="mt-2 mx-auto px-8 group  !bg-blue-500/70 hover:!bg-blue-500">
                Subscribe
                <Bell className="size-6 ml-2 group-hover:text-white group-hover:hidden"/>
                <BellRing
                    className={"size-6 ml-2 group-hover:text-white  hidden group-hover:!block "} />
            </Button>
        </div>

    )
}