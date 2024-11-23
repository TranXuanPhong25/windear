import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "../use-toast";
import { AddBookToShelfPayload } from "@/models/AddBookToShelfPayload";
export function useAddBookToShelves() {
   const { user, getAccessTokenSilently } = useAuth0();
   return useMutation({
      mutationFn: async (payload:AddBookToShelfPayload) => {
         if (!user?.sub) {
            throw new Error('User is not authenticated');
         }
         const accessToken = await getAccessTokenSilently();
         const addBookToShelfUrl = `${import.meta.env.VITE_BASE_API_URL}/shelves/${encodeURIComponent(user.sub)}`;
         const response = await axios.request(
            {
               method: "POST",
               url: addBookToShelfUrl,
               headers: {
                  Authorization: `Bearer ${accessToken}`,
               },
               data: payload
            }
         ).then(response => response.data);
         return response.ticket;
      },
      onSuccess: () => {
         toast({
            title: "Success",
            description: "Successfully add book to shelf.",
            className: "mb-4  bg-green-400 dark:bg-green-600  ",
         })
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
