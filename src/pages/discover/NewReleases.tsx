import {useGetNewReleases} from "@/hooks/book/useGetNewReleases.ts";
import LoadingBlock from "@/components/layout/LoadingBlock.tsx";

import {SquareArrowOutUpRight, Star} from "lucide-react";
import ShelfAction from "@/components/books/shelves/ShelfAction.tsx";
import {Link} from "react-router-dom";
import {InternalBook} from "@/models/InternalBook.ts";
import {BookInShelfStatus} from "@/types/BookInShelfStatus.ts";

function NewReleases() {
    const {data, isLoading} = useGetNewReleases();

    return (
        <div className="max-w-3xl  mx-auto">
            <h1 className=" text-4xl  mx-4">
                New releases in this month
            </h1>
            <div className="mt-10 ">

                {
                    isLoading ? <LoadingBlock className="!bg-transparent min-h-[50vh] w-full"/> :
                        data.map((book:InternalBook,index:number) => (
                            <div key={book.id}
                                 className="flex w-full mt-16 mb-16 border-b-2 dark:border-gray-300/20 border-gray-400/50 relative items-center dark:bg-slate-600 rounded-xl bg-zinc-200/30  ">
                                <div className="mx-4 text-4xl">
                                    #{index+1}
                                </div>
                                <img src={book.imageUrl || "/book-cover-unavailable-placeholder.jpg"}
                                     alt={book.title}
                                     className="object-fit w-[200px] rounded-r-xl rounded-l-sm  -mt-8 -mb-2  ml-4 shadow-[0px_7px_20px_0px_rgba(10,10,10,0.4)] "/>
                                <div className="  w-full h-[240px]  pl-2 pr-4 py-1 pt-4 ml-3 rounded-lg ">
                                    <div className='flex flex-col justify-between h-full'>
                                        <div>
                                            <h3 className="text-3xl pr-4">{book.title}</h3>

                                            <h4><span
                                                className='dark:text-gray-200'>by</span> {book.author} - {new Date(book.releaseDate).getFullYear()}
                                            </h4>
                                            {/* <h4 className='text-gray-200'>1999, 304 pages</h4> */}
                                            <div className="flex items-center ">
                                                <h4 className="text-lg">{book.rating}</h4>
                                                <Star
                                                    className='fill-yellow-400 text-transparent ml-1'/>
                                            </div>
                                        </div>
                                        <div className='flex  justify-between items-center'>

                                                <h4>AddedDate: {new Date(book.addDate).toLocaleDateString()}</h4>
                                            <div>
                                                <ShelfAction customClass="!mt-1 w-full " book={
                                                    {
                                                        id: book.id,
                                                        title: book.title,
                                                        author: book.author ,
                                                        releaseDate: new Date(book.releaseDate),
                                                        rating: book.rating,
                                                        imageUrl: book.imageUrl,
                                                        addedDate: new Date(book.addDate),
                                                        readDate: null,
                                                        userRating: null,
                                                        bookStatus: BookInShelfStatus.WANT_TO_READ,
                                                    }
                                                }/>
                                                {/* <GetBook /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                                <div>
                                    <Link to={"/books/" + book.id}
                                          className="absolute top-6 right-4 !bg-transparent"><SquareArrowOutUpRight/></Link>
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

export default NewReleases;
