import React from 'react';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useLikeStore } from '../../hook/useLikes';
import { LikeHeartIcon, DisLikeHeartIcon } from '@components/Atoms/HeartIcon';

export const Store = ({ storeData, store }) => {
  const queryClient = useQueryClient();
  const { handleLike } = useLikeStore();

  const [roomLike, setRoomLike] = useState(store.roomLike);
  // const [roomLike, setRoomLike] = useState(store.roomLike);
  // // const [roomLike, setRoomLike] = useState(store.roomLike);
  // const handleLike = () => {
  //   const apiId = store.apiId;
  //   const cachedStore = queryClient.getQueryData(['store', apiId]);

  //   // Optimistically update the cached post data
  //   queryClient.setQueryData(['store', apiId], (old) => ({
  //     ...old,
  //     roomLike: !old?.roomLike,
  //     roomLikecnt: old?.like ? old?.roomLikecnt - 1 : old?.roomLikecnt + 1,
  //   }));
  //   setRoomLike(!roomLike);

  //   likeStore(apiId, {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(['store', apiId]);
  //     },
  //     onError: () => {
  //       // If the request fails, roll back the optimistic update
  //       queryClient.setQueryData(['store', apiId], cachedStore);
  //       setRoomLike(!roomLike);
  //     },
  //   });
  // };
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
