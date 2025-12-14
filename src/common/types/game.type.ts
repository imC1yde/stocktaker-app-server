export type Game =  {
    id: number;
    name: string;
    slug: string;
    descriptionRaw: string;
    backgroundImage: string; // image 1200x400px
    rating: number;
    released: string;
    playtime: number; // average playtime
    esrbRating?: EsrbRating[]
    genres: Genre[]
    platforms: Platform[]
}

type EsrbRating = {
    id: number;
    name: string;
    slug: string; // lowercased name
}

type Genre = {
    id: number;
    name: string;
    slug: string;  // lowercased name
}

type Platform = {
    id: number;
    name: string;
    slug: string;  // lowercased name
}
