import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  useGetLikeStore,
  useGetStoredetail,
} from '../../hook/alcohol/useGetStore';
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
import { apis } from '@shared/axios';
import { useLikeStore } from '../../hook/useLikes';
const StoreDetail = () => {
  const router = useRouter();
  const { query } = useRouter();
  const {
    store: [data],
    storeIsLoading,
  } = useGetStoredetail({
    apiId: router.query.id,
  });
  console.log(' 스토어 1개 조회', data);
  console.log(' 포스트리스트 배열', data?.postList);

  const { likeStore } = useLikeStore();

  const { alkolsLike, alkolsIsLikeLoading } = useGetLikeStore();

  console.log('alkolsLike>>>>>>>>>>>', alkolsLike);
  // console.log('alkolsLikeBOOLEN>>>>>>>>>>>',[alkolsLike].like)
  let alkolLikeMatch = [];
  if (alkolsLike && alkolsLike.apiId && alkolsLike.data.apiId) {
    alkolLikeMatch = alkolLikeMatch.apiId;
  }
  const storeLikeMine =
    alkolLikeMatch.find((p) => p.id === Number(apiId)) || {};

  console.log('alkolLikeMatch>>>>>>>>>>>', alkolLikeMatch);
  console.log('storeLikeMine>>>>>>>>>>>', storeLikeMine);
  const [like, setLike] = useState(storeLikeMine.roomLike);
  // const [like, setLike] = useState(storeLikeMine.roomLike);

  const likeStoreHandler = async (apiId) => {
    // const apiId = data.apiId;
    try {
      await likeStore(apiId);
      setLike(!like);
    } catch (error) {
      console.error(error);
    }
  };
  console.log('likeStoreHandler', likeStoreHandler);
  if (storeIsLoading || alkolsIsLikeLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>Store not found.</div>;
  }
  const storeId = data.apiId;
  const apiId = data.apiId;
  // const storeId = data.apiId;
  return (
    <WebWrapper style={{ marginBottom: '80px' }}>
      <div
        style={{
          marginBottom: '10px',
          font: `var(--caption1-regular) normal sans-serif`,
        }}
      >
        {data?.category_group_name}
      </div>

      <FlexRow
        style={{ justifyContent: 'space-between', marginBottom: '24px' }}
      >
        <div style={{ font: `var(--head1-bold) normal sans-serif` }}>
          {data?.place_name}
        </div>
        <FlexRow style={{ gap: '10px' }}>
          <span
            onClick={() => likeStoreHandler(apiId)}
            style={{ cursor: 'pointer' }}
          >
            {like ? <LikeHeartIcon /> : <DisLikeHeartIcon />}
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
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                margin: '0px 0px 0 8px',
                font: `var( --head1-bold) normal sans-serif`,
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
              {/* {console.log(storeId)} */}
              작성하기
            </div>
          </FlexRow>
          {data?.postList.map((post) => (
            <div key={post.id}>
              <BoxTextReal
                size="20px"
                variant="grayBolderBox"
                style={{ height: '316px' }}
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
                          justifyContent: 'center',
                        }}
                      >
                        <span
                          onClick={() => likeStoreHandler(apiId)}
                          style={{ cursor: 'pointer' }}
                        >
                          {/* {likeComment ? <DisLikeHeartIcon /> : <LikeHeartIcon />} */}
                        </span>
                        <div>좋아요</div>
                        <div> {post.likecnt}</div>
                        {/* ---좋아요 몇개인지올리기~--- */}
                      </FlexRow>
                    </FlexRow>

                    <div
                      style={{
                        margin: '0px 0px',
                        font: `var( --label2-regular) normal sans-serif`,
                      }}
                    >
                      {post.title}
                    </div>
                    <div
                      style={{
                        margin: '0px 0px 8px 0 ',
                        font: `var( --label2-regular) normal sans-serif`,
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
                            post.s3Url ? post.s3Url : '/noimage_282x248_.png'
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
      </WebWrapper792px>
      <WebWrapper384px
        style={{
          position: 'fixed',
          top: '150px',
          left: 'calc(50% + 216px)',
        }}
      >
        <BoxTextReal
          size="nonePadding"
          variant="realDefaultBox"
          style={{
            border: '1px solid #eee',
            padding: '16px',
            overflow: 'hidden',
            boxSizing: 'border-box',
            borderRadius: '8px',
          }}
        >
          <FlexRowCenter>가게 정보</FlexRowCenter>
          <div
            style={{
              width: '100%',
              justifyContent: ' space-between',
              display: 'flex',
            }}
          >
            {/* <Map style={{ with: '100%' }}></Map> */}
          </div>
          <FlexRow style={{ justifyContent: 'space-between' }}>
            <FlexColumn style={{ gap: '10px', marginTop: '8px' }}>
              <div>위치</div>
              <div>시간</div>
              <div>링크</div>
              <div>전화번호</div>
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

      {/* <button onClick={() => router.push('/alcohols')}>뒤로가기</button> */}
      {/* </WebWrapperHeight> */}
    </WebWrapper>
  );
};

export default StoreDetail;

const StProfile = styled.div`
  background-color: aliceblue;
  width: 24px;
  height: 24px;
  border-radius: 50px;
`;
