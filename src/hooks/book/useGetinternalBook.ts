import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useGetinternalBook(bookId:string) {
   return useQuery({
      queryKey: ['internal','books',bookId],
      queryFn: async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/db/books/${bookId}`);
        return data||{};
      },
      enabled: !!bookId,
    });
}