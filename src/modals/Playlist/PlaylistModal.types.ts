import { IPostPlaylistRequest } from '../../hooks/spotifyServices/useSpotifyServicesHook.types';

export interface IPlaylistModalProps {
  open: boolean;
  onHandleClose: () => void;
  onHandleSubmit: (data: IPostPlaylistRequest) => void;
}
