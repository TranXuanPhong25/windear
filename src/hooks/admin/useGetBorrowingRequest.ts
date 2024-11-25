import {useAuth0} from '@auth0/auth0-react';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {BorrowingRequestResponse} from "@/models/BorrowingRequest.ts";

export function useGetBorrowingRequest() {
    const {user, getAccessTokenSilently} = useAuth0();
    return useQuery({
        queryKey: ['borrowing', 'request'],
        queryFn: async () => {
            const token = await getAccessTokenSilently();

            const {data} = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/bookloan`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            if (data) {
                return data.map((request: BorrowingRequestResponse) => {
                    return {
                        ...request.bookLoanId,
                        title: request.title,
                        authorName: request.authorName,
                        borrowTime: request.borrowTime,
                        returnDate: request.returnDate,
                        status: request.status,
                    };
                });
            }
            return data;
        },
        enabled: !!user,
        refetchInterval: 1000 * 60 * 5, // 5 minutes
    });
}