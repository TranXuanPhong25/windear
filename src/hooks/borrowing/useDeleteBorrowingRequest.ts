import {useAuth0} from "@auth0/auth0-react";
import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios, {AxiosError} from "axios";
import {toast} from "../use-toast";
import {BookLoanId} from "@/models/BorrowingRequest.ts";

export function useDeleteBorrowingRequest() {
    const QueryClient = useQueryClient();
    const {user, getAccessTokenSilently} = useAuth0();
    return useMutation({
        mutationFn: async (bookLoanId: BookLoanId) => {
            if (!user?.sub) {
                throw new Error('User is not authenticated');
            }
            const accessToken = await getAccessTokenSilently();
            return await axios.request(
                {
                    method: "DELETE",
                    url: `${import.meta.env.VITE_BASE_API_URL}/bookloan`,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    data: {
                        ...bookLoanId,
                    }
                }
            ).then(response => response.data);
        },
        onSuccess: () => {
            toast({
                title: "Success",
                description: "Successfully delete borrowing request .",
                className: "mb-4  bg-green-400 dark:bg-green-600  ",
            })
            QueryClient.invalidateQueries({
                queryKey: ['user', user?.sub, 'requests-borrowing']
            });

        },
        onError: (error: AxiosError) => {

            toast(
                {
                    title: "Error",
                    description: (axios.isAxiosError(error) && error.response?.status === 429) ? "Too many requests. Please try again later." : (error.response?.data as {
                        message: string
                    }).message,
                    className: "!bg-red-500 mb-4",
                }
            )
        },
    });
}