import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "./use-toast";
import { useQueryClient } from "@tanstack/react-query";
export function useRate(bookId:string) {
   const { user, getAccessTokenSilently } = useAuth0();
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: async (rating:number) => {
         if (!user?.sub) {
            throw new Error('User is not authenticated');
         }
         const accessToken = await getAccessTokenSilently();
         const resetPasswordGeneratorUrl = `${import.meta.env.VITE_BASE_API_URL}/review/rate`;
         const response = await axios.request(
            {
               method: "PUT",
               url: resetPasswordGeneratorUrl,
               headers: {
                  Authorization: `Bearer ${accessToken}`,
               },
               data: {
                  bookId: bookId,
                  userId: user.sub,
                  rating: rating,
                  userImageUrl: user.picture,
                  userName: user.name,


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
         queryClient.invalidateQueries( {queryKey: ['rate', bookId]});
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
