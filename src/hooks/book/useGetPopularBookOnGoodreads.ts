import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {PopularBookOnGoodreads} from "@/models/PopularBookOnGoodreads.ts";

export function useGetPopularBookOnGoodreads() {
    return useQuery({
        queryKey: ['popular-goodreads'],
        queryFn: async () => {
            const {data} = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/external/list/popular`);
            console.log(data.data.getPopularBookLists.edges);
            return data.data.getPopularBookLists.edges.map((edge: {
                node: {
                title: string;
                    books: {
                        edges: [
                            node: PopularBookOnGoodreads
                        ]
                    }
                }
            }) => {
                return [
                    ...edge.node.books.edges.map((book: PopularBookOnGoodreads) => {
                        book.node.topic = edge.node.title;
                        return book;
                    })
                ].slice(Math.random() % 5, Math.random() % 5 + 3)
            }).flat();
        },
        staleTime: 1000 * 60 * 60 * 36
    });
}