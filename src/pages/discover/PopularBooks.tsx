import {useGetPopularBooks} from "@/hooks/book/useGetPopularBooks.ts";
import BookStack from "@/components/discover/BookStack.tsx";
import {useEffect} from "react";

function PopularBooks() {
    const {data, isLoading} = useGetPopularBooks();
    useEffect(() => {
        document.title = "Popular Books | Discover";
    }, []);
    return (
        <div className="max-w-3xl  mx-auto">
            <h1 className=" text-3xl md:text-4xl font-bold mx-4">
                Most popular books in Windear library
            </h1>
            <div className="mt-10 ">
               <BookStack data={data} isLoading={isLoading}/>
            </div>
        </div>
    )
}

export default PopularBooks;