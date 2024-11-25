import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import {MoreHorizontal, X, Check} from "lucide-react";
import {Button} from "@/components/ui/button"
import {BookLoanId} from "@/models/BorrowingRequest.ts";
import {useDeclineBorrowingRequest} from "@/hooks/admin/useDeclineBorrowingRequest.ts";
import {useAcceptBorrowingRequest} from "@/hooks/admin/useAcceptBorrowingRequest.ts";

function BorrowingRequestAction({loanId}: { loanId: BookLoanId }) {
    const {mutate: declineRequest} = useDeclineBorrowingRequest();
    const {mutate: acceptRequest} = useAcceptBorrowingRequest();
    const handleDecline = () => {
        declineRequest(loanId);
    }
    const handleAccept = () => {
        acceptRequest(loanId);
    }
    return (

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                    className="flex items-center gap-1 hover:!bg-green-500 text-green-400 dark:hover:text-white"
                    onClick={handleAccept}>
                    <Check className="size-4"/>
                    <span>Accept</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="flex items-center gap-1 hover:!bg-red-400 text-red-400 dark:hover:text-white"
                    onClick={handleDecline}
                >
                    <X className="size-4"/>
                    <span>Decline</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    );
}

export default BorrowingRequestAction;