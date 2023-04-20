import { useState, useEffect, useCallback } from 'react';
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
import { Store } from './alcohol/store';
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

  if (isLoading) {
    return <WebWrapper>Loading...</WebWrapper>;
  }
  return (
    <>
      <WebWrapper>
        <StoreListTabMenu
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          handleStoreListTabChange={handleStoreListTabChange}
        />
        {storeData?.map((store) => (
          <div
            key={store.id}
            // onClick={() => {
            //   router.push(`/alcohols/${store.apiId}`);
            // }}
          >
            <h1>{store.address_name}</h1>
            <div>{store.id}</div>
            <div>{store.likecnt}</div>
            <img src={store.image} alt={store.place_name} />
            <div>{store.description}</div>
            <div>{store.roomLikecnt}</div>
            <div>{store.roomLike}</div>

            {/* <div className="hearWrap" onClick={() => handleLike(store?.id)}> */}
            <Store store={store} storeData={storeData}></Store>
            {/* </div> */}
          </div>
        ))}

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
