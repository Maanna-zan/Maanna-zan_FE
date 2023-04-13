import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { cookies } from '../../shared/cookie';
import { apis } from '../../shared/axios';
import { useRouter } from 'next/router';
import instance from '@shared/instance';

const MyPage = () => {
  const router = useRouter();
  const token = cookies.get('access_token');
  const refresh_token = cookies.get('refresh_token');
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['GET_MYPAGE'],
    queryFn: async () => {
      const { data } = await instance.get('/my-page', {
        headers: {
          Access_Token: `${token}`,
        },
      });

      console.log('data', data.data);
      return data.data;
    },
    // onError 콜백 함수 구현
    onError: (error) => {
      console.log('error', error);
    },
  });

  return (
    <div key={data?.id}>
      MyPage
      <div>{data?.userName}</div>
      <div>{data?.nickName}</div>
      <div>{data?.email}</div>
      <div>{data?.birth}</div>
      <div>{data?.phoneNumber}</div>
      <div>postCnt:{data?.postCnt}</div>
      <button
        onClick={() => {
          router.push('/mypage/changepw');
        }}
      >
        비밀번호바꾸기
      </button>
      <button
        onClick={() => {
          router.push('/mypage/changenick');
        }}
      >
        닉네임변경
      </button>
    </div>
  );
};

export default MyPage;
