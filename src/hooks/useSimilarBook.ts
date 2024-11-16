import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
export function useSimilarBook(bookId: string | undefined, isInView: boolean) {
  return useQuery({
    queryKey: ['simmilarBooks', bookId],
    queryFn: async () => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/external/similar`,
        {
          data: bookId
        }
      );
      return data;
    },

    enabled: isInView && bookId !== undefined,

  });
}