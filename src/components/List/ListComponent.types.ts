import { IArtist } from '../../@types/ArtistEntity.types';

export interface IArtistListProps {
  data: IArtist[];
  handleSelect: (artist: IArtist) => void;
}
