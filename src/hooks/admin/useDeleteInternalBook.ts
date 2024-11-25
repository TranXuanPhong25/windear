import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from "axios";
import { toast } from "../use-toast";
export function useDeleteInternalBook() {
   const QueryClient =useQueryClient();
   const { user, getAccessTokenSilently } = useAuth0();
   return useMutation({
      mutationFn: async (bookId:string) => {
         if (!user?.sub) {
            throw new Error('User is not authenticated');
         }
         const accessToken = await getAccessTokenSilently();
         const deleteBookUrl = `${import.meta.env.VITE_BASE_API_URL}/db/books/${bookId}`;
         const response = await axios.request(
            {
               method: "DELETE",
               url: deleteBookUrl,
               headers: {
                  Authorization: `Bearer ${accessToken}`,
               },
            }
         ).then(response => response.data);
         return response.ticket;
      },
      onSuccess: () => {
         toast({
            title: "Success",
            description: "Successfully delete book .",
            className: "mb-4  bg-green-400 dark:bg-green-600  ",
         })
         QueryClient.invalidateQueries({
            queryKey:['internal','books']
         });
      },
      onError: (error: AxiosError) => {

         toast(
            {
               title: "Error",
               description: (axios.isAxiosError(error) && error.response?.status === 429) ? "Too many requests. Please try again later." : (error.response?.data as { message: string }).message,
               className: "!bg-red-500 mb-4",
            }
         )
      },
   });
}
