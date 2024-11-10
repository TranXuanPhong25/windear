export default interface BookSearchInfo {
   contributions: [
      {
         author:{
            id: string;
            name: string;
         };
      }
   ];
   image: {
      url: string;
   };
   id: string;
   title: string;
   imageUrl?: string;
   rating: number;
   authors: string;
}