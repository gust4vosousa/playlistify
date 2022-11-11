import { Scopes } from 'react-spotify-auth';

export const CLIENT_ID = '330697a441ab4628898c9da7100cec1c'

export const REDIRECT_URI = {host: 'https://gust4vosousa.github.io/playlistify/', local: 'http://localhost:3000/callback'}

export const SCOPES: string[] = [
    Scopes.userReadPrivate,
    Scopes.userReadEmail,
    Scopes.playlistModifyPrivate,
    Scopes.playlistModifyPublic
  ]
  