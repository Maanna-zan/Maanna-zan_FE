import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { apis } from '@shared/axios';
import { useMutation } from '@tanstack/react-query';
import styled from 'styled-components';
import { HeadInfo } from '@components/Atoms/SEO/HeadInfo';
import { ButtonText } from '@components/Atoms/Button';
import { InputArea } from '@components/Atoms/Input';
import { useConfirm } from '../../hook/useConfirm';

export default function SignUpModal({ onClose }) {
  const router = useRouter();
  //회원가입 다음 버튼 눌렀을 때햣
  const [next, setNext] = React.useState(false);

  // 비동기서버통신을 위한 커스텀 훅
  const [confirm] = useConfirm();

  const confirmEmail = () => {
    confirm({ type: 'email', value: user.email });
  };
  const confirmNickName = () => {
    confirm({ type: 'nickName', value: user.nickName });
  };
  //유저 관련 정보들 처리해줄 useState
  const [user, setUser] = React.useState({
    userName: '',
    nickName: '',
    phoneNumber: '',
    email: '',
    password: '',
    birth: '',
  });

  //비밀번호 일치 비교해주는 코드
  const changHandler = (event) => {
    const { name, value } = event.target;
    setUser((pre) => ({ ...pre, [name]: value }));
  };
  const [passwordError, setPasswordError] = useState(false);

  // const handlePasswordChange = (e) => {
  //   const { name, value } = e.target;
  //   setUser((pre) => ({ ...pre, [name]: value }));

  //   if (name === 'checkPassword') {
  //     setPasswordError(user.password !== value);
  //   }
  // };

  // passwordCheck 빼고 나머지 라는 뜻
  //3번째 옵션 config
  const { mutate: register, status } = useMutation({
    mutationFn: async (user) => {
      const data = await apis.post('users/signup', user);
      // console.log('data', data);
      return data;
    },
    onError: (error) => {
      // console.log('error', error.response.data.message);
      alert(error.response.data.message);
    },
    onSuccess: () => {
      alert('회원가입 완료했습니다');
      onClose();
    },
  });
  // 유효성 검사 후, 이미지를 띄우기 위한 state 추가
  const [isValidPassword, setIsValidPassword] = useState(false);

  //비밀번호 조건
  const validatePassword = (password) => {
    const minLength = 9;
    const maxLength = 20;
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{9,20}$/;

    const isValid =
      password.length >= minLength &&
      password.length <= maxLength &&
      regex.test(password);

    // 유효성 검사 후, 상태 업데이트
    setIsValidPassword(isValid);

    return isValid;
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setUser((pre) => ({ ...pre, [name]: value }));

    if (name === 'checkPassword') {
      setPasswordError(user.password !== value);
    }

    if (name === 'password') {
      const validPassword = validatePassword(value);
      setPasswordError(!validPassword);
      setIsValidPassword(validPassword);

      if (user.checkPassword) {
        setPasswordError(!validPassword || user.checkPassword !== value);
      }
    }

    if (name === 'checkPassword') {
      setPasswordError(user.password !== value);
      if (user.password) {
        setPasswordError(user.password !== value || !isValidPassword);
      }
    }
  };

  //타당성 검사 코드
  const validateForm = (userData) => {
    if (!userData.userName) {
      alert('이름을 입력해주세요.');
      return false;
    }
    const userNickName = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
    if (!userNickName.test(userData.nickName)) {
      alert('닉네임을 입력해주세요.');
      return false;
    }
    if (!validatePassword(userData.password)) {
      alert(
        '비밀번호는 알파벳 소문자, 대문자, 숫자, 특수문자를 포함한 9~20자여야 합니다.',
      );
      return false;
    }
    if (!validatePassword(userData.password)) {
      alert('비밀번호 확인을 입력해주세요.');
      return false;
    }
    const userPhoneNumber = /^01([0|1|6|7|8|9]?)([0-9]{3,4})([0-9]{4})$/;
    if (!userPhoneNumber.test(userData.phoneNumber)) {
      alert('올바른 휴대폰 번호를 입력해주세요.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      alert('올바른 이메일 주소를 입력해주세요.');
      return false;
    }
    const userBirth =
      /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
    if (!userBirth.test(userData.birth)) {
      alert('올바른 생년월일 형식으로 입력해주세요.');
      return false;
    }

    return true;
  };

  const isNextButtonActive = () => {
    if (!user.userName) return false;
    if (!user.nickName) return false;
    if (!validatePassword(user.password)) return false;
    if (!user.checkPassword) return false;

    return true;
  };

  return (
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
        <InnerDiv>
          <HeadInfo title="로그인해주세요!" />
          <h2 className="signUp">회원가입</h2>
          <div className="detailSignUp">성명</div>
          <InputArea
            type="text"
            size="lg"
            variant="default"
            name="userName"
            value={user.userName}
            placeholder="이름을 입력해주세요."
            onChange={changHandler}
            required
          />
          <Detaildiv>
            <div className="detailSignUp">닉네임</div>
            <div className="notice">닉네임 8글자 이내</div>
          </Detaildiv>
          <div style={{ display: 'flex', gap: '20px' }}>
            <InputArea
              size="lg"
              style={{ width: '100%' }}
              type="text"
              name="nickName"
              value={user.nickName}
              placeholder="닉네임을 입력해주세요."
              onChange={changHandler}
              maxLength="16"
              required
            />

            <ButtonText
              type="button"
              // size="md"
              style={{ width: '120px' }}
              variant="primary"
              active={true}
              onClick={confirmNickName}
              label="중복확인"
            />
          </div>
          <Detaildiv>
            <div className="detailSignUp">비밀번호</div>
            <div className="notice">
              8~16 자리 / 영문 대소문자,숫자,특수문자 포함
            </div>
          </Detaildiv>
          <div style={{ position: 'relative' }}>
            <InputArea
              style={{
                borderColor: isValidPassword ? '#3DC061' : '#9EA4AA',
              }}
              type="password"
              name="password"
              size="lg"
              variant="default"
              value={user.password}
              placeholder="비밀번호를 입력해주세요."
              onChange={handlePasswordChange}
              maxLength="20"
              required
            />
            {isValidPassword && (
              <img
                src="Group 2066.png"
                alt="Valid password"
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '20px',
                  height: '20px',
                }}
              />
            )}
          </div>
          <Detaildiv>
            <div className="detailSignUp">비밀번호 확인</div>
            <div className="notice">
              8~16 자리 / 영문 대소문자,숫자,특수문자 포함
            </div>
          </Detaildiv>
          <div style={{ position: 'relative' }}>
            <InputArea
              type="password"
              name="checkPassword"
              size="lg"
              variant="default"
              style={{
                borderColor: passwordError
                  ? 'red'
                  : !passwordError && user.password
                  ? '#3DC061'
                  : '#9EA4AA',
              }}
              placeholder="비밀번호를 입력해주세요."
              onChange={handlePasswordChange}
              required
            />
            {!passwordError && user.password && (
              <img
                src="Group 2066.png"
                alt="Valid password"
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '20px',
                  height: '20px',
                }}
              />
            )}
          </div>

          {passwordError && (
            <p style={{ color: 'red', fontSize: '12px', marginTop: '-5px' }}>
              비밀번호가 일치하지 않습니다.
            </p>
          )}
          {!passwordError && user.password && (
            <p
              style={{ color: '#3DC061', fontSize: '12px', marginTop: '-5px' }}
            >
              비밀번호가 일치합니다.
            </p>
          )}
          {next ? (
            <>
              <Detaildiv>
                <div className="detailSignUp">전화번호</div>
                <div className="notice">숫자로 이루어진 11자리</div>
              </Detaildiv>

              <InputArea
                type="text"
                size="lg"
                variant="default"
                name="phoneNumber"
                value={user.phoneNumber}
                placeholder="전화번호를 입력해주세요."
                onChange={changHandler}
                required
              />
              <div className="detailSignUp">이메일</div>

              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                }}
              >
                <InputArea
                  size="lg"
                  type="text"
                  name="email"
                  style={{ width: '100%' }}
                  value={user.email}
                  placeholder="이메일을 입력해주세요."
                  onChange={changHandler}
                  required
                />
                <ButtonText
                  type="button"
                  size="md"
                  style={{ width: '120px' }}
                  variant="primary"
                  active={true}
                  onClick={confirmEmail}
                  label="중복확인"
                />
              </div>
              <Detaildiv>
                <div className="detailSignUp">생년월일</div>
                <div className="notice">숫자로 이루어진 8자리</div>
              </Detaildiv>
              <InputArea
                type="text"
                size="lg"
                variant="default"
                name="birth"
                value={user.birth}
                placeholder="생년월일 8글자를 입력해주세요."
                onChange={changHandler}
              />
              <ButtonText
                size="md"
                variant="primary"
                active={true}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (validateForm(user)) {
                    register(user);
                  }
                }}
                label="회원가입"
              />
            </>
          ) : (
            <ButtonText
              size="md"
              variant="primary"
              active={true}
              style={{ cursor: 'pointer' }}
              label="다음"
              onClick={() => {
                if (isNextButtonActive()) {
                  setNext(true);
                } else {
                  validateForm(user);
                }
              }}
            />
          )}
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
    background-color: white;
    z-index: 1000;
    max-width: 550px;
    min-width: 380px;
    width: 50%;
    border: 1px solid #939aa0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const InnerDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  width: 100%;
  row-gap: 15px;
  .signUp {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 26px;
  }
  .detailSignUp {
    font-size: 14px;
    margin-bottom: -7px;
    font-weight: 700;
  }
`;

const Detaildiv = styled.div`
  display: flex;
  justify-content: space-between;
  .detailSignUp {
    font-size: 14px;
    margin-bottom: -7px;
    font-weight: 700;
  }
  .notice {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #9ea4aa;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 40x;
`;
