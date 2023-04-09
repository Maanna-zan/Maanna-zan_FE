import React from 'react';
import { ButtonText } from '@components/Atoms/Button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cookies } from '../../shared/cookie';
import { useRouter } from 'next/router';

export const LinkToNav = () => {
  const router = useRouter();
  const [isLoginMode, setIsLoginMode] = useState(false);
  // 토큰 삭제 함수
  const deleteTokens = () => {
    cookies.remove('access_token');
    cookies.remove('refresh_token');
  };
  const handleLogout = () => {
    deleteTokens();
    router.push('/signin');
  };
  const access_token = cookies.get('access_token');
  useEffect(() => {
    setIsLoginMode(!!access_token);
  }, [access_token]);

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
        <Link href="/signin">
          <ButtonText
            variant="borderColorWhite"
            label={'로그인'}
            onClick={() => {
              setIsLoginMode(true);
            }}
          ></ButtonText>
        </Link>
      )}
      <Link href="/signup">
        <ButtonText variant="borderColorWhite" label={'회원가입'}></ButtonText>
      </Link>
      <Link href="/mypage">
        <ButtonText
          variant="borderColorWhite"
          label={'마이페이지'}
        ></ButtonText>
      </Link>
    </nav>
  );
};
