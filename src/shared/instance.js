import axios from 'axios';
import { cookies } from './cookie';

const instance = axios.create({

  baseURL: process.env.NEXT_PUBLIC_SERVER_KEY,

instance.interceptors.response.use(
  (response) => {
    const newAccessToken = response.headers.access_token;
    if (newAccessToken) {
      cookies.set('access_token', newAccessToken);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.data.statusCode === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = cookies.get('refresh_token');
      if (refreshToken) {
        headers.refresh_token = `${refreshToken}`;
        const accessToken = response.data.access_token;
        cookies.set('access_token', accessToken);
        originalRequest.headers.cookies = `${accessToken}`;
        return axios(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
