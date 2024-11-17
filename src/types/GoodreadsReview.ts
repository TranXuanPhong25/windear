// src/types/GoodreadsReview.ts

import { PageInfo } from "./PageInfo";

interface Tag {
   name: string;
}

interface Tagging {
   tag: Tag;
}

interface Shelving {
   taggings: Tagging[];
}

interface Creator {
   imageUrlSquare: string;
   name: string;
   isAuthor: boolean;
}

export interface GoodreadsReview {
   node: {
      rating: number;
      text: string;
      createdAt: string;
      creator: Creator;
      shelving: Shelving;
   };
   pageInfo: PageInfo;
   totalCount: number;
}