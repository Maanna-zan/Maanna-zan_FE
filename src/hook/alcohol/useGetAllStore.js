import React from 'react';
import { apis } from '@shared/axios';
import { cookies } from '@shared/cookie';
import { keys } from '@utils/createQueryKey';
import { useQuery } from '@tanstack/react-query';
export const useGetAllStore = (page = 1, size = 16) => {
  const access_token = cookies.get('access_token');

  const { data, isLoading, isError } = useQuery({
    queryKey: [keys.GET_ALCOHOLS, page, size],
    queryFn: async () => {
      const data = await apis.get(`/alkol/all?page=${page}&size=${size}`, {
        headers: {
          access_token: `${access_token}`,
        },
      });
      console.log('data.data.alcoholList', data.data);
      return data.data;
    },
  });
  if (isLoading) {
    return { storeAll: [], storeIsAllLoading: true };
  }

  if (isError) {
    return { storeAll: [], storeIsAllLoading: false };
  }
  return { storeAll: data, storeIsAllLoading: isLoading };
};
