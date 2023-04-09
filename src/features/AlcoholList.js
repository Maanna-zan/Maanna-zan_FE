import React from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { apis } from '../shared/axios';
import { cookies } from '../shared/cookie';
import { useEffect } from 'react';

const AlcoholList = () => {
  const go = useRouter();
  const router = useRouter();

  //토큰은 어세스나 리프레시 토큰 둘 중 하나만 헤더로 보여주면 된다.
  const token = cookies.get('refresh_token');
  console.log('token', token);
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['GET_ALCOHOLS'],
    queryFn: async () => {
      const response = await apis.get('/posts', {
        headers: {
          refresh_token: `${token}`,
        },
      });
      console.log('response', response);
      return response.data;
    },
    // onError 콜백 함수 구현
    onError: (error) => {
      console.error(error);
      // 에러 처리
    },
  });

  const checkToken = async () => {
    const response = await apis.get('/login', {
      headers: {
        refresh_token: `${token}`,
      },
    });
    return response;
  };

  //가드 토큰 없으면 보내줘
  useEffect(() => {
    const token = cookies.get('refresh_token');
    if (!token) {
      router.push('/signin');
    }
    checkToken();
  }, []);
  return (
    <div>
      AlcholList
      {data &&
        data.map((alcohol) => (
          <div
            key={alcohol.id}
            onClick={() => {
              go.push(`/alcohols/${alcohol.id}`);
            }}
          >
            <h1>{alcohol.storename}</h1>
            <div>{alcohol.id}</div>
            <div>{alcohol.likecnt}</div>
            <img src={alcohol.image} alt={alcohol.storename} />
            <div>{alcohol.description}</div>
          </div>
        ))}
    </div>
  );
};

export default AlcoholList;
