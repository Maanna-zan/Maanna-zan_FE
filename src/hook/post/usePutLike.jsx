// import React from 'react';
// import { useState } from 'react';
// import { cookies } from '@shared/cookie';
// import {
//   QueryClient,
//   useQueryClient,
//   useMutation,
// } from '@tanstack/react-query';

// export const usePutLike = () => {
//   const token = cookies.get('refresh_token');
//   const queryClient = useQueryClient();
//   const { mutate: likePost } = useMutation(
//     (postId) =>
//       apis.post(`/posts/like/${postId}`, {
//         headers: {
//           refresh_token: `${token}`,
//         },
//       }),
//     {
//       onMutate: (postId) => {
//         const previousPost = queryClient.getQueryData(['post', postId]);
//         if (previousPost) {
//           queryClient.setQueryData(['post', postId], (old) => {
//             return {
//               ...old,
//               like: !old.like,
//               likecnt: old.like ? old.likecnt - 1 : old.likecnt + 1,
//             };
//           });
//         }
//         return previousPost;
//       },
//       onError: (error, postId, previousPost) => {
//         queryClient.setQueryData(['post', postId], previousPost);
//       },
//       onSettled: (data, error, postId) => {
//         queryClient.invalidateQueries(['post', postId]);
//       },
//     },
//   );

//   const toggleLike = (postId) => {
//     likePost(postId, {
//       onSuccess: () => {
//         queryClient.invalidateQueries(['post', postId]);
//       },
//     });
//   };
//   return { toggleLike };
// };
