import {useParams} from "react-router-dom";
import {useGetExternalBookByGenre} from "@/hooks/genre/useGetExternalBookByGenre.ts";
import {BookCardData} from "@/types/BookCardData.ts";
import LoadingBlock from "@/components/layout/LoadingBlock.tsx";
import {BookCard} from "@/components/books/BookCard.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {useEffect} from "react";
import {TooltipProvider} from "@/components/ui/tooltip.tsx";

export default function BrowseGenre() {
    const params = useParams();
    const {
        data,
        isLoading
    } = useGetExternalBookByGenre((params != undefined && params?.tagName?.toLowerCase().split(" ").join("-")) || "");
    const books: BookCardData[] = data?.data?.getTaggedBooks.edges || [];
    useEffect(() => {
        document.title = `Browse ${params?.tagName} | Windear`;
    }, [params]);
    return (
        <>
            <div className="flex items-center my-6 ">
                <Separator className="flex-1"/>
                <h1 className=" text-4xl  mx-4">
                    Top 50 {params?.tagName}
                </h1>
                <Separator className="flex-1"/>
            </div>
            <TooltipProvider>
                {
                    isLoading ? <LoadingBlock className="!bg-transparent h-[50vh] w-full "/> :
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full ">
                            {books.map((book: BookCardData) => (
                            <BookCard id={book.node.legacyId}
                                      title={book.node.title}
                                      author={book.node.primaryContributorEdge.node.name}
                                      rating={book.node.stats.averageRating}
                                      imageUrl={book.node.imageUrl}
                                      key={book.node.legacyId}
                            />
                            ))}
                        </div>
                }
            </TooltipProvider>
        </>
    )
}