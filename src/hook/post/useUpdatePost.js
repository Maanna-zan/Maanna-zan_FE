import React from 'react';
import { cookies } from '@shared/cookie';
import { apis } from '@shared/axios';
import { keys } from '@utils/createQueryKey';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export const useUpdatePost = () => {
  const access_token = cookies.get('access_token');
  const refresh_token = cookies.get('refresh_token');
  const queryClient = useQueryClient();
  const { mutate: updatePost } = useMutation({
    mutationFn: async ({ id, newPost }) => {
      const response = await apis.patch(`/posts/${id}`, newPost, {
        headers: {
          'Content-Type': 'application/json',
          access_token: `${access_token}`,
          // refresh_token: `${refresh_token}`,
        },
      });
      queryClient.invalidateQueries(keys.GET_POSTS);
      return response.data;
    },
  });
  return {
    updatePost,
  };
};
