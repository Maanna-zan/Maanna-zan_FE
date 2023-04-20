import { useState, useEffect, useCallback } from 'react';
import { apis } from '@shared/axios';
import { useRouter } from 'next/router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { WebWrapper } from '@components/Atoms/Wrapper';
import { StoreListTabMenu } from '@components/Molecules/StoreListTabMenu';
import {
  getAllStore,
  getBest,
  getView,
  getLike,
} from '../hook/alcohol/useGetAllStore';
import { PageNation } from '@components/Modals/PageNation';
import { Store } from './alcohol/Store';
import { GrideGapCol4, GrideGapCol3 } from '@components/Atoms/Grid';
import styled from 'styled-components';
import { BoxTextReal } from '@components/Atoms/BoxTextReal';
import { LightTheme } from '@components/Themes/theme';
import { FlexRow } from '@components/Atoms/Flex';
const PAGE_SIZE = 16;
const AlcoholList = () => {
  const router = useRouter();
  const [storeListPage, setStoreListPage] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const pages = [1, 2, 3, 4, 5];
  const { page } = router.query;
  const [pageNum, setPageNum] = useState(1);
  const [pageMap, setPageMap] = useState({
    all: 1,
    best: 1,
    view: 1,
    like: 1,
  });

  const handlePageNumChange = useCallback(
    (newPageNum) => {
      setPageMap((prev) => ({
        ...prev,
        [storeListPage]: newPageNum,
      }));
      setPageNum(newPageNum);
    },
    [storeListPage, setPageNum],
  );

  const handleStoreListTabChange = useCallback(
    (newTab) => {
      setActiveTab(newTab);
      setStoreListPage(newTab);

      router.push({
        pathname: router.pathname,
        query: { page: pageMap[newTab], storeListPage: newTab },
      });
    },
    [router, setActiveTab, setStoreListPage, setPageMap],
  );

  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: { page: pageMap[storeListPage], storeListPage: storeListPage },
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
    ['storeData', storeListPage, activeTab, pageNum],
    () => {
      switch (storeListPage) {
        case 'all':
          return getAllStore(pageNum, activeTab);
        case 'best':
          return getBest(pageNum, activeTab);
        case 'view':
          return getView(pageNum, activeTab);
        case 'like':
          return getLike(pageNum, activeTab);
        default:
          return getAllStore(pageNum, activeTab);
      }
    },
    {
      onMutate: () => {
        window.scrollTo(0, 0);
      },
    },
  );

  const [getView, seGetView] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await apis.get(`/alkol/view`);
      seGetView(response.data);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <WebWrapper>Loading...</WebWrapper>;
  }
  return (
    <>
      <WebWrapper>
        <FlexRow style={{ alignItems: 'flex-end', marginBottom: '40px' }}>
          <StHeade3_name style={{ marginRight: '12px' }}>
            베스트 장소
          </StHeade3_name>
          <span
            style={{
              color: `${LightTheme.PRIMARY_NORMAL}`,
              font: `var(--title1-semibold) normal sans-serif`,
            }}
          >
            HOT
          </span>
        </FlexRow>
        {console.log('storeListPage.view---------->', getView)}
        <GrideGapCol3>
          {getView?.map((store) => (
            <div key={store.id}>
              <BoxTextReal
                style={{ overflow: 'hidden' }}
                variant="realDefaultBox"
                size="nonePadding"
              >
                <img
                  style={{
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: '8px',
                  }}
                  src={
                    store.postList.length
                      ? store.postList[0].s3Url
                      : '/noimage_282x248_.png'
                  }
                  alt="store"
                />
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
        {console.log('storeData', storeData)}
        <GrideGapCol4 style={{ margin: '12px auto' }}>
          {storeData?.map((store) => (
            <BoxTextReal
              key={store.id}
              style={{
                gridColumn: 'span 1',
                gridRow: 'span 1',
                height: '318px',
              }}
              variant="realDefaultBox"
              size="nonePadding"
              // onClick={() => {
              //   router.push(`/alcohols/${store.apiId}`);
              // }}
            >
              <BoxTextReal
                style={{ overflow: 'hidden' }}
                variant="realDefaultBox"
                size="nonePadding"
              >
                <img
                  style={{
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: '8px',
                  }}
                  src={
                    store.postList.length
                      ? store.postList[0].s3Url
                      : '/noimage_282x248_.png'
                  }
                  alt="store"
                />
              </BoxTextReal>
              <StPlace_name>{store.place_name}</StPlace_name>
              <StAddress_name>{store.address_name}</StAddress_name>
              <div>{store.id}</div>
              {/* <Store store={store} storeData={storeData}></Store> */}
            </BoxTextReal>
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
