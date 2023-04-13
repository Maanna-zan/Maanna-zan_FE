import React from 'react';
import { ButtonText } from '@components/Atoms/Button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cookies } from '../../shared/cookie';
import { useRouter } from 'next/router';
import PortalExample from '@components/Modals/PortalExample';
import SignUpPortalExample from '@components/Modals/SignUpPortalExample';
import { useQuery } from '@tanstack/react-query';
import { apis } from '@shared/axios';
import instance from '@shared/instance';

export const LinkToNav = () => {
  const router = useRouter();
  const [isLoginMode, setIsLoginMode] = useState(false);
  // 토큰 삭제 함수
  const deleteTokens = () => {
    cookies.remove('access_token');
  };
  const handleLogout = () => {
    deleteTokens();
    router.push('/');
  };
  const token = cookies.get('access_token');
  const refresh_token = cookies.get('refresh_token');
  console.log('access_token', token);
  console.log('refresh_token', refresh_token);

  useEffect(() => {
    setIsLoginMode(!!token);
  }, [token]);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['GET_MYPAGE'],
    queryFn: async () => {
      const { data } = await apis.get('/my-page', {
        headers: {
          Access_Token: `${token}`,
        },
      });

      console.log('data', data.data);
      return data.data;
    },
    // onError 콜백 함수 구현
    onError: (error) => {
      console.error(error);
      // 에러 처리
      if (error.response.data.statusCode === 401) {
        const refreshToken = cookies.get('refresh_token');
        if (refreshToken) {
          const data = instance.get('/my-page', {
            headers: {
              refresh_token: `${refreshToken}`,
            },
          });
          return data;
        }
      }
    },
  });

  return (
    <nav>
      <Link href="/alcohols">
        <ButtonText variant="borderColorWhite" label={'리스트'}></ButtonText>
      </Link>
      <Link href="/map">
        <ButtonText variant="borderColorWhite" label={'탐색'}></ButtonText>
      </Link>
      <Link href="/community">
        <ButtonText variant="borderColorWhite" label={'커뮤니티'}></ButtonText>
      </Link>
      {isLoginMode ? (
        <>
          <ButtonText
            variant="borderColorWhite"
            label={'로그아웃'}
            onClick={handleLogout}
          ></ButtonText>
        </>
      ) : (
        <PortalExample />
      )}

      <SignUpPortalExample />

      <Link href="/mypage">
        <ButtonText
          variant="borderColorWhite"
          label={`${data?.userName}님`}
        ></ButtonText>
      </Link>
    </nav>
  );
};
