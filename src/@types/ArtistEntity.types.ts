export interface IArtist {
  id: string;
  genres: string[];
  name: string;
  images: IArtistImage[];
}

export interface IArtistImage {
  url: string;
  height: number;
  width: number;
}

export interface IArtistList {
  artists: { items: IArtist[] };
}
