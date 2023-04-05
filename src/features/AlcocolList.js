import React from 'react';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { apis } from '../shared/axios';
import { cookies } from '../shared/cookie';

const AlcoholList = () => {
  const go = useRouter();
  const token = cookies.get('refresh_token');
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['GET_ALCHOLS'],
    queryFn: async () => {
      const data = await apis.get('/posts', {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('data', data.data);
      return data.data;
    },
  });

  const checkToken = async () => {
    apis.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  //가드 토큰 없으면 보내줘
  useEffect(() => {
    const refresh_token = cookies.get('refresh_token');
    if (!refresh_token) {
      router.push('/signin');
    }
    checkToken();
  }, []);
  return (
    <div>
      AlcholList
      {data?.map((alcohol) => (
        <div
          key={alcohol.id}
          onClick={() => {
            go.push(`/alcohols/${alcohol.id}`);
          }}
        >
          <h1>{alcohol.storename}</h1>
          <div>{alcohol.id}</div>
          <img src={alcohol.image} alt={alcohol.storename} />
          <div>{alcohol.description}</div>
        </div>
      ))}
    </div>
  );
};

export default AlcoholList;
