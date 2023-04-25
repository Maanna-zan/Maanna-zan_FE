import React, { useEffect } from 'react';
import { apis } from '@shared/axios';
import { useMutation } from '@tanstack/react-query';
import { cookies } from '@shared/cookie';
import { useRouter } from 'next/router';
import axios from 'axios';
const oauth = () => {
  const router = useRouter();
  const code = router.query.code;
  console.log('codeee', code);

  const { mutate } = useMutation({
    mutationFn: async (code) => {
      console.log('codeee222', code);
      await apis.post('/OAuth/Kakao', { code: code });
      //디코드 활용
    },
    onSuccess: () => {
      router.push('/');
    },
  });

  useEffect(() => {
    if (code) {
      mutate(code);
    }
  }, [code, mutate]);
  // useEffect(() => {
  //   if (code) {
  //     const kakao = async () => {
  //       try {
  //         const res = await axios.get(`/user/signin/kakao?code=${code}`);
  //         if (await res.headers.authorization) {
  //           cookies('accessToken', res.headers.authorization);
  //           cookies('refreshToken', res.headers.refreshtoken);
  //           setIsLogin(true);

  //           // const { data } = await getMyProfile();
  //           // setNewAlarms(!data.data.alarmStatus);
  //           // setEmail(data.data.userEmail);
  //           // if (data.data.isAccepted) {
  //           //   return setTimeout(() => navigate("/"), 500);
  //           // } else {
  //           //   getCookie("emailAlertCookie_kakao") === data.data.userEmail
  //           //     ? setTimeout(() => navigate("/"), 500)
  //           //     : setShowEmailAlert(true);
  //           // }
  //         }
  //       } catch (err) {
  //         setRegisterMessage(err.response.data.errorMessage);
  //         setShowRegisterAlert(true);
  //       }
  //     };
  //     kakao();
  //   }
  // }, []);

  return <div>oauth</div>;
};

export default oauth;
