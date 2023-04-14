import React, { useState } from 'react';
import { cookies } from '../../shared/cookie';
import { apis } from '../../shared/axios';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { ButtonText } from '@components/Atoms/Button';
import { InputArea } from '@components/Atoms/Input';
const Changenick = () => {
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
      const data = await apis.patch('/my-page/change-nickname', user, {
        headers: {
          refresh_token: `${token}`,
          access_token: `${access_token}`,
        },
      });
      return data;
    },
    // onError 콜백 함수 구현
    onError: (error) => {
      console.log(error.response);
      // // 에러 처리
      alert('중복된 닉네임이 있습니다.');
    },
    onSuccess: () => {
      alert('닉네임 변경이 완료됐습니다.');
      router.push('/mypage');
    },
  });
  return (
    <div>
      changenickName
      <InputArea
        type="text"
        name="nickName"
        value={password.nickName}
        onChange={changePWInputHandler}
      />
      <ButtonText
        label="닉네임변경"
        disabled={isLoading}
        onClick={() => {
          mutate(password);
        }}
      />
    </div>
  );
};

export default Changenick;
