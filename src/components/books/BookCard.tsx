import {Star} from "lucide-react";
import {Link} from "react-router-dom";
import {Card, CardContent, CardDescription, CardTitle} from "@/components/ui/card.tsx";
import ImageWithFallback from "@/components/notfound/ImageWithFallback.tsx";

import {BookCardProps} from "@/types/BookCardProp.ts";

export function BookCard({id, title, author, rating, imageUrl}: BookCardProps) {
    return (
        <Card
            className="overflow-hidden   !bg-transparent rounded-none shadow-none border-0 p-2 text-center sm:!text-left">
            <Link to={`/books/${id}`}>
                <CardContent className="min-h-60 flex items-center justify-center p-0 ">
                    <ImageWithFallback
                        src={imageUrl}
                        alt="book cover"
                        width={220}
                        className="object-cover object-left-top inset-0 rounded-l-sm rounded-r-xl  border-l-[6px] border-b-[10px] border-[#0000002f] dark:border-[#ffffff33] hover:border-[#0000004f] dark:hover:border-[#ffffff4f] hover:scale-105 transition-transform duration-200 "
                        fallbackSrc="/book-cover-unavailable-placeholder.jpg"
                    />
                </CardContent>
            </Link>
            <Link to={`/books/${id}`}>
                <CardTitle className="text-lg mt-2 hover:underline  w-full text-center sm:text-left">
                    <span>
                        {title}
                    </span>
                </CardTitle>

            </Link>
            <span className="block">by {author}</span>
            <CardDescription>
                <span className="flex items-center justify-self-center sm:justify-self-start">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" fill="rgb(234,179,8)"/>
                    <span>{rating}</span>
                </span>
            </CardDescription>
        </Card>
    )
}

