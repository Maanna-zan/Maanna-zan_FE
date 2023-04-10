import React from 'react';
import { cookies } from '@shared/cookie';
import { apis } from '@shared/axios';
import { keys } from '@utils/createQueryKey';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export const useUpdatePost = () => {
  const token = cookies.get('refresh_token');
  const queryClient = useQueryClient();
  const { mutate: updatePost } = useMutation({
    mutationFn: async ({ id, newPost }) => {
      const response = await apis.patch(`/posts/${id}`, newPost, {
        headers: {
          'Content-Type': 'application/json',
          refresh_token: `${token}`,
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
