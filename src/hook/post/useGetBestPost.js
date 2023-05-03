import React from 'react';
import { apis } from '@shared/axios';
import { keys } from '@utils/createQueryKey';
import { useQuery } from '@tanstack/react-query';

export const useGetBestPost = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: keys.GET_BEST_POSTS,
    queryFn: async () => {
      const data = await apis.get('/posts/best', {});

      return data.data;
    },
  });
  if (isLoading) {
    return { postsBest: data, postIsBestLoading: true };
  }

  if (isError) {
    return { postsBest: data, postIsBestLoading: false };
  }
  return { postsBest: data, postIsBestLoading: isLoading };
};
