import React from 'react';
import { apis } from '@shared/axios';
import { cookies } from '@shared/cookie';
import { keys } from '@utils/createQueryKey';
import { useQuery } from '@tanstack/react-query';
const PAGE_SIZE = 16;
const access_token = cookies.get('access_token');

export const getAllStore = async (pageNum) => {
  const response = await apis.get(
    `/alkol/all?page=${pageNum}&size=${PAGE_SIZE}`,
    {
      // headers: {
      //   access_token: `${access_token}`,
      // },
    },
  );
  return response.data;
};

export const getBest = async (pageNum) => {
  const response = await apis.get(
    `/alkol/best?page=${pageNum}&size=${PAGE_SIZE}`,
    {
      // headers: {
      //   access_token: `${access_token}`,
      // },
    },
  );
  return response.data;
};

export const getView = async (pageNum) => {
  const response = await apis.get(
    `/alkol/view?page=${pageNum}&size=${PAGE_SIZE}`,
    {
      // headers: {
      //   access_token: `${access_token}`,
      // },
    },
  );
  return response.data;
};

export const getLike = async (pageNum) => {
  const response = await apis.get(
    `/alkol/like?page=${pageNum}&size=${PAGE_SIZE}`,
    {
      // headers: {
      //   access_token: `${access_token}`,
      // },
    },
  );
  return response.data;
};

// import { useQuery } from '@tanstack/react-query';

// const PAGE_SIZE = 16;
// const access_token = cookies.get('access_token');

// export const useAllStoreQuery = (pageNum) => {
//   return useQuery(
//     ['allStore', pageNum],
//     () =>
//       new Promise((resolve) => {
//         setTimeout(async () => {
//           const data = await getAllStore(pageNum);
//           resolve(data);
//         }, 1000);
//       }),
//   );
// };

// export const useBestQuery = (pageNum) => {
//   return useQuery(
//     ['best', pageNum],
//     () =>
//       new Promise((resolve) => {
//         setTimeout(async () => {
//           const data = await getBest(pageNum);
//           resolve(data);
//         }, 1000);
//       }),
//   );
// };

// export const useViewQuery = (pageNum) => {
//   return useQuery(
//     ['view', pageNum],
//     () =>
//       new Promise((resolve) => {
//         setTimeout(async () => {
//           const data = await getView(pageNum);
//           resolve(data);
//         }, 1000);
//       }),
//   );
// };

// export const useLikeQuery = (pageNum) => {
//   return useQuery(
//     ['like', pageNum],
//     () =>
//       new Promise((resolve) => {
//         setTimeout(async () => {
//           const data = await getLike(pageNum);
//           resolve(data);
//         }, 1000);
//       }),
//   );
// };
