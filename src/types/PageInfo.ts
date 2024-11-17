// src/types/PageInfo.ts

export interface PageInfo {
   hasNextPage: boolean;
   hasPrevPage: boolean;
   nextPageToken?: string;
   prevPageToken?: string;
 }