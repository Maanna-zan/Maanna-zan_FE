import React from 'react';
import styled from 'styled-components';
import { KAKAO_AUTH_URL } from './KakaoLogIn';
import { useMutation } from '@tanstack/react-query';

const KakaoButton = () => {
  const KakaoLoginHandler = () => {
    if (typeof window !== 'undefined') {
      window.location.href = KAKAO_AUTH_URL;
      console.log('findit', KAKAO_AUTH_URL);
    }
  };

  return (
    <>
      <KakaoLogoButton onClick={KakaoLoginHandler}>
        <img src="Group 2383.png" alt="카카오 로그인" />
      </KakaoLogoButton>
    </>
  );
};

export default KakaoButton;

const KakaoLogoButton = styled.button`
  background-color: transparent;
  border: none;
  color: transparent;
`;
