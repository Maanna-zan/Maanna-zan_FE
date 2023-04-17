import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apis } from '@shared/axios';
import { cookies } from '@shared/cookie';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { InputArea } from '@components/Atoms/Input';
import { ButtonText } from '@components/Atoms/Button';

export default function SettingModal({ onClose, data }) {
  const router = useRouter();
  console.log('data', data);
  const [isEditMode, setIsEditMode] = useState('profile');
  const [password, setPassword] = useState('');
  const changePWInputHandler = (e) => {
    const { value, name } = e.target;
    setPassword((pre) => ({ ...pre, [name]: value }));
  };

  const access_token = cookies.get('access_token');
  //닉네임 변경
  const { mutate: nickName, isLoading } = useMutation({
    mutationFn: async (user) => {
      const data = await apis.patch('/my-page/change-nickname', user, {
        headers: {
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
  //비밀번호 변경
  const { mutate: changePassword } = useMutation({
    mutationFn: async (user) => {
      const data = await apis.patch('/my-page/change-password', user, {
        headers: {
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

  const [passwordError, setPasswordError] = useState(false);
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword((pre) => ({ ...pre, [name]: value }));

    if (name === 'checkPassword') {
      setPasswordError(password.password !== value);
    }
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
  const validateForm = (userData) => {
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
        {isEditMode === 'password' ? (
          <InnerDiv>
            <EttingDiv>
              <h3>계정 설정</h3>
            </EttingDiv>
            <div style={{ display: 'flex' }}>
              <p
                onClick={() => {
                  setIsEditMode('profile');
                }}
              >
                프로필 설정
              </p>
              <p
                onClick={() => {
                  setIsEditMode('password');
                }}
              >
                비밀번호 설정
              </p>
              <p
                onClick={() => {
                  setIsEditMode('env');
                }}
              >
                환경설정
              </p>
            </div>
            <p>새 비밀번호</p>
            <InputArea
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요."
              value={password.password}
              onChange={handlePasswordChange}
              maxLength="20"
              required
            />
            <p>비밀번호 확인</p>
            <InputArea
              type="password"
              name="checkPassword"
              placeholder="비밀번호를 확인해주세요."
              onChange={handlePasswordChange}
              required
            />
            {passwordError && (
              <p style={{ color: 'red', fontSize: '12px', marginTop: '-5px' }}>
                비밀번호가 일치하지 않습니다.
              </p>
            )}
            {!passwordError && (
              <p style={{ color: 'red', fontSize: '12px', marginTop: '-5px' }}>
                비밀번호가 일치합니다.
              </p>
            )}
            <ButtonText
              label="비밀번호 변경"
              variant="primary"
              active={true}
              onClick={() => {
                if (validateForm(password)) {
                  changePassword(password);
                }
              }}
            />
            <ButtonText
              label="저장하기"
              variant="primary"
              active={true}
              disabled={isLoading}
              onClick={onClose}
            />
          </InnerDiv>
        ) : isEditMode === 'profile' ? (
          <InnerDiv>
            <EttingDiv>
              <h3>계정 설정</h3>
            </EttingDiv>
            <div style={{ display: 'flex' }}>
              <p
                onClick={() => {
                  setIsEditMode('profile');
                }}
              >
                프로필 설정
              </p>
              <p
                onClick={() => {
                  setIsEditMode('password');
                }}
              >
                비밀번호 설정
              </p>
              <p
                onClick={() => {
                  setIsEditMode('env');
                }}
              >
                환경설정
              </p>
            </div>
            <div>닉네임</div>
            <InputArea
              size="md"
              type="text"
              name="nickName"
              value={password.nickName}
              onChange={changePWInputHandler}
            />
            <div>이메일</div>
            <InputDiv>{data.email}</InputDiv>

            <ButtonText
              label="저장하기"
              variant="primary"
              active={true}
              disabled={isLoading}
              onClick={() => {
                nickName(password);
                onClose();
              }}
            />
          </InnerDiv>
        ) : (
          <InnerDiv>
            <div style={{ display: 'flex' }}>
              <p
                onClick={() => {
                  setIsEditMode('profile');
                }}
              >
                프로필 설정
              </p>
              <p
                onClick={() => {
                  setIsEditMode('password');
                }}
              >
                비밀번호 설정
              </p>
              <p
                onClick={() => {
                  setIsEditMode('env');
                }}
              >
                환경설정
              </p>
            </div>
            <div>다크모드 넣어주기</div>
          </InnerDiv>
        )}

        <button
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            cursor: 'pointer',
            border: 'none',
            backgroundColor: 'transparent',
            color: '#9fa4a9',
          }}
          onClick={onClose}
        >
          Close
        </button>
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
    background-color: #ffff;
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
const InputDiv = styled.div`
  border: 1px solid #9fa4a9;
  padding: 10px;
  border-radius: 8px;
  color: #9fa4a9;
  background-color: #f7f8f9;
`;

const EttingDiv = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
`;
const FindButton = styled.button`
  border: none;
  color: #9fa4a9;
  background-color: transparent;
  width: fit-content;
  font-size: 11px;
`;
