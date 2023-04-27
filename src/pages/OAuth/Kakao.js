import React, { useEffect } from 'react';
import { apis } from '@shared/axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { cookies } from '@shared/cookie';
import { useRouter } from 'next/router';
import axios from 'axios';
const Kakao = () => {
  const router = useRouter();
  const code = router.query.code;

  // const { mutate } = useMutation({
  //   mutationFn: async (code) => {
  //     console.log('codeee222', code);
  //     const { res } = await apis.post('OAuth/Kakao', { code: code });
  //     console.log('res', res);
  //     return res;
  //   },

  //   onSuccess: (res) => {
  //     console.log(res); // 토큰이 넘어올 것임
  //     router.push('/');
  //   },
  // });

  // useEffect(() => {
  //   if (code) {
  //     mutate(code);
  //   }
  // }, [code, mutate]);

  const fetchKakaoData = async (code) => {
    console.log('code', code);
    const res = await apis.get(`OAuth/Kakao?code=${code}`);
    console.log('res', res);
    return res;
  };

  const { res } = useQuery(['GET_KAKAO', code], () => fetchKakaoData(code), {
    enabled: !!code,
  });
  useEffect(() => {
    if (res) {
      // 이곳에서 토큰을 처리하고 페이지를 이동하거나 다른 작업을 수행합니다.
    }
  }, [res]);

  return <div>Kakao</div>;
};

export default Kakao;
