import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
export function useFetchInternalBook(bookId:string) {
    return useQuery({
        queryKey: ['internal-book', bookId],
        queryFn: async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/db/books/${bookId}`
            );
            return data;
        },
        staleTime: 1000 *60*60,
    });
}