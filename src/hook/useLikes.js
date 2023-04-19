import { useQueryClient, useMutation } from '@tanstack/react-query';
import { cookies } from '@shared/cookie';
import { apis } from '@shared/axios';

export const useLikePost = () => {
  const queryClient = useQueryClient();
  const access_token = cookies.get('access_token');
  const { mutate: likePost } = useMutation(
    (postId) =>
      apis.put(`/posts/like/${postId}`, null, {
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

  return { likePost };
};
export const useLikeStore = () => {
  const queryClient = useQueryClient();
  const access_token = cookies.get('access_token');
  const { mutate: likeStore } = useMutation(
    (apiId) =>
      apis.put(`/bar/like/${apiId}`, null, {
        headers: {
          access_token: `${access_token}`,
        },
      }),
    {
      onError: (error, apiId, previousStore) => {
        queryClient.setQueryData(['store', apiId], previousStore);
      },
      onMutate: (apiId) => {
        const previousStore = queryClient.getQueryData(['store', apiId]);
        queryClient.setQueryData(['store', apiId], (old) => ({
          ...old,
          roomLike: !old?.roomLike,
          roomLikecnt: old?.like ? old?.roomLikecnt - 1 : old?.roomLikecnt + 1,
        }));
        return previousStore;
      },
      onSettled: (data, error, apiId, previousStore) => {
        if (error) {
          queryClient.setQueryData(['store', apiId], previousStore);
        } else {
          queryClient.invalidateQueries(['store', apiId]);
        }
      },
    },
  );

  return { likeStore };
};
