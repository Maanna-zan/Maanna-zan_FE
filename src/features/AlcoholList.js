import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { apis } from '../shared/axios';
import { cookies } from '../shared/cookie';
import { useEffect } from 'react';

const AlcoholList = () => {
  const token = cookies.get('refresh_token');
  const router = useRouter();
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
  // 로그아웃 버튼 클릭 핸들러

  return <div></div>;
};

export default AlcoholList;
