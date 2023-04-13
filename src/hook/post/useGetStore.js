import React from 'react';
import { apis } from '@shared/axios';
import { keys } from '@utils/createQueryKey';
import { useQuery } from '@tanstack/react-query';
import { cookies } from '@shared/cookie';
export const useGetPost = (apiId) => {
  const token = cookies.get('access_token');

  const { data, isLoading, isError } = useQuery({
    queryKey: [keys.GET_POSTS, apiId],
    queryFn: async () => {
      const data = await apis.get(`/posts/api?apiId=${apiId}`, {
        headers: {
          access_token: `${token}`,
        },
      });
      console.log('data--------------', data);
      // console.log(' data.data.commentList', data?.data[1].commentList);
      return data.data;
    },
  });
  if (isLoading) {
    return { posts: [], postIsLoading: true };
  }

  if (isError) {
    return { posts: [], postIsLoading: false };
  }
  return { posts: data, postIsLoading: isLoading };
};
