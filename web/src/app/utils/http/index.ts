import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

export interface APIResponseType{
  isSuccess: boolean,
  isFailure: boolean
  data: unknown
}

export const instance = axios.create({
  withCredentials: true,
});

instance.interceptors.response.use((response: AxiosResponse) => {
  return response;
});

instance.interceptors.request.use(
  function (config) {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);