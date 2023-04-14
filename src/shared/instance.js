// import axios from 'axios';
// import { cookies } from './cookie';

// const instance = axios.create({
//   baseURL: 'http://3.34.179.86/',
// });

// // //응답받고 실행
// // instance.interceptors.response.use(
// //   (response) => {
// //     return response;
// //   },
// //   async (error) => {
// //     const originalRequest = error.config;

// //     if (error.response.status === 401 && !originalRequest._retry) {
// //       originalRequest._retry = true;

// //       // 리프레시 토큰을 가져옵니다.
// //       const refreshToken = localStorage.getItem('refresh_token');

// //     }

// //     return Promise.reject(error);
// //   },
// // );

// // export default instance;
// // 요청 전에 헤더에 리프레시 토큰 추가
// instance.interceptors.request.use((config) => {
//   const refreshToken = localStorage.getItem('refresh_token');
//   if (refreshToken) {
//     config.headers.refresh_token = Bearer`${refreshToken}`;
//   }
//   return config;
// });

// // 응답 처리
// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       // 리프레시 토큰을 가져옵니다.
//       const refreshToken = localStorage.getItem('refresh_token');
//     }

//     return Promise.reject(error);
//   },
// );

// export default instance;
