import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InputArea } from '@components/Atoms/Input';
import { ButtonText } from '@components/Atoms/Button';
import { apis } from '@shared/axios';
import { cookies } from '@shared/cookie';
import { useParams } from 'react-router-dom';
const Save = ({ data }) => {
  const queryClient = useQueryClient();
  const [userOut, setUserOut] = useState({
    password: '',
  });

  const userOutHandler = (event) => {
    const { name, value } = event.target;
    setUserOut((pre) => ({ ...pre, [name]: value }));
  };

  const token = cookies.get('access_token');
  const { mutate: deleteId } = useMutation({
    mutationFn: async (payload) => {
      console.log('data', payload);
      await apis.delete(
        `/users/singout/${payload}`,
        // { data: { password: payload.password } },
        {
          headers: {
            Access_Token: `${token}`,
          },
        },
      );
    },
    onSuccess: () => {
      window.confirm('정말 탈퇴 하시겠습니까?');
    },
    onError: () => {
      alert('다시 한 번 시도해주십시오');
    },
  });

  return (
    <>
      <div
        style={{
          display: 'flex',
          width: '70%',
          margin: '0px auto',
          justifyContent: 'space-around',
          gap: '20px',
        }}
      >
        <InputArea
          type="password"
          name="password"
          value={userOut.password}
          onChange={userOutHandler}
        />
        <ButtonText
          label="회원 탈퇴"
          onClick={() => {
            deleteId(data.id);
          }}
        />
      </div>
    </>
  );
};

export default Save;
