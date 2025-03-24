import axios from 'axios';
import qs from 'querystring';

export const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  // timeout: 15000,
  timeout: 60000,
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  paramsSerializer: {
    serialize: (params) => qs.stringify(params),
  },
});
