import { WindearReview } from "@/types/WindearReview";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const myReview: WindearReview = {
   reviewId: 5,
   userId: "al;jl;kasdf",
   bookId: 1345,
   content: "",
   rating: 4.5,
   createAt: new Date().toUTCString(),
   userImageUrl: "/",
   userName: "tran phong",
}
export function useGetMyReview(userId: string, bookId: string) {
   const { getAccessTokenSilently } = useAuth0();
   return useQuery({
      queryKey: ['user', userId, 'book', bookId],
      queryFn: async () => {
         const domain = `${import.meta.env.VITE_BASE_API_URL}`;

         const accessToken = await getAccessTokenSilently();
         // console.log(accessToken)
         const userReviewUrl = `https://${domain}/review?bookId=${bookId}&userId${userId}`;
         const responseData = await axios(userReviewUrl, {
            method: 'GET',
            headers: {
               Authorization: `Bearer ${accessToken}`,
            },
         }).then(response => response.data)
            .catch((error) => {
               console.error(error);
            })
         console.log(responseData);
         return responseData||myReview;
      },
      enabled: userId !== "",
   });
}