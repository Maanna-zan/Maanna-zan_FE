import React from 'react';
import { cookies } from '@shared/cookie';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apis } from '@shared/axios';

export const usePutLike = () => {
  const access_token = cookies.get('access_token');
  const { mutate: likePost } = useMutation(
    (postId) =>
      apis.put(`/bar/like/${postId}`, null, {
        headers: {
          access_token: `${access_token}`,
        },
      }),
    {
      onError: (error, postId, previousPost) => {
        queryClient.setQueryData(['post', postId], previousPost);
      },
      onMutate: (postId) => {
        const previousPost = queryClient.getQueryData(['post', postId]);
        queryClient.setQueryData(['post', postId], (old) => ({
          ...old,
          like: !old?.like,
          likecnt: old?.like ? old?.likecnt - 1 : old?.likecnt + 1,
        }));
        return previousPost;
      },
      onSettled: (data, error, postId, previousPost) => {
        if (error) {
          queryClient.setQueryData(['post', postId], previousPost);
        } else {
          queryClient.invalidateQueries(['post', postId]);
        }
      },
    },
  );
  return {
    likePost,
  };
};
