import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {  LoaderCircle } from "lucide-react";
import ExpandableParagraph from "../detail/ExpandableParagraph.tsx";
import Genres from "../detail/Genres.tsx";
import StarRating from "../detail/StarRating.tsx";
interface ReviewCardProps {
   rating: number;
   createAt: string;
   userName: string;
   isAuthor?: boolean;
   content: string | null;
   userImageUrl: string;
   tags?: string[];
}

export default function ReviewCard({
   rating,
   createAt,
   userName,
   isAuthor = false,
   content,
   userImageUrl,
   tags = [],
}: ReviewCardProps) {
   const date = new Date(createAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
   console.log(rating)
   return (
      <Card className="mb-4 dark:bg-gray-800 border-0 shadow-none border-b dark:border-gray-400">
         <CardTitle className="flex justify-between items-center ">
            <div className="flex items-center">
               <Avatar className="size-16">
                  <AvatarImage src={userImageUrl} alt={userName} />
                  <AvatarFallback><LoaderCircle className="animate-spin" /></AvatarFallback>
               </Avatar>
               <h3 className="text-lg font-bold dark:text-white ml-2">{userName} {isAuthor && "(GRs Author)"}</h3>
            </div>
            <div>

               <StarRating initialRating={rating} small />
            </div>
         </CardTitle>
         <CardContent className="p-0">
            <ExpandableParagraph text={content || "No content"} />
            
         </CardContent>
         <CardFooter className="px-0">
            {tags.length > 0 && <Genres genres={tags} noHeading />}
            <div className="flex items-center justify-between mt-2 ml-auto w-">
               <p className="text-gray-500 dark:text-gray-400">{date}</p>
            </div>
         </CardFooter>
      </Card>
   )
}