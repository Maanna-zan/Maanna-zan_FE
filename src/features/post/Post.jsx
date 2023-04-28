import React from 'react';
import { useState, useEffect } from 'react';
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
import { cookies } from '@shared/cookie';
import styled from 'styled-components';
import { GrideGapCol4 } from '@components/Atoms/Grid';
import {
  ImgWrapper242x248,
  ImgWrapper282x248,
  ImgWrapper282x200,
  ImgCenter,
} from '@components/Atoms/imgWrapper';
import { apis } from '@shared/axios';
import { useGetLikePost } from '../../hook/post/useGetPost';
export const Post = ({ post, onSubmit, apiId, postId }) => {
  const go = useRouter();
  const router = useRouter();
  const { id } = router.query;

  const { postsLike, postIsLikeLoading } = useGetLikePost();

  let potLikeMatch = [];
  if (postsLike && postsLike.data && postsLike.data.posts) {
    potLikeMatch = postsLike.data.posts;
  }
  const postLikeMine = potLikeMatch.find((p) => p.id === Number(postId)) || {};
  const { likePost } = useLikePost();

  const [like, setLike] = useState(postLikeMine.like);

  const likePostHandler = async (postId) => {
    try {
      await likePost(postId);
      setLike(!like);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   // 게시물 가져오기
  //   async function fetchPost() {
  //     const response = await apis.get(`/posts/${id}`, {
  //       headers: {
  //         access_token: `${access_token}`,
  //         // refresh_token: `${refresh_token}`,
  //       },
  //     });
  //     const post = response.data;
  //     setPost(post);
  //   }
  //   fetchPost();
  // }, [id]);

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <div
        post={post}
        style={{
          position: 'absolute',
          right: '16px',
          top: '16px',
          zIndex: '10',
          padding: '10px',
        }}
        onClick={() => likePostHandler(postId)}
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
                  objectFit: '',
                  zIndex: '1',
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
          {/* <div className="hearWrap" onClick={() => handleLike(post?.id)}>
            <div post={post}>
              {like ? <LikeHeartIcon /> : <DisLikeHeartIcon />}
            </div>
          </div> */}
        </BoxTextReal>
      </div>
    </div>
  );
};
const StHeade3_name = styled.div`
  margin-top: 48px;
  font: var(--head3-bold) 'Pretendard' sans-serif;
`;
const StPlace_name = styled.div`
  margin-top: 20px;
  font: var(--title1-semibold) 'Pretendard' sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StAddress_name = styled.div`
  font: var(--body1-medium) 'Pretendard' sans-serif;
`;
