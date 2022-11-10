import { IPostPlaylistRequest } from '../../hooks/spotifyServices/useSpotifyServicesHook.types';

export interface IPlaylistModalProps {
  open: boolean;
  isBusy: boolean;
  onHandleClose: () => void;
  onHandleSubmit: (data: IPostPlaylistRequest) => void;
}
