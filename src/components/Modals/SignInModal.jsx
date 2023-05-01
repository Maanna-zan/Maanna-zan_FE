import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apis } from '@shared/axios';
import { cookies } from '@shared/cookie';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { InputArea } from '@components/Atoms/Input';
import { ButtonText } from '@components/Atoms/Button';
import KakaoButton from '@features/kakaoLogin/KakaoButton';

export default function SignInModal({ onClose }) {
  const router = useRouter();
  //로그인
  //모달창의 상태 변화들
  const [isEditMode, setIsEditMode] = useState('login');
  // 로그인 관련 useState및 핸들러
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });

  const changHandler = (event) => {
    const { name, value } = event.target;
    setUser((pre) => ({ ...pre, [name]: value }));
  };

  // 이메일찾기 관련 useState및 핸들러
  const [email, setEmail] = React.useState({
    userName: '',
    phoneNumber: '',
  });
  const emailchangeHandler = (event) => {
    const { name, value } = event.target;
    setEmail((pre) => ({ ...pre, [name]: value }));
  };
  //이메일찾기 에러처리
  const [findEmailError, setFindEmailError] = React.useState('');
  //이메일찾기 성공시처리
  const [findEmailSuccess, setFindEmailSuccess] = React.useState('');

  //비밀번호 찾기
  const [password, setPassword] = useState('');
  //비밀번호찾기 에러처리
  const [emailFormatError, setEmailFormatError] = useState(false); // state for email format validation error
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
    setEmailFormatError(false); // clear the email format error when user types in the input field
  };

  //access는 헤더로 refresh는 로컬스토리지로
  // passwordCheck 빼고 나머지 라는 뜻
  //3번째 옵션 config////////////////////
  const { mutate: register, status } = useMutation({
    mutationFn: async (user) => {
      const data = await apis.post('/users/login', user);
      //디코드 활용
      const decoded = jwtDecode(data.headers.access_token);
      console.log('decoded', decoded);
      console.log('로그인data', data.data.data);
      alert(`${decoded.sub}로그인 성공 했습니다❤️`);
      cookies.set('access_token', data.headers.access_token, { path: '/' });
      cookies.set('refresh_token', data.headers.refresh_token, { path: '/' });
      cookies.set('nick_name', data.data.data, { path: '/' });
      localStorage.setItem('nick_name', data.data.data, { path: '/' });

      console.log('login', data);
      return data;
    },
    onSuccess: (data) => {
      console.log('login', data);
      if (data.data.message == '비밀번호 변경이 필요합니다') {
        router.push('/OAuth');
      } else {
        router.push('/');
      }
    },
    onError: (e) => {
      console.log('error login', e.response.data.message);
      const error = e.response.data.message;
      alert(error);
    },
  });

  //이메일찾기
  const { mutate: findMyEmail } = useMutation({
    mutationFn: async (email) => {
      const data = await apis.post('users/check/findEmail', email);
      console.log('data', data);
      return data;
    },
    onError: (error) => {
      setFindEmailError(error.response.data.message);
    },
    onSuccess: (data) => {
      console.log('data', data.data.data);
      setFindEmailSuccess(data.data.data);
    },
  });

  //비밀번호찾기
  const { mutate: findPw, isLoading } = useMutation({
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
    },
  });
  // validate email format function
  const validateEmailFormat = (email) => {
    // regex pattern for email format validation
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailFormat.test(email);
  };

  const handleFindpw = () => {
    if (!validateEmailFormat(password.email)) {
      setEmailFormatError(true); // set email format error if the email format is invalid
      return;
    }
    findPw(password);
    setIsEditMode('successFindPw');
  };

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
                <FindButton
                  onClick={() => {
                    setIsEditMode('findEmailMode');
                  }}
                >
                  아이디 찾기
                </FindButton>
              </EttingDiv>

              <BottomDiv>
                <p className="question"> 아이디가 없으신가요?</p>
                <p className="goToSignUp" onClick={onClose}>
                  회원가입
                </p>
              </BottomDiv>
            </InnerDiv>
          ) : isEditMode === 'findEmailMode' ? (
            <InnerDiv>
              <h1 className="Login">아이디 찾기</h1>
              <p className="notice">가입 시 입력한 전화번호를 입력해주세요.</p>
              <InputWrapper>
                <InputArea
                  style={{
                    marginTop: '-15px',
                    borderColor: findEmailError
                      ? '#EF2B2A'
                      : findEmailSuccess
                      ? '#3DC061'
                      : 'default',
                  }}
                  type="text"
                  size="lg"
                  variant="default"
                  name="userName"
                  value={email.userName}
                  onChange={emailchangeHandler}
                  placeholder="이름를 입력하세요"
                />
                {findEmailSuccess && (
                  <img
                    style={{
                      position: 'absolute',
                      right: '5%',
                      top: '35%',
                      transform: 'translateY(-50%)',
                      height: '20px',
                      width: '20px',
                    }}
                    src="Group 2066.png"
                    alt="이메일찾기 완료"
                  />
                )}
              </InputWrapper>
              <InputWrapper>
                <InputArea
                  style={{
                    marginTop: '-15px',
                    borderColor: emailFormatError
                      ? '#EF2B2A'
                      : findEmailSuccess
                      ? '#3DC061'
                      : 'default',
                  }}
                  type="text"
                  size="lg"
                  variant="default"
                  name="phoneNumber"
                  value={email.phoneNumber}
                  onChange={emailchangeHandler}
                  placeholder="전화번호를 입력하세요"
                />
                {findEmailSuccess && (
                  <img
                    style={{
                      position: 'absolute',
                      right: '5%',
                      top: '35%',
                      transform: 'translateY(-50%)',
                      height: '20px',
                      width: '20px',
                    }}
                    src="Group 2066.png"
                    alt="이메일찾기 완료"
                  />
                )}
              </InputWrapper>

              {findEmailError && (
                <p style={{ color: 'red', marginTop: '-10px' }}>
                  {findEmailError}
                </p>
              )}

              {findEmailSuccess && (
                <SuccessDiv>
                  <p className="answer">회원님의 아이디입니다.</p>
                  <p className="myEmail">"{findEmailSuccess}"</p>
                </SuccessDiv>
              )}
              {findEmailSuccess ? (
                <ButtonText
                  style={{
                    marginBottom: '50px',
                  }}
                  label="로그인"
                  size="md"
                  variant="primary"
                  active={true}
                  onClick={() => {
                    setIsEditMode('login');
                    setEmail('');
                    setFindEmailSuccess(''); // 확인 상태로 돌아가도록 합니다.
                  }}
                />
              ) : (
                <ButtonText
                  style={{
                    marginBottom: '50px',
                    marginTop: '50px',
                  }}
                  최
                  label="확인"
                  size="md"
                  variant="primary"
                  active={true}
                  onClick={() => {
                    findMyEmail(email);
                  }}
                />
              )}
            </InnerDiv>
          ) : isEditMode === 'findPassword' ? (
            <InnerDiv>
              <h1 className="Login">비밀번호 찾기</h1>
              <p className="notice">
                가입 시 입력한 이메일 주소로 임시 비밀번호를 보내드립니다.
              </p>
              <p className="notice1">로그인 후 비밀번호를 변경해주세요.</p>
              <InputArea
                style={{
                  marginTop: '-15px',
                  borderColor: emailFormatError ? '#EF2B2A' : 'default',
                }}
                type="text"
                size="lg"
                variant="default"
                name="email"
                value={password.email}
                onChange={changeHandler}
                placeholder="이메일 주소를 입력하세요"
              />
              {emailFormatError && (
                <p style={{ color: 'red', marginTop: '-10px' }}>
                  이메일 형식에 맞게 입력해주세요.
                </p>
              )}
              <ButtonText
                style={{ marginTop: '30px' }}
                label="임시 비밀번호 전송"
                size="md"
                variant="primary"
                active={true}
                disabled={isLoading}
                onClick={handleFindpw}
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
          ) : (
            <InnerDiv>
              <h1 className="Login">비밀번호 찾기</h1>
              <p className="notice">
                가입 시 입력한 이메일 주소로 임시 비밀번호를 보내드립니다.
              </p>
              <p className="notice1">로그인 후 비밀번호를 변경해주세요.</p>
              <InputArea
                style={{
                  marginTop: '-15px',
                  borderColor: emailFormatError ? '#EF2B2A' : 'default',
                }}
                type="text"
                size="lg"
                variant="gray"
                name="email"
                value={password.email}
                onChange={changeHandler}
                placeholder="이메일 주소를 입력하세요"
              />
              <ButtonText
                style={{ marginTop: '30px' }}
                label="로그인"
                size="md"
                variant="primary"
                active={true}
                disabled={isLoading}
                onClick={() => {
                  setIsEditMode('login');
                }}
              />
              <p
                className="oneMoreSend"
                onClick={() => {
                  setIsEditMode('findPassword');
                }}
              >
                이메일 다시보내기
              </p>
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
    width: 90%;
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
  .oneMoreSend {
    padding-top: 130px;
    margin: 0 auto;
    color: #ff6a64;
  }
`;

const EttingDiv = styled.div`
  display: flex;
  justify-content: center;
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
  font-size: 12px;
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

const InputWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 40x;
`;

const SuccessDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .answer {
    margin-top: 30px;
    color: #9ea4aa;
  }
  .myEmail {
    font-weight: 700px;
    font-size: 14px;
    line-height: 20px;
    margin-top: -10px;
  }
`;
