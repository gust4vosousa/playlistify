import axios, { AxiosRequestConfig } from 'axios';
import { IArtist } from '../../@types/Entity.types';
import { IAuthProps } from '../getAuth/useGetAuthHook.types';
import {
  IArtistSearchResponse,
  IRelatedArtistResponse,
  ITopTracksResponse
} from './useGetArtistsHook.types';

export const useGetArtistsHook = (auth?: IAuthProps) => {
  const headers: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${auth?.token}`
    }
  };

  const getArtist = async (id: string) => {
    const api_url = `${auth?.baseUrl}/artists/${id}`;

    try {
      const response = await axios.get(api_url, headers);

      const data: IArtist = response.data;

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const searchArtists = async (query: string) => {
    const api_url = `${auth?.baseUrl}/search?type=artist&q=${query}`;

    try {
      const response = await axios.get(api_url, headers);

      const data: IArtistSearchResponse = response.data;

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getRelatedArtists = async (id: string) => {
    const api_url = `${auth?.baseUrl}/artists/${id}/related-artists`;

    try {
      const response = await axios.get(api_url, headers);

      const data: IRelatedArtistResponse = response.data;

      return data.artists;
    } catch (error) {
      console.log(error);
    }
  };

  const getArtistTopTracks = async (id: string) => {
    const api_url = `${auth?.baseUrl}/artists/${id}/top-tracks`;

    try {
      const response = await axios.get(api_url, {
        ...headers,
        params: { market: 'BR' }
      });

      const data: ITopTracksResponse = response.data;

      return data.tracks;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getArtist,
    searchArtists,
    getRelatedArtists,
    getArtistTopTracks
  };
};
