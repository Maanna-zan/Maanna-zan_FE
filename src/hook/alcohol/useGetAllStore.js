import React from 'react';
import { apis } from '@shared/axios';
import { cookies } from '@shared/cookie';
import { keys } from '@utils/createQueryKey';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const access_token = cookies.get('access_token');
const PAGE_SIZE = 16;

export const getAllStore = async (pageNum, keyword, activeTab, pageSize) => {
  const params = {
    page: pageNum,
    // size: response.data.totalElements,
  };
  if (keyword !== undefined) {
    params.placeName = keyword;
    params.categoryName = keyword;
    params.addressName = keyword;
    params.roadAddressName = keyword;
  }
  const response = await apis.get(`/alkol/all`, { params });
  console.log('데이터size', response.data);
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
    `/alkol/best?page=${pageNum}&size=100&placeName=${keyword}&categoryName=${keyword}&addressName=${keyword}&roadAddressName=${keyword}`,
    {},
  );
  return response.data;
};

export const getView = async (pageNum, keyword, activeTab) => {
  //const queryClient = useQueryClient();
  const response = await apis.get(`/alkol/view?page=${pageNum}&size=205`, {
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
  const response = await apis.get(`/alkol/like?page=${pageNum}&size=205`, {
    params: {
      placeName: keyword,
      categoryName: keyword,
      addressName: keyword,
      roadAddressName: keyword,
    },
  });
  return response.data;
};

import { useEffect, useState } from 'react';

export const useGetAutoKeyword = (keyword) => {
  const [aoutoKeyword, setStoreListAoutoKeyword] = useState([]);
  const [isKeywordLoading, setIsKeywordLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsKeywordLoading(true);
      try {
        const data = await getAllStore(keyword);
        setStoreListAoutoKeyword(data);
      } catch (error) {
        setError(error);
      }
      setIsKeywordLoading(false);
    };

    if (keyword !== '') {
      fetchData();
    } else {
      setStoreListAoutoKeyword([]);
    }
  }, [keyword]);

  return [aoutoKeyword, isKeywordLoading, error];
};
