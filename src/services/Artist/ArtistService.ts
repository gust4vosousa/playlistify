import axios from 'axios';
import { getAuth } from '../Auth/AuthService';

export const getArtist = async (id: string) => {
  const access_token = await getAuth();

  const api_url = `https://api.spotify.com/v1/artists/${id}`;

  try {
    const response = await axios.get(api_url, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
