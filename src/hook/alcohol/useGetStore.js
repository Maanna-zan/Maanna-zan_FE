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
        headers: {
          access_token: `${access_token}`,
        },
      });
      console.log('useGetStore_data--------------', data);
      console.log(' data.data.commentList', data);
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
