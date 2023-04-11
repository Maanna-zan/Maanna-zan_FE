import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { cookies } from '../../shared/cookie';
import { apis } from '../../shared/axios';
import { useRouter } from 'next/router';

const MyPage = () => {
  const router = useRouter();
  const token = cookies.get('refresh_token');
  console.log('token', token);
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['GET_MYPAGE'],
    queryFn: async () => {
      const { data } = await apis.get('/my-page', {
        headers: {
          refresh_token: `${token}`,
        },
      });
      console.log('data', data.data);
      return data.data;
    },
    // onError 콜백 함수 구현
    onError: (error) => {
      console.error(error);
      // 에러 처리
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
