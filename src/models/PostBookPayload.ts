export  interface PostBookPayload  {
   title: string;
   author: string;
   description:string;
   authorDescription:string;
   numPages:number;
   releaseDate: string;
   publisher: string;
   imageUrl: string; 
}
export interface AddBookPayload{
   genres: string;
   internalBook: PostBookPayload;
}