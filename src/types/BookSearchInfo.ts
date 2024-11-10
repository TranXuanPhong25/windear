import Contribution from "./Contributions";

export default interface BookSearchInfo {
   contributions: Contribution[];
   image: {
      url: string;
   };
   id: string;
   title: string;
   imageUrl?: string;
   rating: number;
   authors: string;
}