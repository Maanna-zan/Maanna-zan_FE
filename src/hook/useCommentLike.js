export const useCommentLike = () => {
  const access_token = cookies.get('access_token');

  const { data, isLoading, isError } = useQuery({
    queryKey: keys.GET_LIKE_POSTS,
    queryFn: async () => {
      const data = await apis.get('/my-page/likePost', {
        headers: {
          access_token: `${access_token}`,
        },
      });
      return data.data;
    },
  });
  if (isLoading) {
    return { postsLike: data, postIsLoading: true };
  }

  if (isError) {
    return { postsLike: data, postIsLikeLoading: false };
  }
  return { postsLike: data, postIsLikeLoading: isLoading };
};
