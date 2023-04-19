import React from 'react';
import { useState } from 'react';
import {
  QueryClient,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';
import { useDeletePost } from '../../hook/post/useDeletePost';
import { useUpdatePost } from '../../hook/post/useUpdatePost';
// import { usePutLike } from '../../hook/post/usePutLike';
import { useRouter } from 'next/router';
import { LikeHeartIcon, DisLikeHeartIcon } from '@components/Atoms/HeartIcon';
import { WebWrapper } from '@components/Atoms/Wrapper';
import { apis } from '@shared/axios';
import { cookies } from '@shared/cookie';
import LikeButton from '../../hook/useLikeBtn';
export const Post = ({ post, onSubmit, apiId }) => {
  // console.log('newPost', post);

  const [newPost, setNewPost] = useState({
    storename: post.storename,
    title: post.title,
    description: post.description,
    image: post.image,
    apiId: apiId,
    likecnt: post.likecnt,
    like: post.like,
    check: post.check,
    soju: post.soju,
    beer: post.beer,
    x: post.x,
    y: post.y,
  });
  const queryClient = useQueryClient();

  const access_token = cookies.get('access_token');
  const refresh_token = cookies.get('refresh_token');

  const { deletePost } = useDeletePost();
  const { updatePost } = useUpdatePost();

  const deletePostHandler = (id) => {
    deletePost(id);
    //router.reload(); 500에러
  };
  const changeInputHandler = (e) => {
    const { value, name } = e.target;
    setNewPost((pre) => ({ ...pre, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePost({ newPost, id: post.id });
    setIsEditMode(false);
  };

  //
  //
  // const { mutate: likePost } = useMutation(
  //   (postId) =>
  //     apis.put(`/posts/like/${postId}`, null, {
  //       headers: {
  //         // access_token: access_token,
  //         access_token: `${access_token}`,
  //         //refresh_token: `${refresh_token}`,
  //       },
  //     }),
  //   {
  //     onError: (error, postId, previousPost) => {
  //       queryClient.setQueryData(['post', postId], previousPost);
  //     },
  //     onMutate: (postId) => {
  //       const previousPost = queryClient.getQueryData(['post', postId]);
  //       queryClient.setQueryData(['post', postId], (old) => ({
  //         ...old,
  //         like: !old?.like,
  //         likecnt: old?.like ? old?.likecnt - 1 : old?.likecnt + 1,
  //       }));
  //       return previousPost;
  //     },
  //     onSettled: (data, error, postId, previousPost) => {
  //       if (error) {
  //         queryClient.setQueryData(['post', postId], previousPost);
  //       } else {
  //         queryClient.invalidateQueries(['post', postId]);
  //       }
  //     },
  //   },
  // );

  // const [like, setLike] = useState(post.like);

  // const handleLike = () => {
  //   const postId = post.id;
  //   const cachedPost = queryClient.getQueryData(['post', postId]);

  //   // Optimistically update the cached post data
  //   queryClient.setQueryData(['post', postId], (old) => ({
  //     ...old,
  //     like: !like,
  //     likecnt: like ? old?.likecnt - 1 : old?.likecnt + 1,
  //   }));
  //   setLike(!like);

  //   likePost(postId, {
  //     onSuccess: () => {
  //       // If the request succeeds, the updated data will be refetched from the server
  //       queryClient.invalidateQueries(['post', postId]);
  //     },
  //     onError: () => {
  //       // If the request fails, roll back the optimistic update
  //       queryClient.setQueryData(['post', postId], cachedPost);
  //       setLike(like);
  //     },
  //   });
  // };
  // const [isEditMode, setIsEditMode] = useState(false);
  // const [content, setContent] = useState(post.content); // content state 추가

  return (
    <WebWrapper>
      {isEditMode ? (
        <>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="storename">상점명:</label>
              <input
                type="text"
                id="storename"
                name="storename"
                value={newPost.storename}
                onChange={changeInputHandler}
              />
            </div>
            <div>
              <label htmlFor="title">제목:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newPost.title}
                onChange={changeInputHandler}
              />
            </div>
            <div>
              <label htmlFor="description">설명:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={newPost.description}
                onChange={changeInputHandler}
              />
            </div>
            <div>
              <label htmlFor="image">이미지:</label>
              <input
                type="text"
                id="image"
                name="image"
                value={newPost.image}
                onChange={changeInputHandler}
              />
            </div>
            <button type="submit">수정완료</button>
          </form>
        </>
      ) : (
        <>
          <div>
            가게이름
            <p>{post?.storename}</p>
          </div>
          <h5>제목</h5>
          <div>{post?.title}</div>
          <h5>내용</h5>
          <div>{post?.description}</div>
          <div>{post?.likecnt}</div>
          <div>{post?.like}</div>
          <div>{post.likecnt}</div>
          <img src={post.image} alt={post.storename} />
          <div>{post.description}</div>
          <div>nickname---{post?.nickname}</div>
          <button onClick={() => setIsEditMode(!isEditMode)}>수정</button>
          <button onClick={() => deletePostHandler(post.id)}>삭제</button>
          {/* <div className="hearWrap" onClick={() => handleLike(post?.id)}>
            {like ? <LikeHeartIcon /> : <DisLikeHeartIcon />}
          </div> */}
          <LikeButton post={post}></LikeButton>
        </>
      )}
    </WebWrapper>
  );
};
