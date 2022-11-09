import axios from 'axios';
import qs from 'qs';
import { Buffer } from 'buffer';
import { IAuthProps } from './useGetAuthHook.types';
import { useCallback } from 'react';

const client_id = '330697a441ab4628898c9da7100cec1c';
const client_secret = '1262462879dd460c87c530c32e26a6e7';

const auth_token = Buffer.from(`${client_id}:${client_secret}`).toString(
  'base64'
);

export const useGetAuth = async () => {
  const baseUrl: string = 'https://api.spotify.com/v1';
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const data = qs.stringify({ grant_type: 'client_credentials' });

  const getToken = useCallback(async () => {
    const response = await axios.post(tokenUrl, data, {
      headers: {
        Authorization: `Basic ${auth_token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const token: string = response.data.access_token;

    return token;
  }, [data]);

  const props: IAuthProps = {
    token: await getToken(),
    baseUrl
  };

  return props;
};
