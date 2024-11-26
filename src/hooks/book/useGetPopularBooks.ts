import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
export function useGetPopularBooks() {
    return useQuery({
        queryKey: ['popular-books'],
        queryFn: async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/popular-book/top10`
            );
            return data;
        },
        staleTime: 1000 *60*60,
    });
}