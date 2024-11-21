export interface BookInShelfPayload{
   bookId: string | null;
   title: string;
   authorName: string ;
   releaseDate: Date ;
   rating: number | null;
   imageUrl: string;
   addedDate: Date;
   readDate: Date | null;
   yourRating: number | null;
   bookStatus: number;
}
export interface AddBookToShelftPayload {
   ShelfName: string;
   book: BookInShelfPayload;
}