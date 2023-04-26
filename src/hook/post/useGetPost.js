import React from 'react';
import { apis } from '@shared/axios';
import { keys } from '@utils/createQueryKey';
import { useQuery } from '@tanstack/react-query';
import { cookies } from '@shared/cookie';

export const useGetPost = () => {
  const access_token = cookies.get('access_token');

  const { data, isLoading, isError } = useQuery({
    queryKey: keys.GET_POSTS,
    queryFn: async () => {
      const data = await apis.get('/posts', {
        // headers: {
        //   access_token: `${access_token}`,
        // },
      });
      console.log('useGetLikePostgidata--------------', data);

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

export const useGetLikePost = () => {
  const access_token = cookies.get('access_token');

  const { data, isLoading, isError } = useQuery({
    queryKey: keys.GET_LIKE_POSTS,
    queryFn: async () => {
      const data = await apis.get('/my-page/likePost', {
        headers: {
          access_token: `${access_token}`,
        },
      });
      console.log('useGetLikePost--------------', data);
      return data.data;
    },
  });
  if (isLoading) {
    return { postsLike: data, postIsLoading: true };
  }

  if (isError) {
    return { postsLike: data, postIsLikeLoading: false };
  }
  return { postsLike: data, postIsLikeLoading: isLoading };
};
