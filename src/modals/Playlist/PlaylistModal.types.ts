import { IPostPlaylistRequest } from '../../hooks/spotifyServices/useSpotifyServicesHook.types';

export interface IPlaylistModalProps {
  open: boolean;
  isBusy: boolean;
  values: IPostPlaylistRequest;
  onChange: (value: string | boolean, field: EFormFields) => void
  onHandleClose: () => void;
  onHandleSubmit: () => void;
}

export enum EFormFields {
  name = 'name',
  description = 'description',
  public = 'public'
}