import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { apis } from '../../shared/axios';
import { cookies } from '../../shared/cookie';
import Alcohols from '.';

const Alcohol = () => {
  const queryClient = useQueryClient();
  const { query } = useRouter();
  console.log('query', query);

  const token = cookies.get('refresh_token');

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['GET_ALCOHOL'],
    queryFn: async () => {
      const { data } = await apis.get(`/posts/${query.id}`, {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          refresh_token: `${token}`,
        },
      });
      console.log('data', data.data);
      return data.data;
    },
    //enabled: -> 참일 때 실행시켜준다.
    enabled: Boolean(query.id),
    onSuccess: () => {},
  });

  // const checkToken = async () => {
  //   const token = cookies.get('refresh_token');
  //   apis.get('/user', {
  //     headers: {
  //       refresh_token: `${token}`,
  //     },
  //   });
  // };

  // //가드 토큰 없으면 보내줘///
  // useEffect(() => {
  //   const refresh_token = cookies.get('refresh_token');
  //   if (!refresh_token) {
  //     router.push('/signin');
  //   }
  //   checkToken();
  // }, []);

  return (
    <div>
      innn
      <div>{data?.id}</div>
      <div>{data?.likecnt}</div>
      <div>{data?.storename}</div>
      <div>{data?.nickname}</div>
      <img src={data?.image} alt={data?.storename} />
      <div>{data?.likecnt}</div>
      <div>{data?.title}</div>
      <div>{data?.description}</div>
      <div>소주{data?.soju}</div>
      <div>맥주{data?.beer}</div>
      <div>생성일{data?.createAt.substr(0, 10)}</div>
    </div>
  );
};

export default Alcohol;
