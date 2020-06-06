import axios, { AxiosResponse, Method } from 'axios';

const HEADERS = {
  'Content-Type': 'application/json'
};

export const makeRequest = (
  url: string,
  method?: Method,
  payload?: Object
): Promise<AxiosResponse> => {
  return axios(url, {
    method: method || 'GET',
    data: payload,
    headers: HEADERS
  });
};
