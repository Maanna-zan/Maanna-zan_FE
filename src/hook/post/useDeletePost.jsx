import { useRouter } from 'next/router';

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { cookies } from '../../shared/cookie';
import { apis } from '../../shared/axios';
import { keys } from '@utils/createQueryKey';

export const useDeletePost = () => {
  const access_token = cookies.get('access_token');
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: deletePost, onSuccess } = useMutation(
    (postId) =>
      apis.delete(`/posts/${postId}`, {
        access_token: `${access_token}`,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(keys.GET_POSTS_DELETE);
        alert('게시글 삭제하셨습니다!');
        router.push('/community');
      },
    },
  );

  return {
    deletePost,
  };
};
