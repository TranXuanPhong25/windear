import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "../use-toast";
export function useSendVerificationEmail(userId: string) {
   const{getAccessTokenSilently} = useAuth0();
   return useMutation({
      mutationFn: async () => {
         if (!userId) {
            throw new Error('User is not authenticated');
         }
         const accessToken = await getAccessTokenSilently();
         const sendVerificationEmailUrl = `${import.meta.env.VITE_BASE_API_URL}/auth0/user/resend-verification-email`;

         const response = await axios.request(
            {
               method: 'POST',
               url: sendVerificationEmailUrl,
               headers: {
                  Authorization: `Bearer ${accessToken}`,
               },
               data:{
                  data: userId
               }
            }
         ).then(response => response.data);

         return response.ticket;
      },
      onSuccess: () => {
         toast({
            title: "Success",
            description: "Successfully send serification smail.",
            className: "mb-4  bg-green-400 dark:bg-green-600  ",
         })
      },
      onError: (error: AxiosError) => {
         toast(
            {
               title: "Error",
               description: (axios.isAxiosError(error) && error.response?.status === 429) ? "Too many requests. Please try again later." : `${error?.response?.data||"Something went wrong"}`,
               className: "!bg-red-500 mb-4",
            }
         )
      },
   });
}
