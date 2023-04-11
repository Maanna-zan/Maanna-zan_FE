import React, { useState } from 'react';
import { cookies } from '../../shared/cookie';
import { apis } from '../../shared/axios';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

const Changepw = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const changePWInputHandler = (e) => {
    const { value, name } = e.target;
    setPassword((pre) => ({ ...pre, [name]: value }));
  };

  const token = cookies.get('refresh_token');
  const access_token = cookies.get('access_token');
  console.log('token', token);
  const { mutate, isLoading } = useMutation({
    mutationFn: async (user) => {
      const data = await apis.patch('/my-page/change-password', user, {
        headers: {
          refresh_token: `${token}`,
          access_token: `${access_token}`,
        },
      });
      return data;
    },
    // onError 콜백 함수 구현
    onError: (error) => {
      console.error(error);
      // 에러 처리
    },
    onSuccess: () => {
      alert('비밀번호 변경이 완료됐습니다.');
      router.push('/mypage');
    },
  });
  return (
    <div>
      changepw
      <input
        type="text"
        name="password"
        value={password.password}
        onChange={changePWInputHandler}
      />
      <button
        disabled={isLoading}
        onClick={() => {
          mutate(password);
        }}
      >
        비밀번호 변경
      </button>
    </div>
  );
};

export default Changepw;
