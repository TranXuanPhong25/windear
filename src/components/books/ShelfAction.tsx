import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Close} from "@radix-ui/react-popover"
import {BookCheckIcon, BookmarkIcon, BookOpenTextIcon, Loader} from "lucide-react";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "../ui/dialog";
import React, {useEffect} from "react";
import MultiShelfSelector from "./shelves/MultiShelfSelector";
import {useGetShelvesOfBook} from "@/hooks/shelves/useGetShelvesOfBook"
import {BookInShelfPayload} from '@/models/AddBookToShelfPayload';
import {clsx} from "clsx";
import {useAddBookInShelves} from "@/hooks/shelves/useAddBookInShelves";
import {toast} from "@/hooks/use-toast.ts";
import {useQueryClient} from "@tanstack/react-query";
import {useAuth0} from "@auth0/auth0-react";

const readingList = [
    {name: "Want to read", icon: BookmarkIcon},
    {name: "Currently reading", icon: BookOpenTextIcon},
    {name: "Read", icon: BookCheckIcon}
]
export default function ShelfAction({customClass = "w-full", book}: {
    customClass?: string,
    book: BookInShelfPayload
}) {
    const {user} = useAuth0();
    const queryClient = useQueryClient();
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const {data: shelvesOfBook, isLoading} = useGetShelvesOfBook(book.id);
    const {mutate: addBookToShelves} = useAddBookInShelves();
    const [hasOnReadingList, setHasOnReadingList] = React.useState(false);
    const [shouldInvalidateQuery, setShouldInvalidateQuery] = React.useState(false);
    useEffect(() => {
        if (shelvesOfBook) {
            setHasOnReadingList(readingList.some((list) => shelvesOfBook.includes(list.name)))
        }
    }, [shelvesOfBook])

    useEffect(() => {
        if (shouldInvalidateQuery&&!isModalOpen&&!isPopoverOpen) {
            queryClient.invalidateQueries({
                queryKey: ['shelves', user?.sub]
            })
            setShouldInvalidateQuery(false)
        }
    }, [isModalOpen, isPopoverOpen, queryClient, shouldInvalidateQuery, user?.sub]);
    const handlePopoverClick = (shelfName: string) => {

        addBookToShelves(
            {
                shelfNames: [shelfName],
                book: book
            },
            {
                onSuccess: () => {
                    setIsPopoverOpen(false)
                    setIsModalOpen(true)
                    toast({
                        title: "Book added to shelf",
                        description: `The book has been added to your ${shelfName} shelf`,
                        className: "!bg-green-500 text-white mb-4"
                    })
                    queryClient.invalidateQueries({
                        queryKey: ['shelves', user?.sub,"book",book.id]
                    })
                    setShouldInvalidateQuery(true)
                },
                onError: (error) => {
                    toast({
                        title: "Error",
                        description: error.message,
                        className: "!bg-red-500 text-white mb-4"
                    })
                }
            }
        )

    }
    const getJustShelves: (shelves: string[]) => string[] = (shelves: string[]): string[] => {
        return shelves.filter((shelf: string): boolean => !readingList.map((list) => list.name).includes(shelf))
    }
    if (!shelvesOfBook || !book || isLoading) return (
        <div className="bg-white text-black rounded-md px-4 py-2 mt-4 mb-2 text-lg w-full flex justify-items-center">
            <Loader className="animate-spin w-full"/>
        </div>
    )
    const handleSaveChange = () => {
        setIsModalOpen(false)
    }
    return (
        <>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger className={"dark:text-white rounded-lg px-4 py-2 mt-4 mb-2 text-lg dark:bg-gray-700 hover:dark:bg-slate-700 border-b-2 dark:border-gray-600  bg-slate-200/80 border-slate-400 hover:bg-slate-300 " + customClass}>
                    {!hasOnReadingList ? "Want to read" : readingList.map((list) => (shelvesOfBook.includes(list.name) ? list.name : ""))}
                </PopoverTrigger>

                <PopoverContent className="p-0 pb-2 w-[250px] z-[999]">
                    <h1 className="px-4 pt-3 pb-2 font-sans font-bold">Add to your reading list</h1>
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
                            isLoading ? <Loader/> :
                                readingList.map((item, index) => (
                                    <Close key={index}
                                           className={clsx(
                                               "flex items-center text-lg w-full justify-start hover:bg-gray-200 dark:hover:bg-gray-800/60 py-2 px-4 transition-colors",
                                               shelvesOfBook.includes(item.name) && "bg-gray-200/80 dark:bg-gray-800/40"
                                           )}
                                           onClick={() => handlePopoverClick(item.name)}>
                                        <item.icon className="h-5 w-5 mr-2"/>
                                        {item.name}
                                    </Close>
                                ))
                        }
                    </div>
                </PopoverContent>
            </Popover>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="w-[360px] ">
                    <DialogHeader>
                        <DialogTitle className="dark:text-white text-center">Add this book to your shelf</DialogTitle>
                    </DialogHeader>
                    <MultiShelfSelector book={book} onSaveCompleted={handleSaveChange}
                                        alreadyInShelves={getJustShelves((shelvesOfBook))}/>
                    <DialogDescription className="text-center text-gray-500 dark:text-gray-400 text-sm mt-2">
                        You can always change this later</DialogDescription>

                </DialogContent>
            </Dialog></>
    )
}