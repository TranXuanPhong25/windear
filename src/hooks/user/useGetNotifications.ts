import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export function useGetNotifications() {
    const { user,getAccessTokenSilently } = useAuth0();
    return useQuery({
        queryKey: ['notifications', user?.sub],
        queryFn: async () => {
            if(!user?.sub){
                return [];
            }

            const domain = `${import.meta.env.VITE_BASE_API_URL}`;
            const accessToken = await getAccessTokenSilently();
            const encodedUserId = encodeURIComponent( user?.sub);
            const notificationsUrl = `${domain}/notification/${encodedUserId}`;
            const responseData = await axios(notificationsUrl, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }).then(response => response.data)
                .catch((error) => {
                    return error.response.data;
                })

            return responseData||[];
        },
        enabled: !!user,
        refetchInterval: 1000 * 60, // 1 minute
    });
}