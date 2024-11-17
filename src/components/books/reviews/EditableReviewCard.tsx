import { Suspense, useState,lazy } from "react";
const ReviewEditor = lazy(() => import("./ReviewEditor"));

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import ExpandableParagraph from "../ExpandableParagraph";
import StarRating from "../StarRating";
import { Button } from "@/components/ui/button";
import { usePostReview } from "@/hooks/usePostReview";
interface EditableReviewCard {
   reviewId: number,
   bookId: number;
   rating: number;
   createAt: string;
   userName: string;
   content: string | null;
   userImageUrl: string;
   isNewReview?: boolean;
   onCancel: () => void;
}

export default function EditableReviewCard({
   reviewId,
   bookId,
   rating,
   createAt,
   userName,
   content,
   userImageUrl,
   isNewReview = false,
   onCancel,
}: EditableReviewCard) {
   const [shouldPost, setShouldPost] = useState(isNewReview);
   const [isEditing, setIsEditing] = useState(isNewReview);
   const [newReviewContent, setNewReviewContent] = useState(content);
   const [backupContent, setBackupContent] = useState(content);
   const [newRating, setNewRating] = useState(rating);
   const { mutate: putReview, isPending: isPutting } = usePostReview("PUT", newReviewContent || "", bookId, reviewId, newRating);
   const { mutate: postReview, isPending: isPosting } = usePostReview("POST", newReviewContent || "", bookId, reviewId, newRating);

   const date = new Date(createAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
   const handleCancel = () => {
      setNewReviewContent(backupContent);
      setIsEditing(false);
      if (backupContent !== "") {
         return;
      }
      if (onCancel) onCancel();
   };

   return (
      <Card className="mb-4 dark:bg-gray-800 border-0 shadow-none border-b dark:border-gray-400">
         <CardTitle className="flex justify-between items-center ">
            <div className="flex items-center">
               <Avatar className="size-16">
                  <AvatarImage src={userImageUrl} alt={userName} />
                  <AvatarFallback><User /></AvatarFallback>
               </Avatar>
               <h3 className="text-lg font-bold dark:text-white ml-2">{userName}</h3>
            </div>
            <div>
               <StarRating initialRating={rating} ratable onChange={setNewRating} />
            </div>
         </CardTitle>
         {
            !isEditing || !isNewReview ? (
               <CardContent className="p-0">
                  <ExpandableParagraph text={newReviewContent || "No content"} />
               </CardContent>
            ) : (
               <Suspense fallback={<div>Loading...</div>}>
                  <ReviewEditor review={newReviewContent || ""} onChange={setNewReviewContent} />
               </Suspense>

            )
         }

         <CardFooter className="px-0 py-4">
            <Button onClick={() => {
               setIsEditing(prevState => !prevState)
               if (!isEditing) {
                  setBackupContent(newReviewContent || "");
               } else {
                  if (shouldPost) {
                     postReview();
                     setShouldPost(false);
                  } else {
                     putReview();
                  }
               }
            }} className="">
               {
                  isPosting || isPutting ? "Loading..." : ""
               }
               {isEditing ? "Update" : "Edit review"}

            </Button>
            {isEditing && (
               <Button className="ml-2 dark:hover:bg-gray-700" variant="ghost" onClick={handleCancel}>
                  Cancel
               </Button>
            )}
            <div className="flex items-center justify-between mt-2 ml-auto w-">
               <p className="text-gray-500 dark:text-gray-400">{date}</p>
            </div>
         </CardFooter>

      </Card>
   )
}