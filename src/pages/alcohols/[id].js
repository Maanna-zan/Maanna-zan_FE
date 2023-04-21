import React from 'react';
import { useRouter } from 'next/router';
import { useGetStoredetail } from '../../hook/alcohol/useGetStore';
import {
  WebWrapper,
  WebWrapper384px,
  WebWrapper792px,
  WebWrapperHeight,
} from '@components/Atoms/Wrapper';
// import { Map } from 'react-kakao-maps-sdk';
import { LikeHeartIcon } from '@components/Atoms/HeartIcon';
import { ShareBtn } from '@components/Atoms/ShareBtn';
import { BoxTextReal } from '@components/Atoms/BoxTextReal';
import { FlexColumn, FlexRow, FlexRowCenter } from '@components/Atoms/Flex';
import { GrideGapCol4 } from '@components/Atoms/Grid';
import {
  ImgCenter,
  ImgWrapper152,
  ImgWrapper792,
  ImgWrapper180X120,
} from '@components/Atoms/imgWrapper';
import styled from 'styled-components';
const StoreDetail = ({ apiId }) => {
  const router = useRouter();
  const {
    store: [data],
    storeIsLoading,
  } = useGetStoredetail({
    apiId: router.query.id,
  });
  console.log(' 스토어 1개 조회', [data]);
  console.log(' 포스트리스트 배열', data?.postList);
  if (storeIsLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Store not found.</div>;
  }

  return (
    <WebWrapper style={{ marginBottom: '80px' }}>
      {/* <WebWrapperHeight> */}
      {console.log('data__디테일', data)}
      <div
        style={{
          marginBottom: '10px',
          font: `var(--caption1-regular) normal sans-serif`,
        }}
      >
        {data?.category_group_name}
      </div>
      {/* 카테고리{구분용} */}

      <FlexRow
        style={{ justifyContent: 'space-between', marginBottom: '24px' }}
      >
        <div style={{ font: `var(--head1-bold) normal sans-serif` }}>
          {data?.place_name}
        </div>
        <FlexRow style={{ gap: '10px' }}>
          <LikeHeartIcon style={{ margin: '0px' }}></LikeHeartIcon>
          <ShareBtn></ShareBtn>
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
                router.push(`/community/add`);
              }}
            >
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
                        <LikeHeartIcon
                          style={{ margin: '0px !import' }}
                        ></LikeHeartIcon>
                        {/* ---하트키고끄기--- */}
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
              {/* 여기까지 맵같은디 ------------------------*/}
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
