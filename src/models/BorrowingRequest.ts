export interface BookLoanId {
    userId: string;
    bookId: string|number;
    requestDate: string;
}
export interface BorrowingRequest extends BookLoanId {
    title: string;
    authorName: string;
    borrowTime: number;
    borrowDate: string;
    returnDate: string;
    status: BorrowingRequestStatus;
}
export interface BorrowingRequestResponse {
    bookLoanId: BookLoanId;
    title: string;
    authorName: string;
    borrowDate: string|null;
    borrowTime: number;
    returnDate: string|null;
    status: BorrowingRequestStatus;
}
export enum BorrowingRequestStatus {
    DECLINED = "DECLINE",
    ACCEPTED = "ACCEPT",
    PENDING = "PENDING",
}