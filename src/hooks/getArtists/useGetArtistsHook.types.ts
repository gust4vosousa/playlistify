import { IArtist, ITrack } from '../../@types/Entity.types';

export interface IArtistSearchResponse {
  artists: { items: IArtist[] };
}

export interface IRelatedArtistResponse {
  artists: IArtist[];
}

export interface ITopTracksResponse {
  tracks: ITrack[];
}
