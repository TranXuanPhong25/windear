import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
export function useEditionsList(workId: string | undefined, isInView: boolean) {
  return useQuery({
    queryKey: ['editions', workId],
    queryFn: async () => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/external/editions`,
        {
          data: workId
        }
      );
      return data;
    },

    enabled: isInView && workId !== undefined,

  });
}