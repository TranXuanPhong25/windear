import LoadingBlock from "@/components/layout/LoadingBlock.tsx";
import {InternalBook} from "@/models/InternalBook.ts";
import {SquareArrowOutUpRight, Star} from "lucide-react";
import ShelfAction from "@/components/books/shelves/ShelfAction.tsx";
import {BookInShelfStatus} from "@/types/BookInShelfStatus.ts";
import {Link} from "react-router-dom";
import StarRating from "@/components/books/detail/StarRating.tsx";

export default function BookStack({data, isLoading}: { data: InternalBook[], isLoading: boolean }) {
    if (isLoading) return <LoadingBlock className="!bg-transparent min-h-[50vh] w-full"/>
    return data.map((book: InternalBook, index: number) => (
        <div key={book.id}
             className="flex w-full sm:flex-row flex-col sm:my-16 my-6 border-b-2 dark:border-gray-300/20 border-gray-400/50 relative items-center dark:bg-slate-600 rounded-xl bg-zinc-200/30  ">
            <div className="mx-4 text-2xl md:text-4xl">
                #{index + 1}
            </div>
            <Link to={"/books/" + book.id} className="rounded-r-xl rounded-l-sm mt-3  sm:-mt-8 sm:-mb-2  md:ml-4 w-[300px] text-elipsis overflow-hidden shadow-[0px_7px_20px_0px_rgba(10,10,10,0.4)]">

                <img src={book.imageUrl || "/book-cover-unavailable-placeholder.jpg"}
                     alt={book.title}
                     className="object-fit  rounded-r-xl rounded-l-sm w-full"
                     loading={"lazy"}
                />
            </Link>
            <div className="  w-full  pl-2 pr-4 py-1 pt-4 ml-3 rounded-lg ">
                <div className='flex flex-col justify-between h-full'>
                    <div className="text-center sm:text-left">
                        <Link to={"/books/" + book.id}>
                            <h3 className="text-2xl lg:text-3xl md:pr-10">{book.title}</h3>
                        </Link>
                        <h4><span
                            className='dark:text-gray-200'>by</span> {book.author} - {new Date(book.releaseDate).toLocaleDateString()}
                        </h4>
                        {/* <h4 className='text-gray-200'>1999, 304 pages</h4> */}
                        <div className="flex items-center ">
                            <h4 className="text-lg">{book.rating.toFixed(2)}</h4>
                            <Star
                                className='fill-yellow-400 text-transparent ml-1'/>
                        </div>
                    </div>
                    <div className="mx-auto sm:ml-auto sm:mr-0 mb-1">
                        <StarRating ratable bookId={book.id}/>
                    </div>
                    <div className='flex  justify-between items-center md:flex-row flex-col'>

                        <h4>AddedDate: {new Date(book.addDate).toLocaleDateString()}</h4>
                        <div>
                            <ShelfAction customClass="!mt-1 w-full " book={
                                {
                                    id: book.id,
                                    title: book.title,
                                    author: book.author,
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