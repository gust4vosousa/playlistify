import axios, { AxiosRequestConfig } from 'axios';
import { IArtist } from '../../@types/Entity.types';
import {
  IArtistSearchResponse,
  IPostPlaylistRequest,
  IRelatedArtistResponse,
  ITopTracksResponse
} from './useSpotifyServicesHook.types';

export const useSpotifyServicesHook = (authToken?: string) => {
  const baseUrl: string = 'https://api.spotify.com/v1';
  const headers: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  };

  const getArtist = async (id: string) => {
    const apiUrl = `${baseUrl}/artists/${id}`;

    try {
      const response = await axios.get(apiUrl, headers);

      const data: IArtist = response.data;

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const searchArtists = async (query: string) => {
    const apiUrl = `${baseUrl}/search?type=artist&q=${query}`;

    try {
      const response = await axios.get(apiUrl, headers);

      const data: IArtistSearchResponse = response.data;

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getRelatedArtists = async (id: string) => {
    const apiUrl = `${baseUrl}/artists/${id}/related-artists`;

    try {
      const response = await axios.get(apiUrl, headers);

      const data: IRelatedArtistResponse = response.data;

      return data.artists;
    } catch (error) {
      console.log(error);
    }
  };

  const getArtistTopTracks = async (id: string) => {
    const apiUrl = `${baseUrl}/artists/${id}/top-tracks`;

    try {
      const response = await axios.get(apiUrl, {
        ...headers,
        params: { market: 'BR' }
      });

      const data: ITopTracksResponse = response.data;

      return data.tracks;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserId = async () => {
    const apiUrl = `${baseUrl}/me`;

    try {
      const response = await axios.get(apiUrl, headers);

      const data: { id: string } = response.data;

      return data.id;
    } catch (error) {
      console.log(error);
    }
  };

  const createPlaylist = async (params: IPostPlaylistRequest) => {
    const userId = await getUserId();

    const apiUrl = `${baseUrl}/users/${userId}/playlists`;

    try {
      const response = await axios.post(apiUrl, { ...params }, headers);

      const data: { id: string } = response.data;

      return data.id;
    } catch (error) {
      console.log(error);
    }
  };

  const addItemsToPlaylist = async (
    playlistId: string,
    tracksURIs: string[]
  ) => {
    const apiUrl = `${baseUrl}/playlists/${playlistId}/tracks`;

    try {
      const response = await axios.post(apiUrl, tracksURIs, {
        ...headers
      });

      const data: string = response.data;

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getArtist,
    searchArtists,
    getRelatedArtists,
    getArtistTopTracks,
    createPlaylist,
    addItemsToPlaylist
  };
};
