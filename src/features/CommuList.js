import React from 'react';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { apis } from '../shared/axios';
import { cookies } from '../shared/cookie';
import Alcohols from '../pages/alcohols';
import Search from '../pages/alcohols/search';

const CommuList = () => {
  const go = useRouter();
  //토큰은 어세스나 리프레시 토큰 둘 중 하나만 헤더로 보여주면 된다.
  const token = cookies.get('refresh_token');
  console.log('token', token);
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['GET_ALCHOLS'],
    queryFn: async () => {
      const data = await apis.get('/posts', {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          refresh_token: `${token}`,
          //   Authorization: `Bearer ${token}`,
        },
      });
      console.log('data', data);
      return data.data;
    },
  });

  //   const checkToken = async () => {
  //     apis.get('/user', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //   };

  //   //가드 토큰 없으면 보내줘
  //   useEffect(() => {
  //     const refresh_token = cookies.get('refresh_token');
  //     if (!refresh_token) {
  //       router.push('/signin');
  //     }
  //     checkToken();
  //   }, []);
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

export default CommuList;
