import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { apis } from '@shared/axios';
import { cookies } from '@shared/cookie';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { InputArea } from '@components/Atoms/Input';
import { ButtonText } from '@components/Atoms/Button';

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
    },
    onSuccess: () => {
      router.push('/');
    },
  });

  const { mutate: kakao } = useMutation({
    mutationFn: async (user) => {
      const data = await apis.post('/OAuth/Kakao', user);
      //디코드 활용
      console.log('data', data);
    },
    onSuccess: () => {
      router.push('/');
    },
  });
  return (
    <ModalDiv className="modal">
      <div className="modal-overlay">
        <InnerDiv>
          <InputArea
            className="InputArea"
            type="text"
            size="md"
            name="email"
            value={user.email}
            onChange={changHandler}
            placeholder="id를 입력하세요"
          />
          <InputArea
            className="InputArea"
            size="md"
            type="password"
            name="password"
            value={user.password}
            onChange={changHandler}
            placeholder="비밀번호를 입력하세요"
          />
          <EttingDiv>
            <div className="loginKeepGoing">
              <input type="radio" />
              <label htmlFor="name">로그인 유지</label>
            </div>

            <FindButton
              onClick={() => {
                router.push('/searchpassword');
              }}
            >
              비밀번호 찾기
            </FindButton>
          </EttingDiv>

          <ButtonText
            style={{ marginTop: '30px' }}
            label="로그인"
            size="md"
            variant="primary"
            active={true}
            onClick={() => {
              register(user);
            }}
          />
          <ButtonText
            label="카카오 로그인"
            size="md"
            variant="primary"
            active={true}
            onClick={() => {
              kakao(user);
            }}
          />

          <button
            style={{
              cursor: 'pointer',
              border: 'none',
              backgroundColor: 'transparent',
              color: '#9fa4a9',
            }}
            onClick={onClose}
          >
            Close
          </button>
        </InnerDiv>
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
  background-color: #c9cdd2;
  mix-blend-mode: darken;
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
    max-width: 400px;
    min-width: 280px;
    width: 50%;
    border: 1px solid #939aa0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  row-gap: 10px;
  .InputArea {
    border-color: #9fa4a9;
    width: 250px;
    display: flex;
    justify-items: center;
  }
`;

const EttingDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .loginKeepGoing {
    color: #9fa4a9;
    display: flex;
    align-items: center;
    size: 10px;
    font-size: 11px;
  }
`;
const FindButton = styled.button`
  border: none;
  color: #9fa4a9;
  background-color: transparent;
  width: fit-content;
  font-size: 11px;
`;
