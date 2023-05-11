import React from 'react';
import { cookies } from '@shared/cookie';
import { apis } from '@shared/axios';
import { keys } from '@utils/createQueryKey';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
export const useUpdatePost = (postId) => {
  const access_token = cookies.get('access_token');
  const refresh_token = cookies.get('refresh_token');
  const queryClient = useQueryClient();
  const { mutate: updatePost } = useMutation(
    async (formData) => {
      const response = await apis.patch(`/posts/${postId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          access_token: `${access_token}`,
          // refresh_token: `${refresh_token}`,
        },
      });

      return response.data;
    },
    {
      onSuccess: (data) => {
        alert('게시물 내용이 변경되었습니다.');
        router.push(`/community/${postId}`);
        queryClient.invalidateQueries(keys.GET_POSTS_UPDATE);
        // TODO: onSuccess 콜백 함수에서 필요한 작업 수행
      },
    },
  );

  return {
    updatePost: (formData) => updatePost(formData),
  };
};
