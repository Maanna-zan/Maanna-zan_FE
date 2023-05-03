import React from 'react';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useLikeStore } from '../../hook/alcohol/useGetStore';
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
  // storeLikeMine,
  // roomLikeMark,
}) => {
  const queryClient = useQueryClient();
  const { likeStore } = useLikeStore();

  const apiId = store.apiId;
  console.log('apiId', apiId);
  //게시글 좋아요한 가게와 현재가게 매칭
  const storeLikeMine =
    (alkolsLike && alkolsLike.flat().find((obj) => obj.apiId === apiId)) || {};
  console.log();
  let alkolLikeMatch = [];
  if (alkolsLike && alkolsLike.data) {
    alkolLikeMatch = alkolsLike.data;
  }
  const [roomLike, setRoomLike] = useState(storeLikeMine?.roomLike);
  console.log('storeLikeMine', storeLikeMine, 'storeLikeMine');
  const pushLike = storeLikeMine.apiId;
  const likeStoreHandler = async (apiId) => {
    try {
      await likeStore(apiId);
      setRoomLike(!roomLike);

      // 해당 store의 캐시된 데이터 무효화
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
          <>
            {alkolsLike && roomLike ? (
              <LikeCircleHeartIcon />
            ) : (
              <DisLikeCircleHeartIcon />
            )}
          </>
        )}
      </div>
    </>
  );
};
