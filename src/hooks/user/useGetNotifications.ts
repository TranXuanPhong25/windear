import {useAuth0} from "@auth0/auth0-react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Notification} from "@/models/Notification.ts";
import {toast} from "@/hooks/use-toast.ts";

const ONE_MINUTE = 1000*60;

export function useGetNotifications() {
    const {user, getAccessTokenSilently} = useAuth0();
    return useQuery({
        queryKey: ['notifications', user?.sub],
        queryFn: async () => {
            if (!user?.sub) {
                return [];
            }

            const domain = `${import.meta.env.VITE_BASE_API_URL}`;
            const accessToken = await getAccessTokenSilently();
            const encodedUserId = encodeURIComponent(user?.sub);
            const notificationsUrl = `${domain}/notification/${encodedUserId}`;
            const responseData: Notification[] = await axios(notificationsUrl, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }).then(response => response.data)
                .catch((error) => {
                    return error.response.data;
                })

            if (responseData) {
                for (let i = 0; i < responseData.length; i++) {
                    if (new Date().getTime() - new Date(responseData[i].timestamp).getTime() < ONE_MINUTE) {
                        toast({
                            title: "New Notification",
                            description: responseData[i].title,
                            className: "mb-4 bg-blue-400 dark:bg-blue-600",
                        })
                        // console.log("New Notification: ", responseData[i].title);
                    }else break;
                }
            }
            return responseData || [];
        },
        enabled: !!user,
        refetchInterval: 1000 * 60, // 1 minute
    });
}