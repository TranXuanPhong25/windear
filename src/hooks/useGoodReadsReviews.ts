import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
export function useGoodReadsReviews(workId: string | undefined, isInView: boolean) {
  return useQuery({
    queryKey: ['goodreadsReview', workId],
    queryFn: async () => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/external/reviews`,
        {
          data: workId
        }
      );
      return data;
    },

    enabled: isInView && workId !== undefined,
    staleTime: 1000 * 60 * 5, // 5 minutes


  });
}