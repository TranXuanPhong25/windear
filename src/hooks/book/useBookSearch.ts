// src/hooks/useBookSearch.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useDebounce } from '@/hooks/useDebounce';

export function useBookSearch(searchQuery: string) {
  const debouncedSearch = useDebounce(searchQuery, 500); // 500ms delay

  return useQuery({
    queryKey: ['bookSearch', debouncedSearch],
    queryFn: async () => {
      if (!debouncedSearch) return [];
      
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/search?q=${debouncedSearch}`,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      return data||"notfound";
    },
    enabled: debouncedSearch.length > 0,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}