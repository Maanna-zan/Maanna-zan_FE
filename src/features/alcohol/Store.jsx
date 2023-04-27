import React from 'react';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useLikeStore } from '../../hook/useLikes';
import { LikeHeartIcon, DisLikeHeartIcon } from '@components/Atoms/HeartIcon';

export const Store = ({ storeData, store }) => {
  const queryClient = useQueryClient();
  const { handleLike } = useLikeStore();

  const [roomLike, setRoomLike] = useState(store.roomLike);
  const apiId = store.apiId;
  return (
    <>
      <div
        className="hearWrap"
        //  onClick={() => handleLike(apiId)}
      >
        {roomLike ? <LikeHeartIcon /> : <DisLikeHeartIcon />}
      </div>
    </>
  );
};
