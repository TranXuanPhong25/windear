import {calculateLastLoginTime as calculatePassTime, cn, handlePlural} from "@/lib/utils"
import {Button} from "@/components/ui/button.tsx";
import {Archive} from "lucide-react";
import {BorrowingRequestResponse, BorrowingRequestStatus} from "@/models/BorrowingRequest.ts";
import BorrowingStatusBadge from "@/components/user/BorrowingStatusBadge.tsx";
import {Link} from "react-router-dom";
import {useDeleteBorrowingRequest} from "@/hooks/borrowing/useDeleteBorrowingRequest.ts";

const THRESHOLD_FOR_PASSED_TIME = 1000 * 60 * 60 * 24 * 28; //28 days in milliseconds

export default function BorrowingRequestCard({request}: { request: BorrowingRequestResponse }) {
    const {mutate: deleteRequest} = useDeleteBorrowingRequest();
    const requestTime = (new Date().getTime() - request.bookLoanId.requestDate) < THRESHOLD_FOR_PASSED_TIME ? calculatePassTime(request.bookLoanId.requestDate) : new Date(request.bookLoanId.requestDate).toLocaleString()
    request.status = request.returnDate && request.status != BorrowingRequestStatus.DECLINED ? BorrowingRequestStatus.RETURNED : request.status;
    const handleRevokeClick = () => {
        deleteRequest(request.bookLoanId);
    }
    return (
        <div
            className="relative overflow-hidden shadow-md transition-all duration-200 ease-out hover:scale-105 rounded-md group my-2">
            <div
                className={cn(
                    "flex items-start justify-between p-4 bg-blue-50/30",
                )}
            >
                <div className=" my-auto mr-4 ">
                    <BorrowingStatusBadge status={request.status}/>

                </div>
                <div className="flex-grow pr-6">
                    <Link to={`/books/${request.bookLoanId.bookId}`}
                          target={"_blank"}
                          className={cn(
                              "text-lg sm:text-2xl transition-all duration-300 font-bold",
                          )}>
                        {request.title}
                    </Link>
                    <h2 className="flex flex-col sm:flex-row ">
                        <span className="mr-1">{">"} Borrowed </span>
                        <span>at: {request.borrowDate ? new Date(request.borrowDate).toDateString() + " - " + new Date(request.borrowDate).toLocaleTimeString() : "Not borrowed yet"}</span>
                    </h2>
                    <h2>
                        {">"} Duration : {handlePlural(request.borrowTime, "day")}
                    </h2>
                    <h2 className="flex flex-col sm:flex-row ">
                        <span className="mr-1">{">"} Return</span>
                        <span >
                            date: {request.returnDate ? new Date(request.returnDate).toDateString() + " - " + new Date(request.returnDate).toLocaleTimeString() : "Not returned yet"}
                        </span>
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        {requestTime}
                    </p>

                </div>
                <Button onClick={handleRevokeClick}
                        className="absolute inset-y-0 right-1 px-3 transition-transform duration-300 transform translate-x-full  group-hover:translate-x-1 h-full !bg-red-500 !text-white z-20"
                        aria-label="Delete notification"
                >
                    <Archive className="h-5 w-5 mr-2"/>{request.status === BorrowingRequestStatus.RETURNED ? "Delete" : "Revoke"}
                </Button>
            </div>

        </div>
    )
}
