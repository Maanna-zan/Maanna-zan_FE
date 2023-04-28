import axios from 'axios';
import { cookies } from './cookie';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_KEY,
});

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

    const refreshToken = cookies.get('refresh_token');

    // 토큰이 없으면 인터셉터 실행 안함
    if (!refreshToken) {
      return Promise.reject(error);
    }

    if (error.response.data.statusCode === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (refreshToken) {
        headers.refresh_token = `${refreshToken}`;
        const accessToken = response.data.access_token;
        cookies.set('access_token', accessToken);
        originalRequest.headers.cookies = `${accessToken}`;
        return axios(originalRequest);
      }
    }
    if (error.response.data.statusCode === 400 && !originalRequest._retry) {
      originalRequest._retry = true;
      cookies.remove('access_token');
      cookies.remove('refresh_token');
      cookies.remove('nick_name');
      localStorage.removeItem('nick_name');
      alert('로그인 유효 시간이 지났습니다. 다시 로그인 해주십시오');
    }

    return Promise.reject(error);
  },
);

export default instance;
