import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Genre{
    id: number;
    name: string;
}
export function useGetAllGenres() {
   return useQuery({
      queryKey: ['genres'],
      queryFn: async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/genres`);
        return data&&data.sort((a:Genre, b:Genre) => a.id - b.id).map((genre: { name: string; })=>genre.name);
      },
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
    });
}