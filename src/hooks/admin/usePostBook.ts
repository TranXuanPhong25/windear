import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "../use-toast";
import { PostBookPayload } from "@/models/PostBookPayload";
export function usePostBook() {
   const { user, getAccessTokenSilently } = useAuth0();
   return useMutation({
      mutationFn: async (book:PostBookPayload) => {
         if (!user?.sub) {
            throw new Error('User is not authenticated');
         }
         const accessToken = await getAccessTokenSilently();
         const postBookUrl = `${import.meta.env.VITE_BASE_API_URL}/db/books`;
         const response = await axios.request(
            {
               method: "POSt",
               url: postBookUrl,
               headers: {
                  Authorization: `Bearer ${accessToken}`,
               },
               data: book
            }
         ).then(response => response.data);
         return response.ticket;
      },
      onSuccess: () => {
         toast({
            title: "Success",
            description: "Successfully add book .",
            className: "mb-4  bg-green-400 dark:bg-green-600  ",
         })
      },
      onError: (error: AxiosError) => {

         toast(
            {
               title: "Error",
               description: (axios.isAxiosError(error) && error.response?.status === 429) ? "Too many requests. Please try again later." : "Unable to add book.",
               className: "!bg-red-500 mb-4",
            }
         )
      },
   });
}
