import {
  useQueryClient,
  useMutation,
  useQueryCache,
} from '@tanstack/react-query';
import { cookies } from '@shared/cookie';
import { apis } from '@shared/axios';
import { useState } from 'react';

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
      onError: (error, apiId, previousPost) => {
        queryClient.setQueryData(['store', apiId], previousPost);
      },
      onMutate: (apiId) => {
        const previousPost = queryClient.getQueryData(['store', apiId]);
        queryClient.setQueryData(['store', apiId], (old) => ({
          ...old,
          roomLike: !old?.roomLike,
          roomLikecnt: old?.roomLike ? old?.roomLikecnt - 1 : old?.roomLikecnt + 1,
        }));
        return previousPost;
      },
      onSettled: (data, error, apiId, previousPost) => {
        if (error) {
          queryClient.setQueryData(['store', apiId], previousPost);
        } else {
          queryClient.invalidateQueries(['store', apiId]);
        }
      },
    },
  );

  return { likeStore };
};

// export const useGetLikePost = () => {
//   const token = cookies.get('access_token');

//   const { data, isLoading, isError } = useQuery({
//     queryKey: keys.GET_LIKE_POSTS,
//     queryFn: async () => {
//       const data = await apis.get('/posts/best', {
//         // headers: {
//         //   access_token: `${token}`,
//         // },
//       });
//       //console.log('useGetLikePost--------------', data);
//       return data.data;
//     },
//   });
//   if (isLoading) {
//     return { postsLike: data, postIsLoading: true };
//   }

//   if (isError) {
//     return { postsLike: data, postIsLikeLoading: false };
//   }
//   return { postsLike: data, postIsLikeLoading: isLoading };
// };

// export const useLikeStore = () => {
//   const queryClient = useQueryClient();
//   const access_token = cookies.get('access_token');
//   const [roomLike, setRoomLike] = useState(false); // 초기값을 false로 설정합니다.
//   const { mutate: likeStore } = useMutation(
//     (apiId) =>
//       apis.put(`/bar/like/${apiId}`, null, {
//         headers: {
//           access_token: `${access_token}`,
//         },
//       }),
//     {
//       onError: (error, apiId, previousStore) => {
//         queryClient.setQueryData(['store', apiId], previousStore);
//       },
//       onMutate: (apiId) => {
//         const previousStore = queryClient.getQueryData(['store', apiId]);
//         queryClient.setQueryData(['store', apiId], (old) => ({
//           ...old,
//           roomLike: !old?.roomLike,
//           roomLikecnt: old?.like ? old?.roomLikecnt - 1 : old?.roomLikecnt + 1,
//         }));
//         setLike((prevLike) => !prevLike); // 이전 `like` 값을 반전시킵니다.
//         return previousStore;
//       },
//       onSettled: (data, error, apiId, previousStore) => {
//         if (error) {
//           queryClient.setQueryData(['store', apiId], previousStore);
//           setLike(previousStore?.roomLike); // 이전 `roomLike` 값을 사용하여 `like` 값을 다시 설정합니다.
//         } else {
//           queryClient.invalidateQueries(['store', apiId]);
//         }
//       },
//     },
//   );

//   const handleLike = (apiId) => {
//     likeStore(apiId);
//   };

//   return { roomLike, handleLike }; // `like` 상태 값과 `handleLike` 함수를 함께 반환합니다.
// };
// export const useLikeStore = () => {
//   const queryClient = useQueryClient();
//   const access_token = cookies.get('access_token');
//   const { mutate: likeStore } = useMutation(
//     (apiId) =>
//       apis.put(`/bar/like/${apiId}`, null, {
//         headers: {
//           access_token: `${access_token}`,
//         },
//       }),
//     {
//       onError: (error, apiId, previousStore) => {
//         queryClient.setQueryData(['store', apiId], previousStore);
//       },
//       onMutate: (apiId) => {
//         const previousStore = queryClient.getQueryData(['store', apiId]);
//         queryClient.setQueryData(['store', apiId], (old) => ({
//           ...old,
//           roomLike: !old?.roomLike,
//           roomLikecnt: old?.like ? old?.roomLikecnt - 1 : old?.roomLikecnt + 1,
//         }));
//         return previousStore;
//       },
//       onSettled: (data, error, apiId, previousStore) => {
//         if (error) {
//           queryClient.setQueryData(['store', apiId], previousStore);
//         } else {
//           queryClient.invalidateQueries(['store', apiId]);
//         }
//       },
//     },
//   );

//   return { likeStore };
// };
