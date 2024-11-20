import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "../use-toast";
import { useNavigate } from "react-router-dom";

export function useDeleteUser() {
   const navigate = useNavigate();
   const { user, getAccessTokenSilently } = useAuth0();
   return useMutation({
      mutationFn: async () => {
         if (!user?.sub) {
            throw new Error('User is not authenticated');
         }
         const accessToken = await getAccessTokenSilently();
         const userDeleteUrl = `${import.meta.env.VITE_BASE_API_URL}/auth0/user/${user?.sub}`;
         const response = await axios.request(
            {
               method: 'DELETE',
               url: userDeleteUrl,
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
            description: "Successfully delete your account. You will be logged out in a moment.",
            className: "mb-4  bg-green-400 dark:bg-green-600  ",
         })
         setTimeout(() => {
            navigate("/logout");
         }, 2000);
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
