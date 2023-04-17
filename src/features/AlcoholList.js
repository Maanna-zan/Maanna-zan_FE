import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { apis } from '../shared/axios';
import { cookies } from '../shared/cookie';
// import ShareApiBtn from '../hook/shareBtn/ShareApiBtn';
import { useGetStore } from '../hook/alcohol/useGetStore';
import ShareApiBtn from '../hook/shareBtn/shareApiBtn';

const AlcoholList = ({ apiId }) => {
  const go = useRouter();
  const { store, storeIsLoading, isError } = useGetStore(apiId);
  console.log('store__data', store);
  if (storeIsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  return (
    <>
      {
        //Array.isArray(store) &&
        store?.map((store) => (
          <div
            key={store?.id}
            onClick={() => {
              go.push(`/alcohols/${store?.id}`);
            }}
          >
            <h1>{store?.address_name}</h1>
            <div>{store?.id}</div>
            <div>{store?.likecnt}</div>
            <img src={store?.image} alt={store?.place_name} />
            <div>{store?.description}</div>
            <ShareApiBtn
              url={`http://localhost:3000/stores/${store.id}`}
              title={store?.place_name}
            />

            <ShareApiBtn
              url={`http://localhost:3000/stores/${store.id}`}
              title={store?.place_name}
              text={'Check out this page'}
            >
              공유하기
            </ShareApiBtn>
          </div>
        ))
      }
    </>
  );
};

export default AlcoholList;
