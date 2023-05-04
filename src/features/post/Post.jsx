import React from 'react';
import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import {
  LikeHeartIcon,
  DisLikeCircleHeartIcon,
  LikeCircleHeartIcon,
} from '@components/Atoms/HeartIcon';
import { WebWrapper } from '@components/Atoms/Wrapper';
//hook
import { useDeletePost } from '../../hook/post/useDeletePost';
import { useUpdatePost } from '../../hook/post/useUpdatePost';
import { useLikePost } from '../../hook/useLikes';
import { useRouter } from 'next/router';
import { PageNation } from '@components/Modals/PageNation';
import { BoxTextReal } from '@components/Atoms/BoxTextReal';
import { LightTheme } from '@components/Themes/theme';
import { FlexColumn, FlexRow } from '@components/Atoms/Flex';
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
      // console.error(error);
    }
  };

  console.log();
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
        {like ? <LikeCircleHeartIcon /> : <DisLikeCircleHeartIcon />}
      </div>
      <div
        onClick={() => {
          router.push(`/community/${post?.id}`);
        }}
      >
        <BoxTextReal
          style={{
            gridColumn: 'span 1',
            gridRow: 'span 1',
            height: '284px',
          }}
          variant="realDefaultBox"
          size="nonePadding"
        >
          <FlexColumn
            style={{
              gap: '8px',
              justifyItems: 'center',
            }}
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

            <StTitle2>{post.title}</StTitle2>
            <FlexRow
              style={{
                justifyContent: 'space-between',
                justifyItems: 'center',
              }}
            >
              <FlexRow style={{ gap: '8px', alignItems: 'center' }}>
                {post.storename}
                <StProfile />
                <StSpanNic>{post?.nickname}</StSpanNic>
              </FlexRow>
              <FlexRow style={{ gap: '8px', alignItems: 'center' }}>
                <StSpan>조회수</StSpan>
                <StSpan>{post.viewCount}</StSpan>
              </FlexRow>
            </FlexRow>
          </FlexColumn>
        </BoxTextReal>
      </div>
    </div>
  );
};
const StTitle2 = styled.div`
  margin-top: 8px;
  font: var(--title2-semibold) Pretendard sans-serif;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StPlace_name = styled.div`
  margin-top: 20px;
  font: var(--title1-semibold) Pretendard sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StSpan = styled.span`
  font: var(--label2-regular) Pretendard sans-serif;
  color: ${LightTheme.FONT_SECONDARY};
`;
const StSpanNic = styled.span`
  font: var(--body2-medium) Pretendard sans-serif;
  color: ${LightTheme.FONT_PRIMARY};
`;
const StAddress_name = styled.div`
  margin-top: 20px;
  font: var(—body1-medium) Pretendard sans-serif;
`;
const StProfile = styled.div`
  background-color: aliceblue;
  width: 24px;
  height: 24px;
  border-radius: 50px;
`;
