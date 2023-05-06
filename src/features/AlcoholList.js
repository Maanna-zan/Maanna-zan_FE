import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { apis } from '@shared/axios';
import { useRouter } from 'next/router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
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
import { cookies } from '@shared/cookie';
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
  useAllStore,
} from '../hook/alcohol/useGetAllStore';
import { useGetLikeStore } from '../hook/alcohol/useGetStore';
import { useLikeStore } from '../hook/useLikes';
import { Loading } from '@components/Atoms/Loading';
import { LoadingArea } from '@components/Modals/LoadingArea';
import { routeChangeCompleteHandler } from '@utils/routeChangeCompleteHandler';
import chunk from '@components/Modals/chunk';
import { useGetAutoKeyword } from '../hook/alcohol/useGetAllStore';
const AlcoholList = () => {
  const { go } = useRouter();
  const router = useRouter();

  //탭
  //  const { alkolsLike, alkolsIsLikeLoading } = useGetLikeStore();
  const [storeListPage, setStoreListPage] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  // const pages = [1, 2, 3, 4, 5];
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
  //자동완성
  const [aoutoKeyword, isKeywordLoading] = useGetAutoKeyword(keyword, 1);

  // useEffect(() => {
  //   if (keyword !== '') {
  //     setQuery(keyword);
  //   }
  // }, [aoutoKeyword, keyword]);
  // const [candidates, setCandidates] = useState();

  // console.log('자동완성', aoutoKeyword);
  // useEffect(() => {
  //   if (keyword !== '') {
  //     // likeStoreList에서 keyword를 포함하는 후보군 찾기
  //     const newCandidates = aoutoKeyword.filter((store) =>
  //       store.place_name.includes(keyword),
  //     );
  //     setCandidates(newCandidates);
  //   } else {
  //     setCandidates([]);
  //   }
  // }, [keyword, aoutoKeyword]);
  const [searchResults, setSearchResults] = useState([]);
  console.log('자동완성', searchResults);
  // 검색어가 변경될 때마다, 검색 결과를 새로 불러옵니다.
  // useEffect(() => {
  //   if (keyword === '') {
  //     setPageNum(1);
  //   } else {
  //     setPageNum(1);
  //     const results = aoutoKeyword?.alkolResponseDtoList?.filter((store) => {
  //       const fullName =
  //         store.placeName +
  //         store.categoryName +
  //         store.addressName +
  //         store.roadAddressName;
  //       return fullName.toLowerCase().includes(keyword.toLowerCase());
  //     });
  //     setSearchResults(results);
  //   }
  // }, [keyword]);
  //탭메뉴
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

  const { alkolsLike } = useGetLikeStore();
  const {
    data: storeData,
    isLoading,
    storeIsLoading,
    isError,
    isFetching,
    // alkolsIsLikeLoading,
  } = useQuery(
    ['storeData', storeListPage, pageNum, keyword],
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
      // onMutate: () => {
      //   window.scrollTo(0, 0);
      // },
    },
  );
  const access_token = cookies.get('access_token');
  const [getView2, seGetView2] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await apis.get(`/alkol/view`);
      seGetView2(response.data);
    };

    fetchData();
  }, [useGetLikeStore]);

  const [likesFetch, setLikesFetch] = useState();
  const [isLikesFetchLoading, setIsLikesFetchLoading] = useState(true);
  const { likeStore } = useLikeStore();
  useEffect(() => {
    const fetchDatalike = async () => {
      setIsLikesFetchLoading(true); // 데이터 로딩 상태 시작
      const dataLikeFetch = await apis.get('/my-page/likeAlkol', {
        headers: {
          access_token: `${access_token}`,
        },
      });
      setLikesFetch(dataLikeFetch.data);
      setIsLikesFetchLoading(false); // 데이터 로딩 상태 종료
    };

    fetchDatalike();
  }, [useLikeStore]);

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

  const storeLikeMine =
    likesFetch?.find(
      (obj) => obj.apiId === Number(storeData?.alkolResponseDtoList?.apiId),
    ) || {};

  if (typeof window !== 'undefined') {
    sessionStorage.setItem(
      `__next_scroll_${window.history.state.idx}`,
      JSON.stringify({
        x: window.pageXOffset,
        y: window.pageYOffset,
      }),
    );
  }

  useEffect(() => {
    window.history.scrollRestoration = 'manual';

    const _scroll = sessionStorage.getItem(
      `__next_scroll_${window.history.state.idx}`,
    );
    if (_scroll) {
      const { x, y } = JSON.parse(_scroll);
      window.scrollTo(x, y);
      sessionStorage.removeItem(`__next_scroll_${window.history.state.idx}`);
    }

    router.events.on('routeChangeComplete', routeChangeCompleteHandler);
    return () => {
      router.events.off('routeChangeComplete', routeChangeCompleteHandler);
    };
  }, []);

  //페이지 네이션 처음 시작이 1번창부터 켜지도록
  if (isLoading || (access_token && isLikesFetchLoading)) {
    return <LoadingArea>로딩중...</LoadingArea>;
  }

  //데이터 페이지네이션

  const data2 = storeData?.alkolResponseDtoList;
  const chunkedData = data2 ? chunk(data2, 16) : [];
  const currentPageData = chunkedData[pageNum - 1] ?? [];
  // console.log(' 청크를 술집리스트에 적용', data2);
  return (
    <>
      {/* {isLikesFetchLoading || isLoading || isFetching ? (
        <>로딩.</>
      ) : ( */}
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
            {/* {searchResults.length > 0 && (
              <ul>
                {searchResults?.alkolResponseDtoList?.map((result) => (
                  <li
                    key={result.id}
                    onClick={() => handleSelectResult(result)}
                  >
                    {result.placeName}
                  </li>
                ))}
              </ul>
            )} */}

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
                key={store.apiId}
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
                        store.postList.length &&
                        store.postList[0].s3Url !== null
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
            {/* {isLikesFetchLoading ||
              isLoading ||
              isFetching ||
              storeIsLoading ? (
                <>로딩중</>
              ) : ( */}
            <>
              {currentPageData?.map((store) => (
                <div
                  key={store.apiId}
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
                    onClick={() => {}}
                  >
                    <Store
                      store={store}
                      alkolsLike={alkolsLike}
                      likesFetch={likesFetch}
                      storeLikeMine={storeLikeMine}
                      isFetching={isFetching}
                    ></Store>
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
            </>
            {/* )} */}
          </GrideGapCol4>

          <PageNation
            pages={chunkedData.map((_, i) => i + 1)}
            // pages={pages}
            handlePageNumChange={handlePageNumChange}
            activeTab={activeTab}
            router={router}
            storeListPage={storeListPage}
            setPageNum={setPageNum}
          />
        </WebWrapper>
      </>
      {/* )} */}
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
