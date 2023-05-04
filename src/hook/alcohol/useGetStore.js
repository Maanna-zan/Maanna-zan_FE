import React, { useState, useEffect } from 'react';
import { apis } from '@shared/axios';
import { cookies } from '@shared/cookie';
import { keys } from '@utils/createQueryKey';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetStoredetail = ({ apiId }) => {
  const access_token = cookies.get('access_token');
  ('refresh_token');

  const { data, isLoading, isError } = useQuery({
    queryKey: [keys.GET_ALCOHOLS, apiId],

    queryFn: async () => {
      const data = await apis.get(`/alkol/${apiId}`, {
        // headers: {
        //   access_token: `${access_token}`,
        // },
      });
      return data.data;
    },
  });
  if (isLoading) {
    return { store: [], storeIsLoading: true };
  }

  if (isError) {
    return { store: [], storeIsLoading: false };
  }
  return { store: data, storeIsLoading: isLoading };
};

// 술집 리스트 조회용  좋아요
export const useGetLikeStore = () => {
  const access_token = cookies.get('access_token');
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: keys.GET_LIKE_STORE,
    queryFn: async () => {
      const data = await apis.get('/my-page/likeAlkol', {
        headers: {
          access_token: `${access_token}`,
        },
      });
      return data.data;
    },
//     onSuccess: () => {
//       queryClient.invalidateQueries(['GET_LIKE_STORE']);
//     },
    // 1분마다 데이터를 무효화합니다.
    // 이렇게 함으로써 1분마다 최신 데이터를 가져올 수 있습니다.
  });

  if (isLoading) {
    return { alkolsLike: data, alkolsIsLoading: true };
  }

  if (isError) {
    return { alkolsLike: data, alkolsIsLikeLoading: false };
  }

  return { alkolsLike: data, alkolsIsLikeLoading: false };
};

export const useLikeStore = () => {
  const [alkolsLike, setAlkolsLike] = useState(null);

  const { data: likeData, isLoading } = useQuery('getLikes', async () => {
    const response = await apis.get('/bar/like');
    return response.data.data;
  });

  useEffect(() => {
    if (likeData) {
      setAlkolsLike(likeData);
    }
  }, [likeData]);

  return { alkolsLike, alkolsIsLikeLoading: isLoading };
};
