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
import { PageNation } from '@components/Modals/PageNation';
import { BoxTextReal } from '@components/Atoms/BoxTextReal';
import { LightTheme } from '@components/Themes/theme';
import { FlexRow } from '@components/Atoms/Flex';
import styled from 'styled-components';
import { GrideGapCol4 } from '@components/Atoms/Grid';
import {
  ImgWrapper242x248,
  ImgWrapper282x248,
  ImgWrapper282x200,
  ImgCenter,
} from '@components/Atoms/imgWrapper';
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
    <>
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
            style={{ position: 'relative' }}
            // onClick={() => {
            //   go.push(`/community/${post.id}`);
            // }}
          >
            {/* <div className="hearWrap" onClick={() => handleLike(post?.id)}>
            {like ? <LikeHeartIcon /> : <DisLikeHeartIcon />}
          </div> */}
            <div
              post={post}
              style={{
                position: 'absolute',
                right: '16px',
                top: '6px',
                zIndex: '10',
              }}
              onClick={() => handleLike(post?.id)}
            >
              {like ? <LikeHeartIcon /> : <DisLikeHeartIcon />}
            </div>
            <div
              onClick={() => {
                go.push(`/community/${post?.id}`);
              }}
            >
              <BoxTextReal
                style={{
                  gridColumn: 'span 1',
                  gridRow: 'span 1',
                  height: '318px',
                }}
                variant="realDefaultBox"
                size="nonePadding"
              >
                <BoxTextReal
                  style={{ overflow: 'hidden' }}
                  variant="realDefaultBox"
                  size="nonePadding"
                >
                  <ImgWrapper282x200 style={{ position: 'relative' }}>
                    <ImgCenter
                      style={{
                        height: '100%',
                        width: '100%',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        objectFit: 'cover',
                      }}
                      src={post.s3Url || '/noimage_282x248_.png'}
                      alt="store"
                    />
                  </ImgWrapper282x200>
                </BoxTextReal>
                <StPlace_name>{post.place_name}</StPlace_name>
                <StAddress_name>{post.title}</StAddress_name>
                <div>{post.id}</div>
                {/* <Store store={store} storeData={storeData}></Store> */}
                <div>{post?.nickname}</div>
                {/* <button onClick={() => setIsEditMode(!isEditMode)}>수정</button>
              <button onClick={() => deletePostHandler(post.id)}>삭제</button>
              <div className="hearWrap" onClick={() => handleLike(post?.id)}>
                <div post={post}>
                  {like ? <LikeHeartIcon /> : <DisLikeHeartIcon />}
                </div>
              </div> */}
              </BoxTextReal>
            </div>
          </div>
        </>
      )}
    </>
  );
};
const StHeade3_name = styled.div`
  margin-top: 48px;
  font: var(--head3-bold) normal sans-serif;
`;
const StPlace_name = styled.div`
  margin-top: 20px;
  font: var(--title1-semibold) normal sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StAddress_name = styled.div`
  font: var(--body1-medium) normal sans-serif;
`;
