import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apis } from '@shared/axios';
import { cookies } from '@shared/cookie';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { InputArea } from '@components/Atoms/Input';
import { ButtonText } from '@components/Atoms/Button';
import Save from '@features/mypage/Save';
import { useConfirm } from '../../hook/useConfirm';
import { FlexRow } from '@components/Atoms/Flex';

export default function SettingModal({ onClose, data }) {
  const router = useRouter();
  // console.log('data', data);
  const [isEditMode, setIsEditMode] = useState('profile');

  const [isNickNameAvailable, setIsNickNameAvailable] = useState(false);

  const [password, setPassword] = useState('');
  const changePWInputHandler = (e) => {
    setIsNickNameAvailable(false);
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
      // console.log(error.response.status);
      const status = error.response.status;
      // // 에러 처리
      if (status == 415) {
        alert('입력값을 확인해주세요');
      } else if (status == 400) {
        alert('중복확인을 해주세요.');
      }
    },
    onSuccess: (data) => {
      // console.log('data', data);
      alert('닉네임 변경이 완료됐습니다.');
      onClose();
      router.push('/mypage');
    },
  });
  // 비동기서버통신을 위한 커스텀 훅
  const [confirm] = useConfirm();
  const confirmNickName = () => {
    setIsNickNameAvailable(true);
    confirm({ type: 'nickName', value: password.nickName }, () => {
      nickName(password);
    });
  };

  const changeNickNameButton = () => {
    if (!isNickNameAvailable || '') {
      return alert('중복확인을 해주세요');
    } else {
      nickName(password);
    }
  };
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
      // console.error(error);
      // 에러 처리
      alert('입력 된 비밀번호에 문제가 있습니다. 다시 한 번 살펴봐주세요.');
    },
    onSuccess: () => {
      alert('비밀번호 변경이 완료됐습니다.');
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
            <p>닉네임</p>
            <FlexRow style={{ gap: '20px' }}>
              <InputArea
                size="lg"
                variant="default"
                type="text"
                name="nickName"
                value={password.nickName}
                onChange={changePWInputHandler}
                onKeyDown={(e) => {
                  if (e.key === ' ') e.preventDefault();
                }}
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
            </FlexRow>

            <p>이메일</p>
            <InputDiv>{data.email}</InputDiv>

            <BottomHr />
            <ButtonText
              label="저장하기"
              variant="primary"
              active={true}
              // disabled={isLoading || !isNickNameAvailable} // add the `!isNickNameAvailable` condition
              onClick={changeNickNameButton}
            />
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
            <p>기존 비밀번호</p>
            <InputArea
              size="lg"
              variant="default"
              type="password"
              name="oldPassword"
              placeholder="현재 비밀번호를 입력해주세요."
              value={password.oldPassword}
              onChange={handlePasswordChange}
              maxLength="20"
              required
              onKeyDown={(e) => {
                if (e.key === ' ') e.preventDefault();
              }}
            />
            <p>새 비밀번호</p>
            <InputArea
              size="lg"
              variant="default"
              type="password"
              name="password"
              placeholder="변경할 비밀번호를 입력해주세요."
              value={password.password}
              onChange={handlePasswordChange}
              maxLength="20"
              required
              onKeyDown={(e) => {
                if (e.key === ' ') e.preventDefault();
              }}
            />
            <p>비밀번호 확인</p>
            <InputArea
              size="lg"
              variant="default"
              type="password"
              name="checkPassword"
              value={password.checkPassword}
              placeholder="비밀번호를 확인해주세요."
              onChange={handlePasswordChange}
              required
              onKeyDown={(e) => {
                if (e.key === ' ') e.preventDefault();
              }}
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
            <p
              style={{
                margin: '0 auto',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '12px',
                lineHeight: '16px',
              }}
              onClick={() => {
                if (validateForm(password)) {
                  changePassword(password);
                  setPassword(' ');
                }
              }}
            >
              변경하기
            </p>
            <BottomHr />
            <ButtonText
              label="저장하기"
              variant="primary"
              active={true}
              disabled={isLoading}
              onClick={onClose}
            />
          </InnerDiv>
        ) : isEditMode === 'env' ? (
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

            <p
              onClick={() => {
                setIsEditMode('delete');
              }}
              style={{
                color: 'red',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              계정 삭제
            </p>
            <BottomHr />
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
            <Save data={data} />
            <BottomHr />
            <ButtonText
              label="이전으로"
              variant="primary"
              active={true}
              disabled={isLoading}
              onClick={() => {
                setIsEditMode('env');
              }}
            />
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

const ModeParentsDiv = styled.div`
  display: flex;
  gap: 20px;
  font-size: 14px;
  justify-content: center;
  .unModeP {
    cursor: pointer;
    color: #9ea4aa;
  }
  .modeDiv {
    display: flex;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
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
  margin-top: 170px;
`;
