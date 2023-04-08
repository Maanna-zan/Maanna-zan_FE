import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { apis } from '../../shared/axios';
import { cookies } from '../../shared/cookie';
import Alcohols from '.';

const Alcohol = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
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
      <button
        onClick={() => {
          router.push('/alcohols');
        }}
      >
        뒤로가기
      </button>
      innn
      <div>id{data?.id}</div>
      <div>like{data?.like}</div>
      <div>storename{data?.storename}</div>
      <div>nickname{data?.nickname}</div>
      <img src={data?.s3Url} alt={data?.storename} />
      <div>likecnt{data?.likecnt}</div>
      <div>title{data?.title}</div>
      <div>description{data?.description}</div>
      <div>소주{data?.soju}</div>
      <div>맥주{data?.beer}</div>
      {/* <div>생성일{data?.createAt.substr(0, 10)}</div> */}
    </div>
  );
};

export default Alcohol;
