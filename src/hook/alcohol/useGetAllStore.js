import React from 'react';
import { apis } from '@shared/axios';
import { cookies } from '@shared/cookie';
import { keys } from '@utils/createQueryKey';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const access_token = cookies.get('access_token');
const PAGE_SIZE = 16;

export const getAllStore = async (pageNum, keyword, activeTab) => {
  const params = {
    page: pageNum,
    size: 16,
  };
  if (keyword !== undefined) {
    params.placeName = keyword;
    params.categoryName = keyword;
    params.addressName = keyword;
    params.roadAddressName = keyword;
  }
  const response = await apis.get(`/alkol/all`, { params });
  return response.data;
};
// export const getAllStore = async ({ pageNum, keyword, activeTab }) => {
//   const params = {
//     page: pageNum,
//     size: 16,
//   };
//   if (keyword !== undefined) {
//     params.placeName = keyword;
//     params.categoryName = keyword;
//     params.addressName = keyword;
//     params.roadAddressName = keyword;
//   }
//   const { data, isLoading } = await apis.get(`/alkol/all`);
//   return { storeData: data, storeIsLoading: isLoading };
// };

// export const useAllStore = ({ pageNum, keyword, activeTab }) => {
//   const { data, isLoading } = getAllStore({ pageNum, keyword, activeTab });
//   return { storeAllData: data, storeIsLoading: isLoading };
// };

export const getBest = async (pageNum, keyword, storeListPage) => {
  //  const queryClient = useQueryClient();
  const response = await apis.get(
    `/alkol/best?page=${pageNum}&size=16&placeName=${keyword}&categoryName=${keyword}&addressName=${keyword}&roadAddressName=${keyword}`,
    {},
  );
  return response.data;
};

export const getView = async (pageNum, keyword, activeTab) => {
  //const queryClient = useQueryClient();
  const response = await apis.get(`/alkol/view?page=${pageNum}&size=16`, {
    params: {
      placeName: keyword,
      categoryName: keyword,
      addressName: keyword,
      roadAddressName: keyword,
    },
  });
  return response.data;
};

export const getLike = async (pageNum, keyword) => {
  // const queryClient = useQueryClient();
  const response = await apis.get(`/alkol/like?page=${pageNum}&size=16`, {
    params: {
      placeName: keyword,
      categoryName: keyword,
      addressName: keyword,
      roadAddressName: keyword,
    },
  });
  return response.data;
};
