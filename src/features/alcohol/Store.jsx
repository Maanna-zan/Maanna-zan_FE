import React from 'react';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useLikeStore } from '../../hook/useLikes';
import { LikeHeartIcon, DisLikeHeartIcon } from '@components/Atoms/HeartIcon';
import { useGetLikeStore } from '../../hook/alcohol/useGetStore';
//주의
export const Store = ({ storeData, store }) => {
  const queryClient = useQueryClient();
  const { likeStore } = useLikeStore();
  const { alkolsLike, alkolsIsLikeLoading } = useGetLikeStore();

  const apiId = store.apiId;

  //게시글 좋아요한 가게와 현재가게 매칭
  const storeLikeMine =
    (alkolsLike && alkolsLike.flat().find((obj) => obj.apiId === apiId)) || {};

  let alkolLikeMatch = [];
  if (alkolsLike && alkolsLike.data) {
    alkolLikeMatch = alkolsLike.data;
  }
  const [roomLike, setRoomLike] = useState(storeLikeMine?.roomLike);
  const { handleLike } = useLikeStore();
  const pushLike = storeLikeMine.apiId;
  const likeStoreHandler = async (apiId) => {
    try {
      await likeStore(apiId);
      setRoomLike(!roomLike);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        apiId={apiId}
        className="hearWrap"
        onClick={() => likeStoreHandler(apiId)}
      >
        {roomLike ? <LikeHeartIcon /> : <DisLikeHeartIcon />}
      </div>
    </>
  );
};
