import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { apis } from '@shared/axios';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { WebWrapper } from '@components/Atoms/Wrapper';
import { InputArea } from '@components/Atoms/Input';
import { BoxTextReal } from '@components/Atoms/BoxTextReal';
import { FlexRow } from '@components/Atoms/Flex';
import { SearchIcon } from '@components/Atoms/SearchIcon';
import {
  DisLikeCircleHeartIcon,
  LikeCircleHeartIcon,
} from '@components/Atoms/HeartIcon';
import {
  ImgCenter,
  ImgWrapper282x248,
  ImgWrapper384x360,
} from '@components/Atoms/imgWrapper';
import { GrideGapCol4, GrideGapCol3 } from '@components/Atoms/Grid';
import { Ranking1, Ranking2, Ranking3 } from '@components/Atoms/Ranking';
import { StoreListTabMenu } from '@components/Molecules/StoreListTabMenu';
import { PageNation } from '@components/Modals/PageNation';
import { Store } from './alcohol/Store';
import { LightTheme } from '@components/Themes/theme';
import Link from 'next/link';
import {
  getAllStore,
  getBest,
  getView,
  getLike,
} from '../hook/alcohol/useGetAllStore';
import { useGetLikeStore } from '../hook/alcohol/useGetStore';
import { useLikeStore } from '../hook/useLikes';

// const [like, setLike] = useState(like);
const AlcoholList = () => {
  const { go } = useRouter();
  const router = useRouter();

  //탭
  const [storeListPage, setStoreListPage] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const pages = [1, 2, 3, 4, 5];
  // for (let i = 1; i <= totalPage; i++) {
  //   pages.push(i);
  // }
  const { page } = router.query;
  const [pageNum, setPageNum] = useState(1);
  const [pageMap, setPageMap] = useState({
    all: 1,
    best: 1,
    view: 1,
    like: 1,
  });
  const keywordKey = [
    'placeName',
    'categoryName',
    'addressName',
    'roadAddressName',
  ];
  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');
  // 검색어가 변경될 때마다, 검색 결과를 새로 불러옵니다.
  useEffect(() => {
    if (keyword === '') {
      setPageNum(1);
    } else {
      setPageNum(1);
    }
  }, [keyword]);
  // 검색어 입력을 처리하는 핸들러
  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  // 검색 버튼 클릭을 처리하는 핸들러
  const handleSearch = () => {
    setPageNum(1);
    setKeyword(query);
  };

  const handlePageNumChange = useCallback(
    (newPageNum) => {
      setPageMap((prev) => ({
        ...prev,
        [storeListPage]: newPageNum,
      }));
      setPageNum(newPageNum);
    },
    [storeListPage, setPageNum, keyword],
  );
  // console.log('storedata', keyword);

  const handleStoreListTabChange = useCallback(
    (newTab) => {
      setActiveTab(newTab);
      setStoreListPage(newTab);

      router.push({
        pathname: router.pathname,
        query: {
          page: pageMap[newTab],
          placeName: keyword,
          categoryName: keyword,
          addressName: keyword,
          roadAddressName: keyword,
          storeListPage: newTab,
        },
      });
    },
    [router, setActiveTab, setStoreListPage, setPageMap, keyword],
  );

  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: {
        page: pageMap[storeListPage],
        placeName: keyword,
        categoryName: keyword,
        addressName: keyword,
        roadAddressName: keyword,
        storeListPage: storeListPage,
      },
    });
  }, [pageNum]);

  useEffect(() => {
    if (!page || parseInt(page) <= 1) {
      setPageNum(1);
    } else {
      setPageNum(parseInt(page));
    }
  }, [page]);

  const {
    data: storeData,
    isLoading,
    isError,
    isFetching,
  } = useQuery(
    ['storeData', storeListPage, activeTab, pageNum, keyword],
    () => {
      switch (storeListPage) {
        case 'all':
          return getAllStore(pageNum, keyword);
        case 'best':
          return getBest(pageNum, keyword);
        case 'view':
          return getView(pageNum, keyword);
        case 'like':
          return getLike(pageNum, keyword);
        default:
          return getAllStore(pageNum, keyword);
      }
    },
    {
      onMutate: () => {
        window.scrollTo(0, 0);
      },
    },
  );
  // console.log('storedata', storeData);
  const [getView2, seGetView2] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await apis.get(`/alkol/view`);
      seGetView2(response.data);
    };

    fetchData();
  }, []);

  const { alkolsLike, alkolsIsLikeLoading } = useGetLikeStore();
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    setLikes(alkolsLike);
  }, [alkolsLike]);

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

  // const [roomLikeMark, setRoomLikeMark] = useState(storeLikeMine?.roomLike);
  // let alkolLikeMatch = [];
  // const storeLikeMine =
  //   alkolsLike
  //     .flat()
  //     .find((obj) => obj.apiId === storeData?.alkolResponseDtoList?.apiId) ||
  //   {};
  // console.log(storeLikeMine, '흠................');
  // if (alkolsLike && alkolsLike.data) {
  //   alkolLikeMatch = alkolsLike.data;
  // }
  // const likeStoreHandler = async (apiId) => {
  //   try {
  //     await likeStore(apiId);
  //     setRoomLike(!roomLike);

  //     // 해당 store의 캐시된 데이터 무효화
  //     queryClient.invalidateQueries(['store', apiId]);
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  // console.log('술집', storeData?.alkolResponseDtoList?.apiId);
  // console.log('술집라이크', alkolsLike);
  if (isLoading || alkolsIsLikeLoading) {
    return <WebWrapper>로딩중...</WebWrapper>;
  }
  return (
    <>
      <StWebBg />
      <div
        style={{
          position: 'absolute',
          width: '806px',
          height: '50px',
          top: '355px',
          left: 'calc(50% - 404px)',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          backgroundColor: 'white',
        }}
      >
        <div style={{ position: 'relative' }}>
          <div
            style={{ position: 'absolute', top: '13px', left: '20px' }}
            onClick={handleSearch}
          >
            <SearchIcon />
          </div>

          <InputArea
            style={{
              width: '762px',
              padding: '16px 32px 16px 64px',
              border: 'none',
            }}
            type="text"
            variant="default"
            value={query}
            onChange={handleQueryChange}
            placeholder="술집을 검색해보세요"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSearch();
              }
            }}
          />

          <div
            style={{ position: 'absolute', top: '11px', right: '20px' }}
            onClick={handleSearch}
          >
            <BoxTextReal
              variant="redBox"
              style={{
                padding: '4px 16px',
                marginBottom: '28px',
                border: 'none',
                color: 'white',
                borderRadius: '10px',
                font: `var(--body2-medium) Pretendard sans-serif`,
              }}
            >
              검색
            </BoxTextReal>
          </div>
        </div>
      </div>
      <WebWrapper>
        <FlexRow style={{ alignItems: 'flex-end', marginBottom: '40px' }}>
          <StHeade3_name style={{ marginRight: '12px' }}>
            베스트 장소
          </StHeade3_name>
          <span
            style={{
              color: `${LightTheme.PRIMARY_NORMAL}`,
              font: `var(--title1-semibold) Pretendard sans-serif`,
            }}
          >
            HOT
          </span>
        </FlexRow>
        <GrideGapCol3>
          {getView2?.alkolResponseDtoList?.map((store) => (
            <div
              key={store.id}
              style={{ zIndex: '500' }}
              onClick={() => {
                router.push(`/alcohols/${store.apiId}`);
              }}
            >
              <BoxTextReal
                style={{ overflow: 'hidden' }}
                variant="realDefaultBox"
                size="nonePadding"
              >
                <ImgWrapper384x360 style={{ position: 'relative' }}>
                  <ImgCenter
                    style={{
                      width: '100%',
                      height: '100%',
                      overflow: 'hidden',
                      borderRadius: '8px',
                    }}
                    src={
                      store.postList.length && store.postList[0].s3Url !== null
                        ? store.postList[0].s3Url
                        : store.postList.slice(1).find((post) => post?.s3Url)
                            ?.s3Url || '/noimage_282x248_.png'
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
                </ImgWrapper384x360>
              </BoxTextReal>
              <StPlace_name>{store.place_name}</StPlace_name>
            </div>
          ))}
        </GrideGapCol3>

        <StHeade3_name>술집리스트</StHeade3_name>
        <StoreListTabMenu
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          handleStoreListTabChange={handleStoreListTabChange}
        />

        <GrideGapCol4 style={{ margin: '12px auto' }}>
          {storeData?.alkolResponseDtoList?.map((store) => (
            <div
              key={store.id}
              style={{
                gridColumn: 'span 1',
                gridRow: 'span 1',
                height: '318px',
                position: 'relative',
              }}
            >
              <div></div>
              <div
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '16px',
                  zIndex: '1',
                  padding: '10px',
                }}
              >
                <Store
                  store={store}
                  alkolsLike={alkolsLike}
                  alkolsIsLikeLoading={alkolsIsLikeLoading}
                  // storeLikeMine={storeLikeMine}
                  // roomLikeMark={roomLikeMark}
                ></Store>
                {/* <div
                  className="hearWrap"
                  onClick={() => likeStoreHandler(store.apiId)}
                >
                  {alkolsIsLikeLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <>
                      {alkolsLike && roomLikeMark ? (
                        <LikeCircleHeartIcon />
                      ) : (
                        <DisLikeCircleHeartIcon />
                      )}
                    </>
                  )}
                </div> */}
              </div>
              <Link key={store.id} href={`/alcohols/${store.apiId}`}>
                <BoxTextReal variant="realDefaultBox" size="nonePadding">
                  <BoxTextReal
                    style={{ overflow: 'hidden' }}
                    variant="realDefaultBox"
                    size="nonePadding"
                  >
                    <ImgWrapper282x248>
                      <ImgCenter
                        style={{
                          width: '100%',
                          height: '100%',
                          overflow: 'hidden',
                          borderRadius: '8px',
                        }}
                        src={
                          store.postList.length &&
                          store.postList[0].s3Url !== null
                            ? store.postList[0].s3Url
                            : store.postList
                                .slice(1)
                                .find((post) => post?.s3Url)?.s3Url ||
                              '/noimage_282x248_.png'
                        }
                        alt="store"
                      />
                    </ImgWrapper282x248>
                  </BoxTextReal>
                  <StPlace_name>{store.place_name}</StPlace_name>
                  <StAddress_name>{store.address_name}</StAddress_name>
                </BoxTextReal>
              </Link>
            </div>
          ))}
        </GrideGapCol4>

        <PageNation
          pages={pages}
          handlePageNumChange={handlePageNumChange}
          activeTab={activeTab}
          router={router}
          storeListPage={storeListPage}
        />
        {isFetching && <div>Loading more...</div>}
      </WebWrapper>
    </>
  );
};

export default AlcoholList;
const StHeade3_name = styled.div`
  margin-top: 48px;
  font: var(--head3-bold) Pretendard sans-serif;
`;
const StPlace_name = styled.div`
  margin-top: 20px;
  font: var(--title1-semibold) Pretendard sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StAddress_name = styled.div`
  font: var(--body1-medium) Pretendard sans-serif;
`;
const StWebBg = styled.div`
  width: 100vw;
  height: 300px;
  background-image: url('/banner-alkol.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
