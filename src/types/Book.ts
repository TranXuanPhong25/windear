export interface Stats {
   ratingsCount: number;
   averageRating: number;
}

export interface BookDetails {
   language: {
      name: string;
   };
   asin: string;
   format: string;
   isbn: string;
   isbn13: string;
   numPages: number;
   officialUrl: string;
   publicationTime: number;
   publisher: string;
}

interface Author {
   name: string;
   description: string;
   profileImageUrl: string;
   followers: {
      totalCount: number;
   };
   works: {
      totalCount: number;
   };
}

interface ContributorEdge {
   role: string;
   node: Author;
}

export interface Genre {
   genre: {
      name: string;
   };
}

interface AffiliateLink {
   name: string;
   url: string;
}

interface Links {
   primaryAffiliateLink: AffiliateLink;
   secondaryAffiliateLinks: AffiliateLink[];
}

export interface SocialSignal {
   count: number;
   name: string;
   users:
   {
      node: {
         imageUrl: string;
      };
   }[];
}



interface Work {
   details: {
      originalTitle: string;
      publicationTime: number;
   };
   reviews: {
      totalCount: number;
   };
   id:string;
}

export interface Book {
   id: string;
   stats: Stats;
   title: string;
   details: BookDetails;
   description: string;
   primaryContributorEdge: ContributorEdge;
   secondaryContributorEdges: ContributorEdge[];
   bookGenres: Genre[];
   links: Links;
   imageUrl: string;
   socialSignals: SocialSignal[];
   work: Work;
   webUrl: string;
}

