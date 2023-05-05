import React from 'react';
import { apis } from '@shared/axios';
import { keys } from '@utils/createQueryKey';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { cookies } from '@shared/cookie';

export const useGetPost = () => {
  const access_token = cookies.get('access_token');
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: keys.GET_POSTS,
    queryFn: async () => {
      const data = await apis.get('/posts', {
        // headers: {
        //   access_token: `${access_token}`,
        // },
      });

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

export const useGetPostdetail = ({ postId }) => {
  const access_token = cookies.get('access_token');
  ('refresh_token');

  const { data, isLoading, isError } = useQuery({
    queryKey: [keys.GET_POSTS_DETAIL, postId],

    queryFn: async () => {
      const data = await apis.get(`/community/${postId}`, {});
      return data.data;
    },
  });
  if (isLoading) {
    return { postDetailData: [], postDetailIsLoading: true };
  }

  if (isError) {
    return { postDetailData: [], postDetailIsLoading: false };
  }
  return { postDetailData: data, postDetailIsLoading: isLoading };
};

// 리뷰포스팅 리스트 조회용  좋아요
export const useGetLikePost = () => {
  const access_token = cookies.get('access_token');
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: keys.GET_LIKE_POSTS,
    queryFn: async () => {
      const data = await apis.get('/my-page/likePost', {
        headers: {
          access_token: `${access_token}`,
        },
      });
      return data.data;
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries(['GET_LIKE_POSTS']);
    // },
  });

  if (isLoading) {
    return { postsLike: data, postIsLoading: true };
  }

  if (isError) {
    return { postsLike: data, postIsLikeLoading: false };
  }
  return { postsLike: data, postIsLikeLoading: isLoading };
};
