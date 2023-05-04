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
import { useGetPost, useGetLikePost } from '../../hook/post/useGetPost';
import {
  LikeHeartIcon,
  DisLikeHeartIcon,
  LikeCircleHeartIcon,
  DisLikeCircleHeartIcon,
} from '@components/Atoms/HeartIcon';
import {
  ImgCenter,
  ImgWrapper282x248,
  ImgWrapper384x360,
  ImgWrapper282x200,
} from '@components/Atoms/imgWrapper';
import { useGetBestPost } from '../../hook/post/useGetBestPost';
import { useLikePost } from '../../hook/useLikes';
import { Ranking1, Ranking2, Ranking3 } from '@components/Atoms/Ranking';
import { LoadingArea } from '@components/Modals/LoadingArea';

const CommunityList = () => {
  const router = useRouter();
  const { query } = useRouter();

  const { postsBest, postIsBestLoading } = useGetBestPost();
  // const { likePost } = useLikePost();
  const { posts, postIsLoading } = useGetPost();
  const { postsLike, postIsLikeLoading } = useGetLikePost();
  // let potLikeMatch = [];
  // if (postsLike && postsLike.data && postsLike.data.posts) {
  //   potLikeMatch = postsLike.data.posts;
  // }
  // const postLikeMine =
  //   potLikeMatch.find((p) => p.id === Number(query.id)) || {};
  // const [like, setLike] = useState(postLikeMine.like);

  const likePostHandler = async () => {
    try {
      await likePost();
      setLike(!like);
    } catch (error) {
      console.error('error커뮤니티', error);
    }
  };
  let ranking = 1;
  let rankingFn = () => {
    switch (ranking) {
      case 1:
        ranking += 1;
        return <Ranking1></Ranking1>;
      case 2:
        ranking += 1;
        return <Ranking2></Ranking2>;
      case 3:
        ranking += 1;
        return <Ranking3></Ranking3>;
    }
  };

  const [userNickName, setUserNickName] = useState('');
  //postIsLikeLoading 없으니깐 다른곳에 갔다와야함
  if (postIsLikeLoading || postIsLoading || postIsBestLoading)
    return <LoadingArea>로딩중...</LoadingArea>;

  return (
    <>
      <StWebBg />
      <WebWrapper style={{ marginBottom: '80px', position: 'relative' }}>
        <StHeade3_name style={{ marginBottom: '24px' }}>
          이번주 인기글
        </StHeade3_name>

        <GrideGapCol3>
          {postsBest?.data?.map((store) => (
            <div key={store?.id} style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  width: '30px',
                  height: '30px',
                  right: '12px',
                  top: '12px',
                  zIndex: '10',
                  padding: '10px',
                  backgroundColor: 'white',
                  borderRadius: '50px',
                }}
                onClick={() => likePostHandler(store?.id)}
              >
                {/* {like ? <LikeCircleHeartIcon /> : <LikeCircleHeartIcon />} */}
              </div>
              <div
                onClick={() => {
                  router.push(`/community/${store?.id}`);
                }}
              >
                <span
                  style={{
                    width: '384px',
                    height: '360px',
                    position: 'relative',
                    zIndex: '100',
                    background:
                      'linear-gradient(180deg, #FFFFFF 65.83%, #26282B 119.72%)',
                  }}
                >
                  <BoxTextReal
                    style={{
                      overflow: 'hidden',
                      background:
                        'linear-gradient(180deg, #FFFFFF 65.83%, #26282B 119.72%)',
                    }}
                    variant="realDefaultBox"
                    size="nonePadding"
                  >
                    <ImgWrapper384x360>
                      <ImgCenter
                        style={{
                          width: '100%',
                          height: '100%',
                          overflow: 'hidden',
                          borderRadius: '10px',
                          background:
                            'linear-gradient(180deg, #ffffff0 65.83%, #26282B 119.72%)',
                        }}
                        src={
                          store.s3Url ? store.s3Url : '/noimage_282x248_.png'
                        }
                        alt="store"
                      />
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '308px',
                          left: '20px',
                        }}
                      >
                        {rankingFn()}
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          // bottom: '20px',
                          // left: '20px',
                          width: '384px',
                          height: '360px',
                          color: 'white',
                          background:
                            'linear-gradient(180deg, #7e7e7e70 65.83%, #26282B 119.72%)',
                          padding: '5px',
                          borderRadius: '8px',
                        }}
                      >
                        <div
                          style={{
                            font: `var(--title1-semibold) Pretendard sans-serif`,
                            width: '344px',
                            height: '26px',
                            marginBottom: '8px',
                            position: 'relative',
                            left: '30px',
                            bottom: '-270px',
                          }}
                        >
                          {store.storename}/{store.title}
                        </div>
                        <div
                          style={{
                            font: `var(--body2-medium) Pretendard sans-serif`,
                            width: '152px',
                            height: '20px',
                            position: 'relative',
                            left: '30px',
                            bottom: '-270px',
                          }}
                        >
                          {store.nickname}
                        </div>
                      </div>
                    </ImgWrapper384x360>
                  </BoxTextReal>
                </span>
              </div>
              <StPlace_name>{store?.place_name}</StPlace_name>
            </div>
          ))}
        </GrideGapCol3>
        <StHeade3_name> 포스트 리뷰글</StHeade3_name>
        <GrideGapCol4 style={{ margin: '12px auto' }}>
          {posts.map((post) => (
            <Post
              post={post}
              key={post.id}
              postId={post.id}
              apiId={post.id}
              style={{ position: 'relative' }}
            ></Post>
          ))}
        </GrideGapCol4>
      </WebWrapper>
    </>
  );
};

export default CommunityList;
const StHeade3_name = styled.div`
  margin-top: 48px;
  font: var(--head3-bold) Pretendard sans-serif;
`;
const StPlace_name = styled.div`
  margin-top: 20px;
  font: var(--title1-semibold) sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StWebBg = styled.div`
  width: 100vw;
  height: 300px;
  background-image: url('/banner-community.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
