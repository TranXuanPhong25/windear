export interface BookLoanId {
    userId: string;
    bookId: string|number;
    requestDate: number;
}
export interface BorrowingRequest extends BookLoanId {
    title: string;
    authorName: string;
    borrowTime: number;
    borrowDate: number;
    returnDate: number;
    status: BorrowingRequestStatus;
}
export interface BorrowingRequestResponse {
    bookLoanId: BookLoanId;
    title: string;
    authorName: string;
    borrowDate: number|null;
    borrowTime: number;
    returnDate: number|null;
    status: BorrowingRequestStatus;
}
export enum BorrowingRequestStatus {
    DECLINED = "DECLINE",
    ACCEPTED = "ACCEPT",
    PENDING = "PENDING",
    SUBSCRIBED = "SUBSCRIBE"
}