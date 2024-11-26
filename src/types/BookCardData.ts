export interface BookCardData{
    node:{
        legacyId: string;
        imageUrl: string;
        title: string;
        primaryContributorEdge:{
            node:{
                name: string;
            }
        }
        stats:{
            averageRating: number;
        }
    }
}
