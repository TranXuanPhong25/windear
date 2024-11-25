import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "../use-toast";
export function useCreateShelf() {
   const { user, getAccessTokenSilently } = useAuth0();
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: async (shelfName:string) => {
         if (!user?.sub) {
            throw new Error('User is not authenticated');
         }
         const accessToken = await getAccessTokenSilently();
         const addBookToShelfUrl = `${import.meta.env.VITE_BASE_API_URL}/shelves/${encodeURIComponent(user.sub)}/shelf`;
         await axios.request(
            {
               method: "POST",
               url: addBookToShelfUrl,
               params: {
                  name:shelfName
               },
               headers: {
                  Authorization: `Bearer ${accessToken}`,
               }
            }
         )
      },
      onSuccess: (_data, variables) => {
         toast({
            title: "Success",
            description: "Successfully create shelf " + variables,
            className: "mb-4  bg-green-400 dark:bg-green-600  ",
         })
         queryClient.invalidateQueries({queryKey:['shelves-name',user?.sub]})
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
