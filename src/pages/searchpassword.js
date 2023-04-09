import React, { useState } from 'react';
import { apis } from '../shared/axios';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

const searchpassword = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');

  const changePWInputHandler = (e) => {
    const { value, name } = e.target;
    setPassword((pre) => ({ ...pre, [name]: value }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: async (user) => {
      const data = await apis.post('users/check/findPw', user);
      console.log('data', data);
      return data;
    },
    onError: (error) => {
      console.log('error', error.response.data.message);
      alert(error.response.data.message);
    },
    onSuccess: (data) => {
      console.log('data', data);
      alert(`${data.data.message}🥹`);
      router.push('/signin');
    },
  });
  return (
    <div>
      searchpassword
      <input
        type="text"
        name="email"
        value={password.email}
        onChange={changePWInputHandler}
      />
      <button
        disabled={isLoading}
        onClick={() => {
          mutate(password);
        }}
      >
        비밀번호 찾기
      </button>
    </div>
  );
};

export default searchpassword;
