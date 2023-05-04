import React from 'react';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useLikeStore } from '../../hook/useLikes';
import {
  LikeCircleHeartIcon,
  DisLikeCircleHeartIcon,
} from '@components/Atoms/HeartIcon';
import { useGetLikeStore } from '../../hook/alcohol/useGetStore';

//주의
export const Store = ({
  storeData,
  store,
  alkolsIsLikeLoading,
  alkolsLike,
  likesFetch,
  // storeLikeMine,
  // roomLikeMark,
}) => {
  const queryClient = useQueryClient();
  const { likeStore } = useLikeStore();

  const apiId = store.apiId;
  const storeLikeMine = likesFetch?.find((obj) => obj.apiId === apiId) || {};

  // console.log('storeLikeMine', storeLikeMine);

  const [roomLike, setRoomLike] = useState(storeLikeMine?.roomLike);
  // console.log('storeLikeMine', storeLikeMine, 'storeLikeMine');
  const likeStoreHandler = async (apiId) => {
    try {
      await likeStore(apiId);
      setRoomLike(!roomLike);
      queryClient.invalidateQueries(['store', apiId]);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div
        apiId={apiId}
        className="hearWrap"
        onClick={() => likeStoreHandler(apiId)}
      >
        {alkolsIsLikeLoading ? (
          <div>Loading...</div>
        ) : (
          <>{roomLike ? <LikeCircleHeartIcon /> : <DisLikeCircleHeartIcon />}</>
        )}
      </div>
    </>
  );
};
