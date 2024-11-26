import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
export function useGetAvailableCopyForBorrowing(bookId:string|number) {
    return useQuery({
        queryKey: ['borrowing', 'available', bookId],
        queryFn: async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/bookloan/book/${bookId}/available`

            );
            return data;
        },

        enabled: !!bookId ,
        staleTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60 * 1, // 1 minute
    });
}