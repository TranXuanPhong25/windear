import {useAuth0} from "@auth0/auth0-react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {toast} from "../use-toast";
import {AddBookPayload} from "@/models/PostBookPayload";

export function useUpdateBook() {
    const {user, getAccessTokenSilently} = useAuth0();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({payload, bookId}: { payload: AddBookPayload, bookId: string | number | null }) => {
            if (!user?.sub) {
                throw new Error('User is not authenticated');
            }
            const accessToken = await getAccessTokenSilently();
            const postBookUrl = `${import.meta.env.VITE_BASE_API_URL}/db/books/${bookId}`;
            const response = await axios.request(
                {
                    method: "PUT",
                    url: postBookUrl,
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
                description: "Successfully update book .",
                className: "mb-4  bg-green-400 dark:bg-green-600  ",
            })
            queryClient.invalidateQueries({
                queryKey: ['internal', 'books']
            })
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
