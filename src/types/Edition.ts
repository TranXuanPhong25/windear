import { BookDetails } from './Book';
export default interface Edition {
   node :{
      legacyId : number;
      imageUrl: string
      details: BookDetails;
   }
}