import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apis } from '@shared/axios';
import { cookies } from '@shared/cookie';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { InputArea } from '@components/Atoms/Input';
import { ButtonText } from '@components/Atoms/Button';

export default function SignInModal({ onClose }) {
  const router = useRouter();

  const [isEditMode, setIsEditMode] = useState('login');
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });
  const changHandler = (event) => {
    const { name, value } = event.target;
    setUser((pre) => ({ ...pre, [name]: value }));
  };

  //access는 헤더로 refresh는 로컬스토리지로
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
    <>
      <ModalDiv className="modal">
        <div className="modal-overlay">
          <img
            style={{
              position: 'fixed',
              right: '20px',
              top: '20px',
              // display: 'flex',
              // justifyContent: 'flex-end',
              width: '12px',
              height: '12px',
            }}
            onClick={onClose}
            src="Group 1972.png"
            alt="취소 버튼"
          />
          {isEditMode === 'login' ? (
            <InnerDiv>
              <h1 className="Login">로그인</h1>
              <InputArea
                className="InputArea"
                type="text"
                size="lg"
                variant="default"
                name="email"
                value={user.email}
                onChange={changHandler}
                placeholder="id를 입력하세요"
              />
              <InputArea
                className="InputArea"
                size="lg"
                variant="default"
                type="password"
                name="password"
                value={user.password}
                onChange={changHandler}
                placeholder="비밀번호를 입력하세요"
              />
              <EttingDiv>
                {/* <div className="loginKeepGoing">
              <input name="name" type="radio" />
              <label htmlFor="name">로그인 유지</label>
            </div> */}

                <FindButton
                  onClick={() => {
                    setIsEditMode('findPassword');
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
              <BottomDiv>
                <p className="question"> 아이디가 없으신가요?</p>
                <p className="goToSignUp" onClick={onClose}>
                  회원가입
                </p>
              </BottomDiv>
            </InnerDiv>
          ) : (
            <InnerDiv>
              <h1 className="Login">비밀번호 찾기</h1>
              <p className="notice">
                가입 시 입력한 이메일 주소로 임시 비밀번호를 보내드립니다.
              </p>
              <p className="notice1">로그인 후 비밀번호를 변경해주세요.</p>
              <InputArea
                style={{ marginTop: '-15px' }}
                type="text"
                size="lg"
                variant="default"
                name="email"
                value={user.email}
                onChange={changHandler}
                placeholder="이메일 주소를 입력하세요"
              />
              <ButtonText
                style={{ marginTop: '30px' }}
                label="임시 비밀번호 전송"
                size="md"
                variant="primary"
                active={true}
                onClick={() => {
                  register(user);
                }}
              />
              <BottomDiv style={{ marginTop: '100px' }}>
                <p className="question"> 비밀번호가 기억났어요!</p>
                <p
                  className="goToSignUp"
                  onClick={() => {
                    setIsEditMode('login');
                  }}
                >
                  로그인
                </p>
              </BottomDiv>
            </InnerDiv>
          )}
        </div>
      </ModalDiv>
    </>
  );
}

const ModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #6a758152;
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
    max-width: 410px;
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
  row-gap: 20px;
  .InputArea {
    width: 250px;
    display: flex;
    justify-content: center;
  }
  .Login {
    margin-top: -2px;
    font-weight: 600;
    font-size: 20px;
    line-height: 26px;
    display: flex;
    justify-content: center;
  }
  .notice {
    margin-top: -30px;
    display: flex;
    justify-content: center;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #9fa4a9;
  }
  .notice1 {
    margin-top: -28px;
    display: flex;
    justify-content: center;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #9fa4a9;
  }
`;

const EttingDiv = styled.div`
  display: flex;
  justify-content: flex-end;
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

const BottomDiv = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  .question {
    color: #9fa4a9;
  }
  .goToSignUp {
    color: #ff6a64;
  }
`;
