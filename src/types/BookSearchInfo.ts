export default interface BookSearchInfo {
   bookId: string;
   title: string;
   imageUrl: string;
   avgRating: number;
   author: {
      name: string;
   }
}