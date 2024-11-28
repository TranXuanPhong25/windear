import StarRating from "@/components/books/detail/StarRating.tsx";
import {Skeleton} from "@/components/ui/skeleton"
import ExpandableParagraph from "@/components/books/detail/ExpandableParagraph.tsx";
import ShelfAction from "@/components/books/shelves/ShelfAction.tsx";
import GetBook from "@/components/books/borrowing/GetBook.tsx";
import Genres from "@/components/books/detail/Genres.tsx";
import {Separator} from "@/components/ui/separator";
import {Suspense, useEffect, lazy} from "react";
import CommunityReviews from "@/components/books/reviews/CommunityReviews";
import LoadingBlock from "@/components/layout/LoadingBlock";
import WriteReview from "@/components/books/reviews/WriteReview";
import BookNotFound from "./BookNotFound";
import {BookInShelfPayload} from '@/models/AddBookToShelfPayload.ts';
import {BookInShelfStatus} from '@/types/BookInShelfStatus';
import {InternalBook as InternalBookType} from "@/models/InternalBook.ts";
import {User} from "lucide-react";
import {useFetchInternalBook} from "@/hooks/book/useFetchInternalBook.ts";

const BlockQuote = lazy(() => import('@/components/books/BlockQuote'));


export default function InternalBook({bookId}: { bookId: string }) {
   const {data , error, isLoading} = useFetchInternalBook(bookId);
    useEffect(() => {
        document.title = (data && data.internalBook.title) || "Windear library";
    }, [data])
    if (error) return <div>Error: {error.message}</div>;
    if (data?.errors) {
        return <BookNotFound/>;
    }
    const book: InternalBookType = data?.internalBook || {}
    const genres = data?.genres ? data?.genres?.split(",") : [];
    const shelfBook: BookInShelfPayload = {
        id: bookId || "",
        title: book?.title || "",
        author: book?.author || "",
        releaseDate: book ? new Date(book.releaseDate) : new Date(),
        rating: book?.rating || 0,
        imageUrl: book?.imageUrl || "",
        addedDate: new Date(),
        readDate: null,
        userRating: null,
        bookStatus: BookInShelfStatus.WANT_TO_READ
    };
    return (
        <>
            <div className="w-full dark:text-white md:flex mt-8 px-5 pb-10">
                <div className="w-full min-[450px]:w-2/3 sm:w-1/2 md:w-[220px] flex flex-col items-center md:sticky top-24 h-fit  mx-auto">
                    {isLoading ? <Skeleton className="w-[220px] h-80"/>
                        : <img
                            className="w-full rounded-r-2xl rounded-l-sm dark:drop-shadow-[0_0_1em_#D2D9E11f] drop-shadow-[0_0_1.6em_#0000001f] h-fit "
                            src={book?.imageUrl||"/book-cover-unavailable-placeholder.jpg"}
                            alt="book cover"
                        />
                    }
                    <ShelfAction customClass="w-full" book={shelfBook}/>
                    <GetBook bookId={bookId} title={book.title} author={book.author}/>
                    <StarRating ratable onChange={() => {
                    }} bookId={bookId}/>
                </div>
                {/* book detail */}
                <div className="flex-1 w-full font-sans md:ml-12 max-w-4xl mt-6 md:mt-0">
                    {
                        isLoading ? <Skeleton
                                className="my-2 scroll-m-20 text-3xl xs:text-4xl sm:text-5xll font-semibold tracking-tight ">&nbsp;</Skeleton> :
                            <h1 className="my-2 scroll-m-20 text-3xl xs:text-4xl sm:text-5xl font-semibold tracking-tight ">{book.title}</h1>
                    }
                    {
                        isLoading ? <Skeleton className="text-lg mb-3 w-64">&nbsp;</Skeleton> :
                            <h2 className="text-xl mb-3 flex ">
                                By {book.author}
                            </h2>
                    }
                    {
                        isLoading ? <Skeleton className="flex items-center h-12 w-96 mb-2"/> :
                            <a href="#community-reviews"
                               className="flex items-center mb-2 hover:bg-gray-50/10 w-fit p-2 -mx-2 rounded-md cursor-s-resize">
                                <StarRating initialRating={book.rating} onChange={() => {
                                }}/>
                                <span className="ml-3 text-2xl">{Number(book.rating).toFixed(2)}</span>

                            </a>
                    }
                    {
                        isLoading ? <Skeleton className="w-full h-32 my-4"/> :
                            <div className="max-w-[800px]">
                                <ExpandableParagraph
                                    text={book.description}
                                />
                            </div>
                    }

                    {
                        isLoading ? <Skeleton className="w-full h-24 my-4"/> :
                            <Genres genres={genres}/>
                    }

                    {
                        isLoading ? <Skeleton className="w-60  h-12 my-4"/> :
                            (
                                <div className="mt-8 mb-6 text-gray-600 dark:text-gray-300">
                                    <h3>{book.numPages} Pages, {book.format}</h3>
                                    <h3>First published {new Date(book.releaseDate).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</h3>
                                </div>
                            )
                    }
                    <Separator className="my-4"/>
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold ">About the author</h1>
                        {
                            isLoading ? <Skeleton className="w-full h-40 mt-4"/> :
                                <div>
                                    <div className="flex items-center mt-4 ">
                                        <div>
                                            <User className="h-16 w-16"/>
                                        </div>
                                        <div className="ml-4">
                                            <h2 className="text-lg font-semibold">{book.author}</h2>
                                        </div>
                                    </div>
                                    <div className="max-w-[800px]">

                                        <ExpandableParagraph text={book.authorDescription}/>
                                    </div>
                                </div>
                        }
                    </div>
                    <Separator className="my-4"/>


                    {/* {
                  isLoading ? <Skeleton className="w-full h-60" /> : */}
                    <WriteReview bookId={bookId}/>
                    {/* } */}
                    <Separator className="my-4"/>

                    {
                        isLoading ? <LoadingBlock className="w-full h-60"/> :
                            <CommunityReviews bookId={bookId}/>
                    }
                </div>

            </div>
            <Suspense fallback={<LoadingBlock className="w-full h-60"/>}>
                <BlockQuote/>
            </Suspense>
        </>
    )
}