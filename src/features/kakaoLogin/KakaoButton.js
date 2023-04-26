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

  //   const { mutate } = useMutation({
  //     mutationFn: async (code) => {
  //       const data = await apis.post('/OAuth/Kakao', code);
  //       //디코드 활용
  //       console.log('data', data);
  //     },
  //     onSuccess: () => {
  //       router.push('/');
  //     },
  //   });
  return (
    <>
      <button onClick={KakaoLoginHandler}>
        <img src="Group 2383.png" alt="카카오 로그인" />
      </button>
    </>
  );
};

export default KakaoButton;

// const KakaoLogoButton = styled.button`
//   background-image: url('/src/images/Group2383.png');
//   background-repeat: no-repeat;
//   background-size: cover;
//   margin: 10px auto;
//   /* padding: -10px; */
//   color: transparent;
//   width: 300px;
//   height: 45px;
// `;ß
