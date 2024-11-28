import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
export function useGetAddBookAnalytics() {
    const {getAccessTokenSilently} = useAuth0();
    return useQuery({
        queryKey: ['stats', 'active-users'],
        queryFn: async () => {
            const token = await getAccessTokenSilently();

            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/analytic/db/add-book`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            return data;
        },
    });
}