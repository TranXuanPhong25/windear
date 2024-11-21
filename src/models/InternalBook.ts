import { PostBookPayload } from "./PostBookPayload";
export interface InternalBook extends PostBookPayload{
   id: string;
   addDate: string;
}
