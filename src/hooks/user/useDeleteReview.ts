import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from "axios";
import { toast } from "../use-toast";

export function useDeleteReview() {
    const { user, getAccessTokenSilently } = useAuth0();
    return useMutation({
        mutationFn: async (reviewId:string|number) => {
            if (!user?.sub) {
                throw new Error('User is not authenticated');
            }
            const accessToken = await getAccessTokenSilently();
            const addBookToShelfUrl = `${import.meta.env.VITE_BASE_API_URL}/review/${reviewId}`;
            await axios.request(
                {
                    method: "DELETE",
                    url: addBookToShelfUrl,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                }
            )
        },
        onSuccess: (_data, variables) => {
            toast({
                title: "Success",
                description: "Successfully delete review " + variables,
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
