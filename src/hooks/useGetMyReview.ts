import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export function useGetMyReview(userId: string, bookId: string) {
   const { getAccessTokenSilently } = useAuth0();
   return useQuery({
      queryKey: ['user', userId, 'book', bookId],
      queryFn: async () => {
         const domain = `${import.meta.env.VITE_BASE_API_URL}`;

         const accessToken = await getAccessTokenSilently();
         // console.log(accessToken)
          const encodedUserId = encodeURIComponent(userId);
          const userReviewUrl = `${domain}/review/${bookId}/${encodedUserId}`;
         const responseData = await axios(userReviewUrl, {
            method: 'GET',
            headers: {
               Authorization: `Bearer ${accessToken}`,
               'Content-Type': 'application/json',
            },
         }).then(response => response.data)
            .catch((error) => {
               console.error(error);
            })
               
            return responseData || {};
      },
      enabled: userId !== "",
   });
}