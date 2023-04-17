import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { apis } from '../shared/axios';
import { cookies } from '../shared/cookie';
// import ShareApiBtn from '../hook/shareBtn/ShareApiBtn';
import { useGetStore } from '../hook/alcohol/useGetStore';
import { useGetAllStore } from '../hook/alcohol/useGetAllStore';
import ShareApiBtn from '../hook/shareBtn/shareApiBtn';
import Link from 'next/link';

const AlcoholList = () => {
  const router = useRouter();
  const { apiId } = router.query;
  const { page = 1 } = router.query;
  const { storeAll, storeIsAllLoading, isError } = useGetAllStore(page, 16);

  if (storeIsAllLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  return (
    <>
      {storeAll?.map((store) => (
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
          <ShareApiBtn
            url={`http://localhost:3000/stores/${store.apiId}`}
            title={store.place_name}
          >
            공유하기
          </ShareApiBtn>
        </div>
      ))}
    </>
  );
};

export default AlcoholList;
