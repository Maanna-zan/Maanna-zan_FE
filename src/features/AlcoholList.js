import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import {
  getAllStore,
  getBest,
  getView,
  getLike,
} from '../hook/alcohol/useGetAllStore';
import { StoreListTabMenu } from '@components/Molecules/StoreListTabMenu';
import { WebWrapper } from '@components/Atoms/Wrapper';

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
            onClick={() => {
              router.push(`/alcohols/${store.apiId}`);
            }}
          >
            <h1>{store.address_name}</h1>
            <div>{store.id}</div>
            <div>{store.likecnt}</div>
            <img src={store.image} alt={store.place_name} />
            <div>{store.description}</div>
          </div>
        ))}

        <ul className="page_num">
          {pages.map((pageNum) => (
            <li
              key={pageNum}
              className={
                (pageNum === parseInt(router.query.page) &&
                  storeListPage === activeTab) ||
                (pageNum === 1 &&
                  !router.query.page &&
                  storeListPage === activeTab)
                  ? 'active'
                  : ''
              }
              onClick={() => handlePageNumChange(pageNum)}
            >
              {pageNum}
            </li>
          ))}
        </ul>
        {isFetching && <div>Loading more...</div>}
      </WebWrapper>
    </>
  );
};

export default AlcoholList;
