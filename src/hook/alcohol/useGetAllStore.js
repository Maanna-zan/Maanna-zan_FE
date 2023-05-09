import React, { useEffect, useState } from 'react';
import { apis } from '@shared/axios';
import { cookies } from '@shared/cookie';
import { keys } from '@utils/createQueryKey';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const access_token = cookies.get('access_token');

// const useGetAllStore = () => {
//   const access_token = cookies.get('access_token');

// const [all, setAll] = useState([]);

// useEffect(() => {
//   const fetchData = async () => {
//     const response = await apis.get(`/alkol/all`);
//     setAll(response.data);
//   };
//   console.log('all', parseInt(all.totalElements));
//   fetchData();
// }, []);

// console.log('getView4', parseInt(all.totalElements));

//   const getAllStore = async (pageNum, keyword, activeTab, totalSize) => {
//     const totalSizeAll = Math.ceil(parseInt(all.totalElements) / 16);
//     const response = await apis.get(
//       `/alkol/all?page=${pageNum}&size=${totalSizeAll}`,
//       {
//         params: {
//           placeName: keyword,
//           categoryName: keyword,
//           addressName: keyword,
//           roadAddressName: keyword,
//         },
//       },
//       console.log(),
//     );
//     return response.data;
//   };
// };
//   return getAllStore;
// };

export const getAllStore = async (pageNum, keyword, totalSize) => {
  const response = await apis.get(
    `/alkol/all?page=${pageNum}&size=${16}&placeName=${keyword}&categoryName=${keyword}&addressName=${keyword}&roadAddressName=${keyword}`,
    {},
  );
  return response.data;
};

export const getBest = async (pageNum, keyword, totalSize) => {
  //  const queryClient = useQueryClient();
  const response = await apis.get(
    `/alkol/best?page=${pageNum}&size=${16}&placeName=${keyword}&categoryName=${keyword}&addressName=${keyword}&roadAddressName=${keyword}`,
    {},
  );
  return response.data;
};

export const getView = async (pageNum, keyword, totalSize) => {
  //const queryClient = useQueryClient();
  const response = await apis.get(`/alkol/view?page=${pageNum}&size=${16}`, {
    params: {
      placeName: keyword,
      categoryName: keyword,
      addressName: keyword,
      roadAddressName: keyword,
    },
  });
  return response.data;
};

export const getLike = async (pageNum, keyword, totalSize) => {
  // const queryClient = useQueryClient();
  const response = await apis.get(`/alkol/like?page=${pageNum}&size=${16}`, {
    params: {
      placeName: keyword,
      categoryName: keyword,
      addressName: keyword,
      roadAddressName: keyword,
    },
  });
  return response.data;
};

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
