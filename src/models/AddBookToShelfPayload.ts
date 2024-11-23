export interface BookInShelfPayload{
   id: string;
   title: string;
   author: string ;
   releaseDate: Date ;
   rating: number;
   imageUrl: string;
   addedDate: Date;
   readDate: Date | null;
   userRating: number | null;
   bookStatus: number;
}
export interface AddBookToShelfPayload {
   shelfNames: string[];
   book: BookInShelfPayload;
}