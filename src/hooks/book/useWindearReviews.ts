import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
export function useWindearReviews(bookId: string | undefined, isInView: boolean) {
  return useQuery({
    queryKey: ['windearReview', bookId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/review/book/${bookId}`,
        {
          data: bookId
        }
      );
      return data;
    },

    enabled: isInView && bookId !== undefined,
    staleTime: 1000 * 60 * 5, // 5 minutes

  });
}