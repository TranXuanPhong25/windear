export  interface PostBookPayload  {
   title: string;
   author: string;
   description:string;
   authorDescription:string;
   numPages:number;
   releaseDate: string;
   publisher: string;
   imageUrl: string;
   format: string;
   quantityAvailable?:number;
}
export interface AddBookPayload{
   genres: string;
   internalBook: PostBookPayload;
}