import React from 'react';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { LikeHeartIcon, DisLikeHeartIcon } from '@components/Atoms/HeartIcon';
import { WebWrapper } from '@components/Atoms/Wrapper';
//hook
import { useDeletePost } from '../../hook/post/useDeletePost';
import { useUpdatePost } from '../../hook/post/useUpdatePost';
import { useLikePost } from '../../hook/useLikes';
import { useRouter } from 'next/router';

export const Post = ({ post, onSubmit, apiId }) => {
  // console.log('newPost', post);
  const go = useRouter();
  const queryClient = useQueryClient();
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
  const [isEditMode, setIsEditMode] = useState(false);

  const { deletePost } = useDeletePost();
  const { updatePost } = useUpdatePost();
  const { likePost } = useLikePost();

  const deletePostHandler = (id) => {
    deletePost(id);
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

  const [like, setLike] = useState(post.like);

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
          <div
            onClick={() => {
              go.push(`/community/${post.id}`);
            }}
          >
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
          <div className="hearWrap" onClick={() => handleLike(post?.id)}>
            <div post={post}>
              {like ? <LikeHeartIcon /> : <DisLikeHeartIcon />}
            </div>
          </div>
        </>
      )}
    </WebWrapper>
  );
};
