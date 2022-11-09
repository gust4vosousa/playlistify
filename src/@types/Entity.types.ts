export interface IArtist {
  id: string;
  genres: string[];
  name: string;
  images: IImage[];
}

export interface IImage {
  url: string;
  height: number;
  width: number;
}

export interface ITrack {
  id: string;
  name: string;
  artists: IArtist[];
  album: IAlbum;
}

export interface IAlbum {
  id: string;
  name: string;
  images: IImage[];
}
