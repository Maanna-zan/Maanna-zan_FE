import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { apis } from '../../shared/axios';
import { cookies } from '../../shared/cookie';
import AddComment from '@features/AddComment';
import CommentsList from '@features/CommentsList';
import { useGetStoredetail } from '../../hook/alcohol/useGetStore';
import { keys } from '@utils/createQueryKey';
const StoreDetail = ({ apiId }) => {
  const router = useRouter();
  const {
    store: [data],
    storeIsLoading,
  } = useGetStoredetail({
    apiId: router.query.id,
  });
  console.log(' 스토어 1개 조회', [data]);
  if (storeIsLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Store not found.</div>;
  }

  return (
    <div>
      <button onClick={() => router.push('/alcohols')}>뒤로가기</button>
      <div>가게이름 : {data?.place_name}</div>
      <div>주소 : {data?.address_name}</div>
    </div>
  );
};

export default StoreDetail;
