import {useAuth0} from '@auth0/auth0-react';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

export function useGetUserBorrowingRequest() {
    const {user, getAccessTokenSilently} = useAuth0();
    return useQuery({
        queryKey: ['user', user?.sub, 'requests-borrowing' ],
        queryFn: async () => {
            const token = await getAccessTokenSilently();

            const {data} = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/bookloan/user/${user?.sub}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            return data;
        },

        enabled: !!user?.sub,
        refetchInterval: 1000 * 60 * 2, // 2 minute
    });
}