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
  const { store, storeIsLoading } = useGetStoredetail({
    apiId: router.query.id,
  });
  console.log(' 스토어 1개 조회', store);
  if (storeIsLoading) {
    return <div>Loading...</div>;
  }

  if (!store) {
    return <div>Store not found.</div>;
  }

  return (
    <div>
      <button onClick={() => router.push('/alcohols')}>뒤로가기</button>
      <div>id{store?.apiId}</div>
      <div>address_name{store?.address_name}</div>
      <div>storename{store?.storename}</div>
      <div>place_name{store?.place_name}</div>
      <img src={store?.s3Url} alt={store?.storename} />
      <div>likecnt{store?.likecnt}</div>

      {/* AddComment and CommentsList components */}
    </div>
  );
};

export default StoreDetail;
