import { Stats } from "@/types/Stats";

export default interface BookSearchInfo {
   node:
   {
      legacyId: number;
      imageUrl: string;
      title: string;
      primaryContributorEdge:
      {
         node:
         {
            name: string;
         };
      };
      stats: Stats;
      work: {
         reviews: {
            totalCount: number;
         }
      }
   };
}