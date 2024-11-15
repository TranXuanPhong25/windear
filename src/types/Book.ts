interface Stats {
   ratingsCount: number;
   averageRating: number;
   textReviewsCount: number;
}

interface BookDetails {
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

interface Genre {
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

interface SocialSignal {
   count: number;
   name: string;
   users: 
   {
      nodes: {
         imageUrl: string;
      }[];
   };
}



interface Work {
   details: {
      originalTitle: string;
      publicationTime: number;
   };
   reviews: {
      totalCount: number;
   };
}

export default interface Book {
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

