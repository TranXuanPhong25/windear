import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
export function useIsBorrowing(bookId:string|number) {
    const {user,getAccessTokenSilently} = useAuth0();
    return useQuery({
        queryKey: ['user',user?.sub,'borrowing', 'book', bookId],
        queryFn: async () => {
            const token = await getAccessTokenSilently();

            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/bookloan/${bookId}/${user?.sub}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            return data.length > 0;
        },

        enabled: !!user ,
        staleTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60, // 1 minute
    });
}