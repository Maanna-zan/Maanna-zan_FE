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
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { MinStar } from '@components/Atoms/PostStar';
import Link from 'next/link';
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
  const [center, setCenter] = useState({ lat: data?.y, lng: data?.x });
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
  // console.log('스토어 좋아요한 값', storeLikeMine.roomLike);

  const likeStoreHandler = async (apiId) => {
    try {
      await likeStore(apiId);
      setRoomLike(!roomLike);
    } catch (error) {
      console.error(error);
    }
  };
  const [likeComment, setlikeComment] = useState(false);
  const [tab, setTab] = useState('storeInfor');

  useEffect(() => {
    if (alkolsLike && alkolsLike.flat) {
      const postLikeMine =
        alkolsLike.flat().find((obj) => obj.apiId === apiIdFind) || {};
      setRoomLike(postLikeMine.roomLike);
    }
  }, [alkolsLike, apiIdFind]);

  //  지도 불러오기
  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&libraries=services,clusterer,drawing&autoload=false`;
    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        // 지도 옵션
        const mapOption = {
          center: new window.kakao.maps.LatLng(data?.y, data?.x), // 지도의 중심좌표
          level: 4, // 지도 확대 레벨
      };
        //지도 생성 및 객체 리턴
        const map = new kakao.maps.Map(mapContainer, mapOption); 
        // 마커 표시될 위치
        const markerPosition  = new kakao.maps.LatLng(data?.y, data?.x);
        // 마커 생성
        const marker = new kakao.maps.Marker({
          position: markerPosition
        });
        // 마커 지도 위 표시되도록 설정
        marker.setMap(map);
      });
    };
    mapScript.addEventListener('load', onLoadKakaoMap);
  }, [data]);
  //카테고리네임 추출
  const categoryNames = data?.category_name;
  const indexAllName = categoryNames?.lastIndexOf('>');
  const resultcategoryNames = categoryNames?.slice(indexAllName + 2);
  // console.log('알콜카테고리', resultcategoryNames);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };
  if (!data) {
    return <div>Store not found.</div>;
  }

  const handleShareClick = async ({ title, text, url }) => {
    try {
      await navigator.share({
        title,
        text,
        url,
      });
      console.alert('성공적으로 공유가 되었습니다.');
    } catch (error) {
      console.error('공유에 실패하였습니다.', error);
    }
    console.log('url:', url);
    console.log('title:', title);
    console.log('text:', text);
  };
  const storeId = data.apiId;
  // if (storeIsLoading || alkolsIsLikeLoading || <Map></Map>) {
  //   return <div>맵이..</div>;
  // }

  return (
    <>
      <WebWrapper>
        <div
          style={{
            marginTop: '28px',
            marginBottom: '10px',
            font: `var(--caption1-regular) Pretendard sans-serif`,
          }}
        >
          {resultcategoryNames}
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
              handleShareClick={handleShareClick}
              style={{ cursor: 'pointer' }}
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
                    data?.postList[selectedImageIndex]
                      ? data?.postList[selectedImageIndex].s3Url
                      : '/noimage_282x248_.png'
                  }
                ></ImgCenter>
              </ImgWrapper792>
            </BoxTextReal>
            <GrideGapCol4>
              {data?.postList.slice(0, 4).map((post, index) => (
                <BoxTextReal
                  key={index}
                  size="nonePadding"
                  variant="realDefaultBox"
                >
                  <ImgWrapper180X120 onClick={() => handleImageClick(index)}>
                    <ImgCenter src={post?.s3Url || '/noimage_282x248_.png'} />
                  </ImgWrapper180X120>
                </BoxTextReal>
              ))}
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
                  <Link href={`/community/${post?.id}`}>
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
                            </FlexColumn>

                            <FlexRow
                              style={{
                                width: '22%',
                                gap: '10px',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                font: `var(   --body2-bold) Pretendard sans-serif`,
                              }}
                            >
                              <span>
                                {post?.postStarAvg}
                                <MinStar />
                              </span>
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
                              font: `var(--label2-regular) Pretendard sans-serif`,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: '1',
                              WebkitBoxOrient: 'vertical',
                            }}
                          >
                            {post.title}
                          </div>
                          <div
                            style={{
                              margin: '0px 0px 8px 0 ',
                              font: `var( --label2-regular) Pretendard sans-serif`,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: '2',
                              WebkitBoxOrient: 'vertical',
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
                  </Link>
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
              cursor: 'default',
            }}
          >
            {/* {setTab === 'storeInfor' ? ( */}
            <div>
              <FlexRow
                style={{
                  font: `var(--body1-medium) Pretendard sans-serif`,
                  justifyContent: 'space-around',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  borderBottom: '1px solid gray',
                  boxSizing: 'border-box',
                }}
              >
                <span
                  style={{
                    color: `${LightTheme.Fon}`,
                    font: `var(--body1-medium) Pretendard sans-serif`,
                    marign: '0',
                  }}
                  onClick={() => {
                    setTab('storeInfor');
                  }}
                >
                  가게정보
                </span>
                {/* <span
                  style={{
                    color: 'red',
                    color: `${LightTheme.FONT_SECONDARY}`,
                    font: `var(--body1-medium) Pretendard sans-serif`,
                    marign: '0',
                  }}
                  onClick={() => {
                    setTab('evaluation');
                  }}
                >
                  평가
                </span> */}
              </FlexRow>
              <div>
                {/* 가게 정보 */}
                <div
                  style={{
                    width: '100%',
                    justifyContent: ' space-between',
                    display: 'flex',
                    cursor: 'default',
                  }}
                >
                  <div
                  id='map'
                    style={{
                      width: '344px',
                      height: '169px',
                      marign: '8px 16px 22px 16px',
                      overflow: 'hidden',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <FlexRow
                  style={{
                    justifyContent: 'space-between',
                    padding: '8px 16px 22px 16px',
                  }}
                >
                  <FlexColumn style={{ gap: '10px', marginTop: '8px' }}>
                    <StTab>위치</StTab>

                    <StTab>카카오 링크</StTab>
                    <StTab>전화번호</StTab>
                  </FlexColumn>
                  <FlexColumn
                    style={{
                      gap: '10px',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <div>{data?.address_name}</div>
                    <FlexRow style={{ gap: '10px' }}></FlexRow>

                    <Link href={data?.place_url}>
                      <div>{data?.place_url}</div>
                    </Link>
                    <div>{data?.phone}</div>
                  </FlexColumn>
                </FlexRow>
              </div>
            </div>
            {/* ) : ( */}
            {/* // <div>
              /<FlexRow
              //     style={{
              //       font: `var(--body1-medium) Pretendard sans-serif`,
              //       justifyContent: 'space-around',
              //       paddingTop: '10px',
              //       paddingBottom: '10px',
              //       borderBottom: '1px solid gray',
              //       boxSizing: 'border-box',
              //     }}
              //   >
              //     <span
              //       style={{
              //         color: `${LightTheme.FONT_SECONDARY}`,
              //         font: `var(--body1-medium) Pretendard sans-serif`,
              //         marign: '0',
              //       }}
              //       onClick={() => {
              //         setTab('storeInfor');
              //       }}
              //     >
              //       가게정보
              //     </span>
              //     <span
              //       style={{
              //         color: 'red',
              //         color: `${LightTheme.FONT_PRIMARY}`,
              //         font: `var(--body1-medium) Pretendard sans-serif`,
              //         marign: '0',
              //       }}
              //       onClick={() => {
              //         setTab('evaluation');
              //       }}
              //     >
              //       평가
              //     </span>
              //   </FlexRow>
              //   <div style={{ padding: '20px' }}>
              //     <div style={{ marginBottom: '4px' }}>평균 별점</div>
              //     <FlexRow style={{ gap: '8px', marginBottom: '28 px' }}>
              //       <div>별</div>
              //       <div>별점의 숫자</div>
              //     </FlexRow>
              //     <FlexColumn style={{ gap: '20px ' }}>
              //       <FlexRow style={{ gap: '10px' }}>
              //         <div style={{ width: '40px' }}>맛</div>
              //         <div style={{ width: '200px' }}>평가의 그래프길이</div>
              //         <div style={{ width: '21px' }}>평가의 숫자</div>
              //       </FlexRow>
              //       <FlexRow style={{ gap: '10px' }}>
              //         <div style={{ width: '40px' }}>서비스</div>
              //         <div style={{ width: '200px' }}>평가의 그래프길이</div>
              //         <div style={{ width: '21px' }}>평가의 숫자</div>
              //       </FlexRow>
              //       <FlexRow style={{ gap: '10px' }}>
              //         <div style={{ width: '40px' }}>만족도</div>
              //         <div style={{ width: '200px' }}>평가의 그래프길이</div>
              //         <div style={{ width: '21px' }}>평가의 숫자</div>
              //       </FlexRow>
              //       <FlexRow style={{ gap: '10px' }}>
              //         <div style={{ width: '40px' }}>분위기</div>
              //         <div style={{ width: '200px' }}>평가의 그래프길이</div>
              //         <div style={{ width: '21px' }}>평가의 숫자</div>
              //       </FlexRow>
              //     </FlexColumn>
              //   </div>
              // </div>
            // )} */}
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
