// src/types/WindearReview.ts

export interface WindearReview {
   reviewId: number;
   userId: string;
   bookId: number;
   content: string|null;
   rating: number;
   createAt: string;
   userImageUrl: string;
   userName: string;
}