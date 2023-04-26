import React from 'react';
import { apis } from '@shared/axios';
import { cookies } from '@shared/cookie';
import { keys } from '@utils/createQueryKey';
import { useQuery } from '@tanstack/react-query';

export const useGetStoredetail = ({ apiId }) => {
  const access_token = cookies.get('access_token');
  ('refresh_token');

  const { data, isLoading, isError } = useQuery({
    queryKey: [keys.GET_ALCOHOLS, apiId],

    queryFn: async () => {
      const data = await apis.get(`/alkol/${apiId}`, {
        // headers: {
        //   access_token: `${access_token}`,
        // },
      });
      return data.data;
    },
  });
  if (isLoading) {
    return { store: [], storeIsLoading: true };
  }

  if (isError) {
    return { store: [], storeIsLoading: false };
  }
  return { store: data, storeIsLoading: isLoading };
};

export const useGetLikeStore = () => {
  const access_token = cookies.get('access_token');

  const { data, isLoading, isError } = useQuery({
    queryKey: keys.GET_LIKE_POSTS,
    queryFn: async () => {
      const data = await apis.get('/my-page/likeAlkol', {
        headers: {
          access_token: `${access_token}`,
        },
      });
      console.log('likeAlkol--------------', data);
      return data.data;
    },
  });
  if (isLoading) {
    return { alkolsLike: data, alkolsIsLoading: true };
  }

  if (isError) {
    return { alkolsLike: data, alkolsIsLikeLoading: false };
  }
  return { alkolsLike: data, alkolsIsLikeLoading: isLoading };
};
