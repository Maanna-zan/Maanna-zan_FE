import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  WebWrapper,
  WebWrapper384px,
  WebWrapper792px,
  WebWrapperHeight,
} from '@components/Atoms/Wrapper';
// import { Map } from 'react-kakao-maps-sdk';
import { LikeHeartIcon, DisLikeHeartIcon } from '@components/Atoms/HeartIcon';
import { BoxTextReal } from '@components/Atoms/BoxTextReal';
import { FlexColumn, FlexRow, FlexRowCenter } from '@components/Atoms/Flex';
import { GrideGapCol4 } from '@components/Atoms/Grid';
import { ShareBtn } from '@components/Atoms/ShareBtn';
import {
  ImgCenter,
  ImgWrapper152,
  ImgWrapper792,
  ImgWrapper180X120,
} from '@components/Atoms/imgWrapper';
import styled from 'styled-components';
import ShareApiBtn from '../../hook/shareBtn/shareApiBtn';
import { LightTheme } from '@components/Themes/theme';
import {
  useGetLikeStore,
  useGetStoredetail,
} from '../../hook/alcohol/useGetStore';
import { apis } from '@shared/axios';
import { useLikeStore } from '../../hook/useLikes';
import { PenIcon } from '@components/Atoms/PenIcon';
const StoreDetail = () => {
  const router = useRouter();
  const { query } = useRouter();
  const {
    store: [data],
    storeIsLoading,
  } = useGetStoredetail({
    apiId: router.query.id,
  });

  const { likeStore } = useLikeStore();
  const { alkolsLike, alkolsIsLikeLoading } = useGetLikeStore();

  const apiIdFind = router.query.id;
  const apiId = apiIdFind;
  //게시글 좋아요한 가게와 현재가게 매칭
  const storeLikeMine =
    (alkolsLike && alkolsLike.flat().find((obj) => obj.apiId === apiIdFind)) ||
    {};

  let alkolLikeMatch = [];
  if (alkolsLike && alkolsLike.data) {
    alkolLikeMatch = alkolsLike.data;
  }

  const [roomLike, setRoomLike] = useState(storeLikeMine?.roomLike);
  console.log('스토어 좋아요한 값', storeLikeMine.roomLike);

  const likeStoreHandler = async (apiId) => {
    try {
      await likeStore(apiId);
      setRoomLike(!roomLike);
    } catch (error) {
      console.error(error);
    }
  };
  const [likeComment, setlikeComment] = useState(false);

  useEffect(() => {
    if (alkolsLike && alkolsLike.flat) {
      const postLikeMine =
        alkolsLike.flat().find((obj) => obj.apiId === apiIdFind) || {};
      setRoomLike(postLikeMine.roomLike);
    }
  }, [alkolsLike, apiIdFind]);

  if (storeIsLoading || alkolsIsLikeLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>Store not found.</div>;
  }
  const storeId = data.apiId;
  console.log('data지도확인용 x y 나옴!!', data);

  return (
    <>
      <WebWrapper>
        <div
          style={{
            marginBottom: '10px',
            font: `var(--caption1-regular) Pretendard sans-serif`,
          }}
        >
          {data?.category_group_name}
        </div>

        <FlexRow
          style={{ justifyContent: 'space-between', marginBottom: '24px' }}
        >
          <div style={{ font: `var(--head1-bold) Pretendard sans-serif` }}>
            {data?.place_name}
          </div>
          <FlexRow style={{ gap: '10px' }}>
            <span
              onClick={() => likeStoreHandler(apiId)}
              style={{ cursor: 'pointer' }}
            >
              {roomLike ? <LikeHeartIcon /> : <DisLikeHeartIcon />}
            </span>
            <ShareApiBtn
              style={{ cursor: ' pointer' }}
              title={`만나잔에 오신걸 환영합니다!`}
              url={`${apis}/${data.id}/`}
              text={`여기서 만나잔!!${data?.place_name}친구가 공유한 가게 구경하기`}
            >
              {/* <ShareBtn /> */}
            </ShareApiBtn>
          </FlexRow>
        </FlexRow>
      </WebWrapper>
      <WebWrapper style={{ position: 'relative' }}>
        <WebWrapper792px>
          <div style={{ marginBottom: '24px' }}>
            {/* 사진들 */}
            <BoxTextReal
              size="nonePadding"
              variant="realDefaultBox"
              style={{ marginBottom: '24px', width: '100%' }}
            >
              <ImgWrapper792>
                <ImgCenter
                  src={
                    data?.postList[0]
                      ? data?.postList[0].s3Url
                      : '/noimage_282x248_.png'
                  }
                ></ImgCenter>
              </ImgWrapper792>
            </BoxTextReal>
            <GrideGapCol4>
              <BoxTextReal size="nonePadding" variant="realDefaultBox">
                <ImgWrapper180X120>
                  <ImgCenter
                    src={
                      data?.postList[0]
                        ? data?.postList[0].s3Url
                        : '/noimage_282x248_.png'
                    }
                  ></ImgCenter>
                </ImgWrapper180X120>
              </BoxTextReal>
              <BoxTextReal size="nonePadding" variant="realDefaultBox">
                <ImgWrapper180X120>
                  <ImgCenter
                    src={
                      data?.postList[1]
                        ? data?.postList[1].s3Url
                        : '/noimage_282x248_.png'
                    }
                  ></ImgCenter>
                </ImgWrapper180X120>{' '}
              </BoxTextReal>
              <BoxTextReal size="nonePadding" variant="realDefaultBox">
                <ImgWrapper180X120>
                  <ImgCenter
                    src={
                      data?.postList[2]
                        ? data?.postList[2].s3Url
                        : '/noimage_282x248_.png'
                    }
                  ></ImgCenter>
                </ImgWrapper180X120>{' '}
              </BoxTextReal>
              <BoxTextReal size="nonePadding" variant="realDefaultBox">
                <ImgWrapper180X120>
                  <ImgCenter
                    src={
                      data?.postList[3]
                        ? data?.postList[3].s3Url
                        : '/noimage_282x248_.png'
                    }
                  ></ImgCenter>
                </ImgWrapper180X120>{' '}
              </BoxTextReal>
            </GrideGapCol4>
          </div>
          <div>
            {/* 리뷰들 */}
            <FlexRow
              style={{
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  margin: '0px 0px 0 8px',
                  font: `var( --head1-bold) Pretendard sans-serif`,
                }}
              >
                포스트 리뷰
              </div>
              {/* /community/add */}
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  router.push({
                    pathname: '/community/add',
                    query: { storeId },
                  });
                }}
              >
                <BoxTextReal
                  variant="redBox"
                  style={{
                    padding: '8px 16px',
                    marginBottom: '19px',
                    border: 'none',
                    color: 'white',
                    borderRadius: '10px',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center',
                  }}
                >
                  <PenIcon />
                  <span
                    style={{
                      margin: '0px 0px',
                      font: `var(--label2-bold) Pretendard sans-serif`,
                    }}
                  >
                    글쓰기
                  </span>
                </BoxTextReal>
              </div>
            </FlexRow>
            <div style={{ marginBottom: '80px' }}>
              {data?.postList.map((post) => (
                <div key={post.id}>
                  <BoxTextReal
                    size="20px"
                    variant="gray400BolderBox"
                    style={{ height: '316px', marginBottom: '12px' }}
                  >
                    <FlexRow style={{ gap: '10px' }}>
                      <StProfile>{/* 왼쪽이미지 */}</StProfile>
                      <div style={{ width: '100%', height: '24px' }}>
                        {/* 오른쪽 내용 */}
                        <FlexRow
                          style={{
                            justifyContent: 'space-between',
                            marginBottom: '10px',
                            textAline: 'right',
                          }}
                        >
                          <FlexColumn style={{ gap: '10px' }}>
                            <div>{post.nickname}</div>
                            <svg
                              width="14px"
                              height="13px"
                              viewBox="0 0 14 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7 0L8.5716 4.83688H13.6574L9.5429 7.82624L11.1145 12.6631L7 9.67376L2.8855 12.6631L4.4571 7.82624L0.342604 4.83688H5.4284L7 0Z"
                                fill="#F9BD1A"
                              />
                            </svg>
                          </FlexColumn>

                          <FlexRow
                            style={{
                              width: '20%',
                              gap: '10px',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              font: `var(   --body2-bold) Pretendard sans-serif`,
                            }}
                          >
                            <span
                              onClick={() => likeStoreHandler(apiId)}
                              style={{ cursor: 'pointer' }}
                            >
                              {likeComment ? (
                                <LikeHeartIcon
                                  style={{
                                    fill: `${LightTheme.FONT_SECONDARY}`,
                                  }}
                                ></LikeHeartIcon>
                              ) : (
                                <DisLikeHeartIcon
                                  className="heartGray"
                                  style={{
                                    fill: `${LightTheme.FONT_SECONDARY}`,
                                  }}
                                />
                              )}
                            </span>
                            <div>좋아요</div>
                            <div> {post.likecnt}개</div>
                          </FlexRow>
                        </FlexRow>

                        <div
                          style={{
                            margin: '0px 0px',
                            font: `var( --label2-regular) Pretendard sans-serif`,
                          }}
                        >
                          {post.title}
                        </div>
                        <div
                          style={{
                            margin: '0px 0px 8px 0 ',
                            font: `var( --label2-regular) Pretendard sans-serif`,
                          }}
                        >
                          {post.description}
                        </div>

                        <GrideGapCol4>
                          <ImgWrapper152>
                            <ImgCenter
                              style={{
                                width: '100%',
                                height: '100%',
                                overflow: 'hidden',
                                borderRadius: '8px',
                              }}
                              src={
                                post.s3Url
                                  ? post.s3Url
                                  : '/noimage_282x248_.png'
                              }
                              alt="store"
                            />
                          </ImgWrapper152>
                        </GrideGapCol4>
                      </div>
                    </FlexRow>
                  </BoxTextReal>
                </div>
              ))}
            </div>
          </div>
        </WebWrapper792px>
        <WebWrapper384px
          style={{
            position: 'absolute',
            top: '0px',
            right: '0',
          }}
        >
          <BoxTextReal
            size="nonePadding"
            variant="gray400BolderBox"
            style={{
              // padding: '0 16px 22px 16px',
              overflow: 'hidden',
              boxSizing: 'border-box',
              borderRadius: '8px',
              height: '360px',
            }}
          >
            <FlexRowCenter
              style={{
                font: `var(--body1-medium) Pretendard sans-serif`,
                paddingTop: '10px',
                paddingBottom: '10px',
                borderBottom: '1px solid gray',
                boxSizing: 'border-box',
              }}
            >
              가게 정보
            </FlexRowCenter>
            <div
              style={{
                width: '100%',
                justifyContent: ' space-between',
                display: 'flex',
              }}
            >
              <StMap
                style={{
                  marign: '8px 16px 22px 16px',
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                }}
              >
                {data?.x}
                {data?.y}
              </StMap>
            </div>
            <FlexRow
              style={{
                justifyContent: 'space-between',
                padding: '8px 16px 22px 16px',
              }}
            >
              <FlexColumn style={{ gap: '10px', marginTop: '8px' }}>
                <StTab>위치</StTab>
                <StTab>시간</StTab>
                <StTab>링크</StTab>
                <StTab>전화번호</StTab>
              </FlexColumn>
              <FlexColumn style={{ gap: '10px' }}>
                <div>{data?.address_name}</div>
                <FlexRow style={{ gap: '10px' }}>
                  {/* <div style={{ color: 'green' }}>영업중인지 뭔지</div>
                <div>영업시간</div> */}
                </FlexRow>
                <div>...</div>
                <div>{data?.place_url}</div>
                <div>{data?.phone}</div>
              </FlexColumn>
            </FlexRow>
          </BoxTextReal>
        </WebWrapper384px>
      </WebWrapper>
    </>
  );
};

export default StoreDetail;

const StProfile = styled.div`
  background-color: aliceblue;
  width: 24px;
  height: 24px;
  border-radius: 50px;
`;
const StTab = styled.div`
  font: var(--body2-medium) Pretendard sans-serif;
  font-weight: 700;
`;
const StMap = styled.div`
  background-color: aliceblue;
  width: 100%;
  height: 169px;
  padding-top: 8px;
  padding: 8px 16px 0px 16px;
`;
