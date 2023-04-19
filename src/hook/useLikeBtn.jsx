import { useState } from 'react';
import {
  QueryClient,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';
import { LikeHeartIcon, DisLikeHeartIcon } from '@components/Atoms/HeartIcon';

function LikeButton({ post }) {
  const queryClient = useQueryClient();
  const [like, setLike] = useState(post.like);

  const { mutate: likePost } = useMutation(
    (postId) =>
      apis.put(`/posts/like/${postId}`, null, {
        headers: {
          access_token: cookies.get('access_token'),
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

  const handleLike = () => {
    const postId = post.id;
    const cachedPost = queryClient.getQueryData(['post', postId]);

    // Optimistically update the cached post data
    queryClient.setQueryData(['post', postId], (old) => ({
      ...old,
      like: !like,
      likecnt: like ? old?.likecnt - 1 : old?.likecnt + 1,
    }));
    setLike(!like);

    likePost(postId, {
      onSuccess: () => {
        // If the request succeeds, the updated data will be refetched from the server
        queryClient.invalidateQueries(['post', postId]);
      },
      onError: () => {
        // If the request fails, roll back the optimistic update
        queryClient.setQueryData(['post', postId], cachedPost);
        setLike(like);
      },
    });
  };

  return (
    <button onClick={handleLike}>
      {like ? <LikeHeartIcon /> : <DisLikeHeartIcon />}
    </button>
  );
}

export default LikeButton;
