import {BorrowingRequestStatus} from "@/models/BorrowingRequest.ts";
import {Bell, BookCheck, CheckCircle, CircleEllipsis, CircleX} from "lucide-react";

function BorrowingStatusBadge({ status}:{status: BorrowingRequestStatus}) {
    if(status === BorrowingRequestStatus.ACCEPTED){
        return <span className="text-green-500"><CheckCircle/></span>
    }
    if(status === BorrowingRequestStatus.DECLINED){
        return <span className="text-red-500"><CircleX/></span>
    }
    if(status === BorrowingRequestStatus.PENDING){
        return <span className="!text-yellow-400"><CircleEllipsis/></span>
    }
    if(status === BorrowingRequestStatus.SUBSCRIBED){
        return <span className="text-blue-500"><Bell/></span>
    }
    if(status === BorrowingRequestStatus.RETURNED){
        return <span className="text-green-500"><BookCheck/></span>
    }
    return null;
}

export default BorrowingStatusBadge;