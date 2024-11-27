import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "../use-toast";
import { useQueryClient } from "@tanstack/react-query";
export function usePostReview(method: string, review: string ,bookId:number,reviewId:number,rating:number) {
   const { user, getAccessTokenSilently } = useAuth0();
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: async () => {
         if (!user?.sub) {
            throw new Error('User is not authenticated');
         }
         const accessToken = await getAccessTokenSilently();
         const postReviewUrl = `${import.meta.env.VITE_BASE_API_URL}/review${method=="PUT"?"/"+reviewId:""}`;
         const response = await axios.request(
            {
               method: method,
               url: postReviewUrl,
               headers: {
                  Authorization: `Bearer ${accessToken}`,
               },
               data: {
                  userId: user?.sub,
                  bookId: bookId,
                  content: review,
                  rating: rating,
                  userImageUrl: user.picture,
                  userName: user.name?.includes("@gmail.com")?user.nickname:user.name,
               }
            }
         ).then(response => response.data);
         return response.ticket;
      },
      onSuccess: () => {
         toast({
            title: "Success",
            description: "Successfully update your review.",
            className: "mb-4  bg-green-400 dark:bg-green-600  ",
         })
         queryClient.invalidateQueries({ queryKey: ['windearReview', bookId.toString()] });
         queryClient.invalidateQueries({queryKey: ['user', user?.sub, 'book', bookId]});
      },
      onError: (error: AxiosError) => {

         toast(
            {
               title: "Error",
               description: (axios.isAxiosError(error) && error.response?.status === 429) ? "Too many requests. Please try again later." : "" + error?.response?.data,
               className: "!bg-red-500 mb-4",
            }
         )
      },
   });
}
