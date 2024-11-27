import {useAuth0} from "@auth0/auth0-react";
import {useMutation} from '@tanstack/react-query';
import axios, {AxiosError} from "axios";
import {toast} from "../use-toast";

export function useToggleReadStatusNotification() {
    const {user, getAccessTokenSilently} = useAuth0();
    return useMutation({
        mutationFn: async ({id, isRead}: { id: string, isRead: boolean }) => {
            if (!user?.sub) {
                throw new Error('User is not authenticated');
            }
            const accessToken = await getAccessTokenSilently();
            const toggleUrl = `${import.meta.env.VITE_BASE_API_URL}/notification/mark${!isRead ? "-not-" : "-"}read/${id}`;
            const response = await axios.request(
                {
                    method: "PUT",
                    url: toggleUrl,
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
                description: "Successfully mark as read.",
                className: "mb-4  bg-green-400 dark:bg-green-600  ",
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
