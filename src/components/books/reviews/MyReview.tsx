import React from "react";
import LoadingBlock from "@/components/layout/LoadingBlock";
import { useGetMyReview } from "@/hooks/book/useGetMyReview";
import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import StarRating from "../StarRating";
const EditableReviewCard = React.lazy(() => import("./EditableReviewCard"));
import { useState } from "react";
import { Edit2 } from "lucide-react";

export default function MyReview({ bookId }: { bookId: string }) {
   const [isEditing, setIsEditing] = useState(false);
   const { user, loginWithRedirect, isLoading: authLoading } = useAuth0();
   const { isLoading, error, data } = useGetMyReview(user?.sub || "", bookId);
   const onRating = () => {
      if (!user?.sub) {
         loginWithRedirect({
            appState: { returnTo: window.location.pathname }
         });
      }
   }
   const onClickReviewBtn = () => {
      if (authLoading) return;
      if (!user?.sub) {
         loginWithRedirect({
            appState: { returnTo: window.location.pathname }
         });
      }

      setIsEditing(true);
   }

   if (error && (data && data.status!=400)) {
      return <div>Can't get user review data, caused by  {error?.message || "unknown"}</div>
   }

   if (isLoading || authLoading) return <LoadingBlock />
   if (data && user?.sub && (data.content || isEditing)) {
      return <React.Suspense fallback={<LoadingBlock />}>
         <EditableReviewCard
            {...data}
            bookId={bookId}
            isNewReview={!data.rating}
            onCancel={() => setIsEditing(false)} />
      </React.Suspense>
   }
   return <>
      <h1 className="text-3xl text-center mb-2">Share your think with world</h1>
      <div className="flex items-center justify-center">
         <StarRating
            title="Rate this book"
            initialRating={data?.rating || 0}
            ratable
            bookId={bookId}
            onChange={onRating} />
         <Button
            onClick={onClickReviewBtn}
            className="ml-4 rounded-full"
         >Write your review<Edit2 className="size-5 ml-2" /></Button>
      </div>
   </>



}