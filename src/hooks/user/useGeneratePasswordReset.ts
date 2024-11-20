import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "../use-toast";
import { SetStateAction } from "react";

export function useGeneratePasswordReset(changeTicket: { (value: SetStateAction<string | null>): void; (arg0: string): void; }) {
   const { user, getAccessTokenSilently } = useAuth0();
   return useMutation({
      mutationFn: async () => {
         if (!user?.sub) {
            throw new Error('User is not authenticated');
         }

         const accessToken = await getAccessTokenSilently();
         const resetPasswordGeneratorUrl = `${import.meta.env.VITE_BASE_API_URL}/auth0/user/${user?.sub}/reset-password`;

         const response = await axios.request(
            {
               method: 'GET',
               url: resetPasswordGeneratorUrl,
               headers: {
                  Authorization: `Bearer ${accessToken}`,
               },
            }
         ).then(response => response.data);

         return response.ticket;
      },
      onSuccess: (data) => {
         changeTicket(data);
         toast({
            title: "Success",
            description: "Successfully receive password reset link.",
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
