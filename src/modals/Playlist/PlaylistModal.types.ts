import { IPostPlaylistRequest } from '../../hooks/spotifyServices/useSpotifyServicesHook.types';

export interface IPlaylistModalProps {
  open: boolean;
  playlistId: string;
  onHandleClose: () => void;
  onHandleSubmit: (data: IPostPlaylistRequest) => void;
}
