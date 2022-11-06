import axios from 'axios';
import qs from 'qs';
import { Buffer } from 'buffer';

const client_id = '330697a441ab4628898c9da7100cec1c';
const client_secret = '1262462879dd460c87c530c32e26a6e7';

const auth_token = Buffer.from(`${client_id}:${client_secret}`).toString(
  'base64'
);

export const getAuth = async () => {
  try {
    const token_url = 'https://accounts.spotify.com/api/token';
    const data = qs.stringify({ grant_type: 'client_credentials' });

    const response = await axios.post(token_url, data, {
      headers: {
        Authorization: `Basic ${auth_token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return response.data.access_token;
  } catch (error) {
    console.log(error);
  }
};
