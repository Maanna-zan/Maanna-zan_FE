import React from 'react';
import { useState } from 'react';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useDeletePost } from '../../hook/post/useDeletePost';
import { useUpdatePost } from '../../hook/post/useUpdatePost';
import { useRouter } from 'next/router';

export const Post = ({ post, onSubmit }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [newPost, setNewPost] = useState({
    storename: post.storename,
    title: post.title,
    description: post.description,
    image: post.image,
    // apiId: post.apiId,
  });

  const { deletePost } = useDeletePost();
  const { updatePost } = useUpdatePost();

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
  const router = useRouter(); // initialize the router instance
  return (
    <div>
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
            {/* <div>
              <label htmlFor="apiId">API ID:</label>
              <input
                type="text"
                id="apiId"
                name="apiId"
                value={newPost.apiId}
                onChange={changeInputHandler}
              />
            </div> */}
            <button type="submit">수정완료</button>
          </form>
        </>
      ) : (
        <>
          <div>{post?.storename}</div>
          <div>{post?.title}</div>
          <div>{post?.description}</div>
          <button onClick={() => setIsEditMode(!isEditMode)}>수정</button>
          <button onClick={() => deletePostHandler(post.id)}>삭제</button>

          {/* <button
            onClick={() => {
              router.push(`/community/add`);
            }}
          >
            글작성하기
          </button> */}
        </>
      )}
    </div>
  );
};
