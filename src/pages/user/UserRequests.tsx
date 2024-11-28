import LoadingBlock from "@/components/layout/LoadingBlock.tsx";
import {useGetUserBorrowingRequest} from "@/hooks/borrowing/useGetUserBorrowingRequest.ts";
import {BorrowingRequestResponse} from "@/models/BorrowingRequest.ts";
import {useEffect} from "react";


import BorrowingRequestCard from "@/components/user/BorrowingRequestCard.tsx";
function UserRequests() {
    const {data, isLoading, error} = useGetUserBorrowingRequest();
    useEffect(() => {
        document.title = "My borrowing requests";
    }, []);
    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold">My borrowing request</h1>
            {
                isLoading ? <LoadingBlock className="!bg-transparent min-h-[50vh] w-full"/> :
                    data.map((request: BorrowingRequestResponse, index: number) => (
                       <BorrowingRequestCard request={request} key={index+request.bookLoanId.requestDate}/>
                    ))

            }

        </div>
    )
}

export default UserRequests;