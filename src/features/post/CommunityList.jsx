import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { GrideGapCol3, GrideGapCol4 } from '@components/Atoms/Grid';
import { BoxTextReal } from '@components/Atoms/BoxTextReal';
import { useRouter } from 'next/router';
import { WebWrapper } from '@components/Atoms/Wrapper';
import { Post } from './Post';
import { apis } from '../../shared/axios';
import { useState } from 'react';
// import 생략
import { cookies } from '../../shared/cookie';
import { LikeHeartIcon } from '@components/Atoms/HeartIcon';
import { useGetPost, useGetLikePost } from '../../hook/post/useGetPost';
import {
  ImgCenter,
  ImgWrapper282x248,
  ImgWrapper384x360,
  ImgWrapper282x200,
} from '@components/Atoms/imgWrapper';
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
const CommunityList = () => {
  const go = useRouter();

  const token = cookies.get('refresh_token');
  const { query } = useRouter();
  const { postsLike, postIsLikeLoading } = useGetLikePost();
  const { posts, postIsLoading } = useGetPost();
  let potLikeMatch = [];
  if (postsLike && postsLike.data && postsLike.data.posts) {
    potLikeMatch = postsLike.data.posts;
  }
  const postLikeMine =
    potLikeMatch.find((p) => p.id === Number(query.id)) || {};
  if (postIsLikeLoading || postIsLoading) return <div>로딩중...</div>;

  return (
    <>
      <WebWrapper style={{ marginBottom: '80px' }}>
        <StHeade3_name style={{ marginBottom: '24px' }}>
          이번주 인기글
        </StHeade3_name>
        <GrideGapCol3>
          {posts?.data?.map((store) => (
            <div
              key={store?.id}
              onClick={() => {
                go.push(`/community/${store.id}`);
              }}
            >
              <BoxTextReal
                style={{ overflow: 'hidden' }}
                variant="realDefaultBox"
                size="nonePadding"
              >
                <ImgWrapper384x360>
                  <ImgCenter
                    style={{
                      width: '100%',
                      height: '100%',
                      overflow: 'hidden',
                      borderRadius: '8px',
                    }}
                    src={store.s3Url ? store.s3Url : '/noimage_282x248_.png'}
                    alt="store"
                  />
                </ImgWrapper384x360>
              </BoxTextReal>
              <StPlace_name>{store?.place_name}</StPlace_name>
            </div>
          ))}
        </GrideGapCol3>
        <StHeade3_name> 포스트 리뷰글</StHeade3_name>
        <GrideGapCol4 style={{ margin: '12px auto' }}>
          {console.log('posts', posts)}
          {posts.map((post) => (
            <Post
              post={post}
              key={post.id}
              postId={post.id}
              apiId={post.id}
              style={{position: 'relative'}}
              // onClick={() => {
              //   go.push(`/post/${post.id}`);
              // }}
            ></Post>
          ))}
        </GrideGapCol4>
      </WebWrapper>
    </>
  );
};

export default CommunityList;
