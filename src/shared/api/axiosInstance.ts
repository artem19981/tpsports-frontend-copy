import axios, { AxiosError, AxiosResponse } from 'axios';
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

axiosInstance.interceptors.request.use(
  (config) => {
    console.log('📤 Request:', {
      url: config.url,
      method: config.method?.toUpperCase(),
      data: config.data,
      params: config.params,
    });
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', {
      message: error.message,
      config: error.config,
    });
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('📥 Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error: AxiosError) => {
    console.error('❌ Error Response:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  },
);
