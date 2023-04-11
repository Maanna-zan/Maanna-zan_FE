import React from 'react';
import { InputArea } from '@components/Atoms/Input';
import { ButtonText } from '@components/Atoms/Button';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';
import { apis } from '@shared/axios';
import { cookies } from '@shared/cookie';
import { useMutation } from '@tanstack/react-query';
import styled from 'styled-components';

export default function Modal({ onClose }) {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });

  const changHandler = (event) => {
    const { name, value } = event.target;
    setUser((pre) => ({ ...pre, [name]: value }));
  };

  // passwordCheck 빼고 나머지 라는 뜻
  //3번째 옵션 config;'////////////////////
  const { mutate: register, status } = useMutation({
    mutationFn: async (user) => {
      const data = await apis.post('/users/login', user);
      //디코드 활용
      const decoded = jwtDecode(data.headers.access_token);
      console.log('decoded', decoded);
      console.log('data', data);
      alert(`${decoded.sub}로그인 성공 했습니다❤️`);
      cookies.set('access_token', data.headers.access_token, { path: '/' });
      cookies.set('refresh_token', data.headers.refresh_token, { path: '/' });
      // cookies.set('email', decoded.sub, { path: '/' });
    },
    onSuccess: () => {
      router.push('/');
    },
  });
  return (
    <ModalDiv className="modal">
      <div className="modal-overlay">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <InputArea
            type="text"
            size="md"
            name="email"
            value={user.email}
            onChange={changHandler}
            placeholder="id를 입력하세요"
          />
          <InputArea
            size="md"
            type="password"
            name="password"
            value={user.password}
            onChange={changHandler}
            placeholder="비밀번호를 입력하세요"
          />
          <div>
            <ButtonText
              label="로그인"
              size="md"
              variant="primary"
              active={true}
              onClick={() => {
                register(user);
              }}
            />
            {/* <ButtonText
              label="회원가입"
              size="md"
              variant="primary"
              active={true}
              onClick={() => {
                router.push('/signup');
              }}
            /> */}
            <ButtonText
              label="비밀번호 찾기"
              size="md"
              variant="primary"
              active={true}
              onClick={() => {
                router.push('/searchpassword');
              }}
            />
          </div>
          <button
            style={{
              cursor: 'pointer',
              border: 'none',
              backgroundColor: 'transparent',
            }}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </ModalDiv>
  );
}

const ModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.5);
  z-index: 999;

  .modal-overlay {
    padding: 20px 40px;
    border-radius: 20px;
    position: fixed;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255);
    z-index: 1000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;
