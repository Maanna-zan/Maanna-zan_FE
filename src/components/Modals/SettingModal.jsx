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
        {isEditMode === 'profile' ? (
          <InnerDiv>
            <EttingDiv>
              <h3>계정 설정</h3>
            </EttingDiv>
            <ModeParentsDiv>
              <div className="modeDiv">
                <p
                  className="modeP"
                  onClick={() => {
                    setIsEditMode('profile');
                  }}
                >
                  프로필 설정
                </p>
                <Hr />
              </div>

              <p
                className="unModeP"
                onClick={() => {
                  setIsEditMode('password');
                }}
              >
                비밀번호 설정
              </p>
              <p
                className="unModeP"
                onClick={() => {
                  setIsEditMode('env');
                }}
              >
                환경설정
              </p>
            </ModeParentsDiv>
            <div style={{ marginLeft: '25px' }}>닉네임</div>
            <EttingDiv>
              <InputArea
                style={{ width: '320px' }}
                size="lg"
                variant="default"
                type="text"
                name="nickName"
                value={password.nickName}
                onChange={changePWInputHandler}
              />
            </EttingDiv>
            <div style={{ marginLeft: '25px' }}>이메일</div>
            <EttingDiv>
              <InputDiv>{data.email}</InputDiv>

              <BottomHr />

              <ButtonText
                style={{ width: '320px' }}
                label="저장하기"
                variant="primary"
                active={true}
                disabled={isLoading}
                onClick={() => {
                  nickName(password);
                  onClose();
                }}
              />
            </EttingDiv>
          </InnerDiv>
        ) : isEditMode === 'password' ? (
          <InnerDiv>
            <EttingDiv>
              <h3>계정 설정</h3>
            </EttingDiv>
            <ModeParentsDiv>
              <p
                className="unModeP"
                onClick={() => {
                  setIsEditMode('profile');
                }}
              >
                프로필 설정
              </p>
              <div className="modeDiv">
                <p
                  className="modeP"
                  onClick={() => {
                    setIsEditMode('password');
                  }}
                >
                  비밀번호 설정
                </p>
                <Hr />
              </div>

              <p
                className="unModeP"
                onClick={() => {
                  setIsEditMode('env');
                }}
              >
                환경설정
              </p>
            </ModeParentsDiv>
            <PasswordDiv>
              <div className="innerpw">
                <p>새 비밀번호</p>
                <InputArea
                  style={{ width: '320px' }}
                  size="lg"
                  variant="default"
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
                  style={{ width: '320px' }}
                  size="lg"
                  variant="default"
                  type="password"
                  name="checkPassword"
                  placeholder="비밀번호를 확인해주세요."
                  onChange={handlePasswordChange}
                  required
                />
                {passwordError && (
                  <p style={{ color: 'red', fontSize: '12px' }}>
                    비밀번호가 일치하지 않습니다.
                  </p>
                )}
                {!passwordError && (
                  <p style={{ color: 'red', fontSize: '12px' }}>
                    비밀번호가 일치합니다.
                  </p>
                )}
              </div>

              <p
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '12px',
                  lineHeight: '16px',
                }}
                onClick={() => {
                  if (validateForm(password)) {
                    changePassword(password);
                  }
                }}
              >
                변경하기
              </p>
            </PasswordDiv>
            <EttingDiv>
              <PwBottomHr />
              <ButtonText
                style={{ width: '320px' }}
                label="저장하기"
                variant="primary"
                active={true}
                disabled={isLoading}
                onClick={onClose}
              />
            </EttingDiv>
          </InnerDiv>
        ) : (
          <InnerDiv>
            <EttingDiv>
              <h3>계정 설정</h3>
            </EttingDiv>
            <ModeParentsDiv>
              <p
                className="unModeP"
                onClick={() => {
                  setIsEditMode('profile');
                }}
              >
                프로필 설정
              </p>
              <p
                className="unModeP"
                onClick={() => {
                  setIsEditMode('password');
                }}
              >
                비밀번호 설정
              </p>
              <div className="modeDiv">
                <p
                  className="modeP"
                  onClick={() => {
                    setIsEditMode('env');
                  }}
                >
                  환경설정
                </p>
                <Hr />
              </div>
            </ModeParentsDiv>
            <div>
              <p>테마</p>
              <p>마케팅 정보 소식</p>
            </div>
            <p
              style={{
                display: 'flex',
                justifyContent: 'center',

                color: 'red',
                fontWeight: '400',
                fontSize: '12px',
                lineHeight: '16px',
              }}
            >
              계정 삭제
            </p>
            <EttingDiv>
              <BottomHr />
              <ButtonText
                style={{ width: '320px' }}
                label="저장하기"
                variant="primary"
                active={true}
                disabled={isLoading}
                onClick={onClose}
              />
            </EttingDiv>
          </InnerDiv>
        )}

        {/* <button
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
        </button> */}
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
  /* mix-blend-mode: darken; */
  z-index: 999;
  .modal-overlay {
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
    width: 416px;
    height: 620px;
    /* padding: 21px 48px; */
    border: 1px solid #939aa0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-content: center; */
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
  padding: 12px;
  border-radius: 8px;
  width: 320px;
  color: #9fa4a9;
  background-color: #f7f8f9;
`;

const EttingDiv = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
  .h3 {
    block-size: fit-content;
  }
`;
const FindButton = styled.button`
  border: none;
  color: #9fa4a9;
  background-color: transparent;
  width: fit-content;
  font-size: 11px;
`;

const ModeParentsDiv = styled.div`
  display: flex;
  gap: 20px;
  font-size: 14px;
  justify-content: center;
  .unModeP {
    color: #9ea4aa;
  }
  .modeDiv {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;

const PasswordDiv = styled.div`
  height: fit-content;
  block-size: fit-content;
  .innerpw {
    margin-left: 23px;
  }
`;
const Hr = styled.hr`
  border: 0.5px solid #ff4840;
  width: 60px;
  height: 0px;
  border-bottom: 0px;
  margin-top: -13px;
`;

const BottomHr = styled.hr`
  border: 0.5px solid#E8EBED;
  width: 368px;
  height: 0px;
  border-bottom: 0px;
  margin-top: 220px;
`;

const PwBottomHr = styled.hr`
  border: 0.5px solid#E8EBED;
  width: 368px;
  height: 0px;
  border-bottom: 0px;
  margin-top: 90px;
`;
