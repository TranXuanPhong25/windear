import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover.tsx"
import {Close} from "@radix-ui/react-popover"
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {BookCopyIcon, ShoppingCart} from "lucide-react";
import {AffiliateLink} from "@/models/Book.ts";
import {Link} from "react-router-dom";
import {Separator} from "@/components/ui/separator.tsx";
import {Button} from "@/components/ui/button.tsx";
import LocationCard from "@/components/books/borrowing/LocationCard.tsx";
import {Label} from "@/components/ui/label.tsx";
import {NumberInput} from "@/components/ui/number-input.tsx";
import {useSendBorrowingRequest} from "@/hooks/borrowing/useSendBorrowingRequest.ts";
import {BorrowingRequestResponse, BorrowingRequestStatus} from "@/models/BorrowingRequest.ts";
import {useQueryClient} from "@tanstack/react-query";
import {useGetRequestStatus} from "@/hooks/borrowing/useGetRequestStatus.ts";
import {useGetAvailableCopyForBorrowing} from "@/hooks/borrowing/useGetAvailableCopyForBorrowing.ts";
import LoadingBlock from "@/components/layout/LoadingBlock.tsx";
import AlreadyBorrowingScreen from "@/components/books/borrowing/AlreadyBorrowingScreen.tsx";
import SubscribeBookScreen from "@/components/books/borrowing/SubscribeBookScreen.tsx";

const getOptionsInitial = [
    {
        name: "Borrow from Windear",
        icon: BookCopyIcon,
    }
]
export default function GetBook({customClass = "w-full", affiliateLink = [], author = "", title = "", bookId = ""}: {
    customClass?: string,
    affiliateLink?: AffiliateLink[],
    author: string,
    title: string,
    bookId: string
}) {
    const queryClient = useQueryClient();
    const {data: availableCopy, isLoading: isGettingAvailCopy} = useGetAvailableCopyForBorrowing(bookId);
    const {data: userRequest, isLoading: isGettingRequestStatus} = useGetRequestStatus(bookId);
    const {mutate: sendBorrowRequest} = useSendBorrowingRequest();
    const {user, loginWithRedirect} = useAuth0();
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [borrowTime, setBorrowTime] = React.useState(1);

    const handleBorrowClick = () => {
        setIsPopoverOpen(false);
        setIsModalOpen(true);
    }

    const closeThis = () => {
        setIsPopoverOpen(false);
        setIsModalOpen(false);
    }
    const handleBorrowRequest = () => {
        if (!user?.sub) {
            loginWithRedirect({
                appState: {returnTo: window.location.pathname}
            });
        }
        const payload: BorrowingRequestResponse = {
            bookLoanId: {
                bookId: bookId,
                userId: user?.sub || "",
                requestDate: new Date().getTime(),
            },
            borrowDate: null,
            title: title,
            authorName: author,
            returnDate: null,
            borrowTime: borrowTime,
            status: BorrowingRequestStatus.PENDING
        }
        sendBorrowRequest(
            payload,
            {
                onSuccess: () => {
                    closeThis();
                    queryClient.invalidateQueries({
                        queryKey: ['borrowing', 'available', bookId],
                    });
                    queryClient.invalidateQueries({
                        queryKey: ['user', user?.sub, 'borrowing', 'book', bookId],
                    });
                }
            }
        )
    }

    return (
        <>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger
                    className={"dark:text-white rounded-lg px-4 py-2 mb-2 text-lg dark:bg-gray-700 hover:dark:bg-slate-700 border-b-2 dark:border-gray-600  bg-slate-200/80 border-slate-400 hover:bg-slate-300 " + customClass}>
                    Get physical book
                </PopoverTrigger>

                <PopoverContent className="p-0 pb-2 w-[250px] z-[999]">
                    <h1 className="px-4 pt-3 pb-2 font-sans font-bold">Request a free copy</h1>
                    <Close
                        className="absolute top-0 right-0 m-2 hover:bg-gray-300 dark:hover:bg-gray-800 rounded-full p-2 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </Close>
                    <div className="flex flex-col">
                        {
                            getOptionsInitial.map((item, index) => (
                                <Close key={index}
                                       className="flex items-center text-lg w-full justify-start hover:bg-gray-200 dark:hover:bg-gray-800/60 py-2 px-4 transition-colors"
                                       onClick={handleBorrowClick}
                                >
                                    <item.icon className="h-5 w-5 mr-2"/>
                                    {item.name}
                                </Close>
                            ))
                        }
                        {
                            affiliateLink.length > 0 &&
                            <div className="flex items-center justify-center px-3">
                                <Separator className={"flex-1"}/>
                                <span className="mx-3 font-bold">OR</span>
                                <Separator className={"flex-1"}/>
                            </div>
                        }
                        {
                            affiliateLink.map((item, index) => (
                                <Link to={item.url} target="_blank" key={index}>
                                    <Close
                                        className="flex items-center text-lg w-full justify-start hover:bg-gray-200 dark:hover:bg-gray-800/60 py-2 px-4 transition-colors  "
                                    >
                                        <ShoppingCart className="!size-5 mr-2"/>
                                        <span className="text-ellipsis">
                                        Buy on {item.name.length > 10 ? item.name.slice(0, 10) + "..." : item.name}
                                        </span>
                                    </Close>
                                </Link>
                            ))
                        }
                    </div>
                </PopoverContent>
            </Popover>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="w-[360px] ">
                    <DialogHeader>
                        <DialogTitle className="dark:text-white text-center">Request a copy </DialogTitle>
                    </DialogHeader>
                    {
                        (isGettingAvailCopy || isGettingRequestStatus) && !userRequest ? <LoadingBlock/> :
                            userRequest ? (

                                    userRequest.status === BorrowingRequestStatus.PENDING ? <>
                                        <h1 className="dark:text-white">
                                                <span>
                                                    Your request is pending.
                                                </span>
                                            <br/>
                                            <span>
                                                    Please wait for librarian to approve.
                                                </span>
                                            <Link to="/requests">
                                                <Button className="w-full mt-4">View request</Button>
                                            </Link>
                                        </h1>
                                    </> : <AlreadyBorrowingScreen onClose={closeThis}/>
                                )
                                : availableCopy ? <>

                                    <h1 className="dark:text-white">
                                 <span>
                                  A request will be send to our librarian.
                                     </span>
                                        <br/>
                                        <span>
                                       Then you can pick up the book at
                                   </span>
                                        <LocationCard
                                            title="Library and Digital Knowledge Center"
                                            address="Dich Vong Hau, Cau Giay, Hanoi"
                                        />
                                    </h1>

                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2686.92719053401!2d105.78329579226791!3d21.038393770567787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab3540f05ab1%3A0x3f77bbc1a43d6646!2zVHJ1bmcgdMOibSBUaMO0bmcgdGluIFRoxrAgdmnhu4duIMSQSFFHSE4sIEThu4tjaCBW4buNbmcgSOG6rXUsIEPhuqd1IEdp4bqleSwgSMOgIE7hu5lpLCBWaWV0bmFt!5e0!3m2!1sen!2sus!4v1732540373846!5m2!1sen!2sus"
                                        width="310" height="220" allowFullScreen loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade">
                                    </iframe>
                                    <Label htmlFor="borrow-time-input" className="dark:text-white">
                                        How long do you want to borrow the book?
                                    </Label>
                                    <NumberInput max={86} min={1} step={1} className="w-full justify-center"
                                                 onChange={setBorrowTime} initialValue={borrowTime} id="borrow-time-input"/>

                                    <Button className="w-full " onClick={handleBorrowRequest}>Make request</Button>
                                    <DialogDescription className="text-center">
                                        Your request will be reject after 3 days if you don't pick up the book.
                                    </DialogDescription>

                                </> : <SubscribeBookScreen
                                    onClose={closeThis}
                                    data={
                                        {
                                            bookId: bookId,
                                            title: title,
                                            authorName: author,
                                        }
                                    }
                                />

                    }
                </DialogContent>
            </Dialog>
        </>
    )
}