import { IArtist } from '../../@types/Entity.types';

export interface IArtistListProps {
  data: IArtist[];
  editable?: boolean;
  handleSelect: (artist: IArtist) => void;
}
