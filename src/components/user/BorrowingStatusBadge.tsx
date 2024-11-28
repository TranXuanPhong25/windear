import {BorrowingRequestStatus} from "@/models/BorrowingRequest.ts";
import {Bell, BookCheck, CheckCircle, CircleEllipsis, CircleX} from "lucide-react";

function BorrowingStatusBadge({ status}:{status: BorrowingRequestStatus}) {
    if(status === BorrowingRequestStatus.ACCEPTED){
        return <span className="text-green-500 "><CheckCircle className="md:size-9"/></span>
    }
    if(status === BorrowingRequestStatus.DECLINED){
        return <span className="text-red-500 "><CircleX className="md:size-9"/></span>
    }
    if(status === BorrowingRequestStatus.PENDING){
        return <span className="!text-yellow-400 "><CircleEllipsis className="md:size-9"/></span>
    }
    if(status === BorrowingRequestStatus.SUBSCRIBED){
        return <span className="text-blue-500 "><Bell className="md:size-9"/></span>
    }
    if(status === BorrowingRequestStatus.RETURNED){
        return <span className="text-green-500 "><BookCheck className="md:size-9"/></span>
    }
    return null;
}

export default BorrowingStatusBadge;