import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { cookies } from '../../shared/cookie';
import { apis } from '../../shared/axios';
import { keys } from '@utils/createQueryKey';

export const useDeletePost = () => {
  const token = cookies.get('refresh_token');
  const queryClient = useQueryClient();
  const { mutate: deletePost } = useMutation(
    (id) =>
      apis.delete(`/posts/${id}`, {
        headers: {
          refresh_token: `${token}`,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(keys.GET_POSTS);
      },
    },
  );

  return {
    deletePost,
  };
};
