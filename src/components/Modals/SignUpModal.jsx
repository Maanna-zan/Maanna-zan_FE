import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { apis } from '@shared/axios';
import { HeadInfo } from '@components/Atoms/SEO/HeadInfo';
import { useMutation } from '@tanstack/react-query';
import { useConfirm } from '../../hook/useConfirm';
import { InputArea } from '@components/Atoms/Input';
import { ButtonText } from '@components/Atoms/Button';
import styled from 'styled-components';
//회원정보 기입시 각각 주의사항
import UserNameAlert from '@features/signUpAlert/UserNameAlert';
import NickNameAlert from '../../features/signUpAlert/NickNameAlert';
import PhoneNumberAlert from '@features/signUpAlert/PhoneNumberAlert';
import PasswordAlert from '@features/signUpAlert/PasswordAlert';
import EmailAlert from '@features/signUpAlert/EmailAlert';
import BirthAlert from '@features/signUpAlert/BirthAlert';

export default function SignUpModal({ onClose }) {
  const router = useRouter();
  //회원가입 다음 버튼 눌렀을 때
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
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setUser((pre) => ({ ...pre, [name]: value }));

    if (name === 'checkPassword') {
      setPasswordError(user.password !== value);
    }
  };

  // passwordCheck 빼고 나머지 라는 뜻
  //3번째 옵션 config
  const { mutate: register, status } = useMutation({
    mutationFn: async (user) => {
      const data = await apis.post('users/signup', user);
      console.log('data', data);
      return data;
    },
    onError: (error) => {
      console.log('error', error.response.data.message);
      alert(error.response.data.message);
    },
    onSuccess: () => {
      alert('회원가입 완료했습니다');
      onClose();
    },
  });
  // 각각 값들마다 인풋 창 포커스 시 조건들 표시해주는 코드 -> 조건은 @features/signUpAlert 에 각각 적어뒀습니다.
  //훅에 아직 미숙해 빼내지를 못하는.. 공부해서 좀더 정리해보곘습니다.
  const [isUserNameFocused, setIsUserNameFocused] = useState(false);
  const handleUserNameFocus = () => {
    setIsUserNameFocused(true);
  };
  const handleUserNameBlur = () => {
    setIsUserNameFocused(false);
  };
  const [isNickNameFocused, setIsNickNameFocused] = useState(false);
  const handleNicknameFocus = () => {
    setIsNickNameFocused(true);
  };
  const handleNicknameBlur = () => {
    setIsNickNameFocused(false);
  };
  const [isPhoneNumberFocused, setIsPhoneNumberFocused] = useState(false);
  const handlePhoneNumberFocus = () => {
    setIsPhoneNumberFocused(true);
  };
  const handlePhoneNumberBlur = () => {
    setIsPhoneNumberFocused(false);
  };
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const handlePassWordFocus = () => {
    setIsPasswordFocused(true);
  };
  const handlePassWordBlur = () => {
    setIsPasswordFocused(false);
  };
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };
  const handleEmailBlur = () => {
    setIsEmailFocused(false);
  };
  const [isBirthFocused, setIsBirthFocused] = useState(false);
  const handleBirthFocus = () => {
    setIsBirthFocused(true);
  };
  const handleBirthBlur = () => {
    setIsBirthFocused(false);
  };

  //비밀번호 조건
  const validatePassword = (password) => {
    const minLength = 9;
    const maxLength = 20;
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{9,20}$/;

    return (
      password.length >= minLength &&
      password.length <= maxLength &&
      regex.test(password)
    );
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
    if (!validatePassword(userData.password)) {
      alert(
        '비밀번호는 알파벳 소문자, 대문자, 숫자, 특수문자를 포함한 9~20자여야 합니다.',
      );
      return false;
    }

    return true;
  };
  return (
    <ModalDiv className="modal">
      <div className="modal-overlay">
        <InnerDiv>
          <HeadInfo title="로그인해주세요!" />
          <h2 className="signUp">회원가입</h2>
          <div className="detailSignUp">성명</div>
          <InputArea
            type="text"
            name="userName"
            value={user.userName}
            placeholder="성명을 입력해주세요."
            onChange={changHandler}
            onFocus={handleUserNameFocus}
            onBlur={handleUserNameBlur}
            required
          />
          {isUserNameFocused && <UserNameAlert />}

          <div className="detailSignUp">닉네임</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <InputArea
              style={{ width: '100%' }}
              type="text"
              name="nickName"
              value={user.nickName}
              placeholder="사용하실 닉네임을 입력해주세요."
              onChange={changHandler}
              maxLength="16"
              onFocus={handleNicknameFocus}
              onBlur={handleNicknameBlur}
              required
            />

            <ButtonText
              type="button"
              // size="md"
              style={{ width: '140px' }}
              variant="primary"
              active={true}
              onClick={confirmNickName}
              label="중복확인"
            />
          </div>
          {isNickNameFocused && <NickNameAlert />}
          <div className="detailSignUp">전화번호</div>
          <InputArea
            type="text"
            name="phoneNumber"
            value={user.phoneNumber}
            placeholder="전화번호 숫자만 입력해주세요."
            onChange={changHandler}
            onFocus={handlePhoneNumberFocus}
            onBlur={handlePhoneNumberBlur}
            required
          />
          {isPhoneNumberFocused && <PhoneNumberAlert />}

          <div className="detailSignUp">비밀번호</div>
          <InputArea
            type="password"
            name="password"
            value={user.password}
            placeholder="비밀번호를 입력해주세요."
            onChange={handlePasswordChange}
            onFocus={handlePassWordFocus}
            onBlur={handlePassWordBlur}
            maxLength="20"
            required
          />
          {isPasswordFocused && <PasswordAlert />}
          <div className="detailSignUp">비밀번호 확인</div>
          <InputArea
            type="password"
            name="checkPassword"
            // value={user.checkPassword}
            placeholder="비밀번호를 확인해주세요."
            onChange={handlePasswordChange}
            required
          />
          {passwordError && (
            <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>
          )}
          {!passwordError && (
            <p style={{ color: 'red' }}>비밀번호가 일치합니다.</p>
          )}
          {next ? (
            <>
              <div className="detailSignUp">이메일</div>

              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                }}
              >
                <InputArea
                  type="text"
                  name="email"
                  style={{ width: '100%' }}
                  value={user.email}
                  placeholder="이메일 주소를 입력해주세요."
                  onChange={changHandler}
                  onFocus={handleEmailFocus}
                  onBlur={handleEmailBlur}
                  required
                />
                <ButtonText
                  type="button"
                  size="md"
                  style={{ width: '140px' }}
                  variant="primary"
                  active={true}
                  onClick={confirmEmail}
                  label="중복확인"
                />
              </div>
              {isEmailFocused && <EmailAlert />}
              <div className="detailSignUp">생년월일</div>
              <InputArea
                type="text"
                name="birth"
                value={user.birth}
                placeholder="생년월일 8글자를 입력해주세요."
                onChange={changHandler}
                onFocus={handleBirthFocus}
                onBlur={handleBirthBlur}
              />
              {isBirthFocused && <BirthAlert />}
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
                setNext(true);
              }}
            />
          )}
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
    max-width: 600px;
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
  gap: 10px;
  .signUp {
    display: flex;
    justify-content: center;
  }
  .detailSignUp {
    font-size: 14px;
    margin-bottom: -7px;
    font-weight: 700;
  }
`;
