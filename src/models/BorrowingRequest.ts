export interface BookLoanId {
    userId: string;
    bookId: string|number;
    borrowDate: string;
}
export interface BorrowingRequest extends BookLoanId {
    title: string;
    authorName: string;
    borrowTime: number;
    returnDate: string;
    status: BorrowingRequestStatus;
}
export interface BorrowingRequestResponse {
    bookLoanId: BookLoanId;
    title: string;
    authorName: string;
    borrowTime: number;
    returnDate: string;
    status: BorrowingRequestStatus;
}
export enum BorrowingRequestStatus {
    DECLINED = "DECLINE",
    ACCEPTED = "ACCEPT",
    PENDING = "PENDING",
}