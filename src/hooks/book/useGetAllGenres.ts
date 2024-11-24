import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useGetAllGenres() {
   return useQuery({
      queryKey: ['genres'],
      queryFn: async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/genres`);
        return data&&data.map((genre: { name: string; })=>genre.name.toLowerCase());
      },
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
    });
}