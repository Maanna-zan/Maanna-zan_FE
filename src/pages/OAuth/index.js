import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { apis } from '@shared/axios';
import { cookies } from '@shared/cookie';
import styled from 'styled-components';
import { InputArea } from '@components/Atoms/Input';
import { ButtonText } from '@components/Atoms/Button';

import { toast } from 'react-toastify';
const OAuth = (Toast) => {
  const router = useRouter();

  const [password, setPassword] = useState('');

  const handleClick = () => {
    router.push('/');
    toast.info('임시비밀번호로 로그인하셨습니다.');
  };

  const access_token = cookies.get('access_token');

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
      cookies.remove('access_token');
      cookies.remove('refresh_token');
      cookies.remove('nick_name');
      localStorage.removeItem('nick_name');
      alert('비밀번호 변경이 완료됐습니다. 다시 한 번 로그인 부탁드립니다.');
      router.push('/');
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
    <div style={{ backgroundColor: ' #F7F8F9', height: '1000px' }}>
      <Container>
        <p className="infor">임시 비밀번호로 로그인 하셨습니다.</p>
        <div className="notice">
          <h1 className="plz">안전한 계정을 위해서 비밀번호를 변경해주세요</h1>
          <img className="img" src="Group 2521.png" alt="비밀번호 변경" />
        </div>

        <p className="pw">현재 비밀번호</p>
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
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <p className="pw">새 비밀번호</p>
          <p className="pwnt">8~16 자리 / 영문 대소문자, 숫자, 특수문자 포함</p>
        </div>

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
        />
        <p className="pw">비밀번호 확인</p>
        <InputArea
          size="lg"
          variant="default"
          type="password"
          name="checkPassword"
          value={password.checkPassword}
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
        <div className="twoButton">
          <button className="cancel" onClick={handleClick}>
            취소
          </button>

          <button
            className="confirm"
            onClick={() => {
              if (validateForm(password)) {
                changePassword(password);
                setPassword({ password: '' });
              }
            }}
          >
            확인
          </button>
        </div>
      </Container>
    </div>
  );
};

export default OAuth;

const Container = styled.div`
  background-color: white;
  width: 636px;
  height: 486px;
  margin: auto;
  position: relative;
  top: 20%;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(74, 74, 74, 0.1);
  .infor {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
  .notice {
    margin-top: -30px;
    align-items: center;
    display: flex;
    gap: 20px;
  }
  .plz {
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
  }
  .img {
    width: 20px;
    height: 20px;
  }
  .pw {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
  }
  .pwnt {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #9ea4aa;
    margin-top: 15px;
  }
  .twoButton {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
  .cancel {
    background-color: transparent;
    border: 1px solid #9ea4aa;
    color: #9ea4aa;
    border-radius: 10px;
    padding: 5px 14px;
    :hover {
      color: white;
      border: 1px solid white;
      background-color: #c9cdd2;
    }
  }
  .confirm {
    background-color: #ff4840;
    border: 1px solid #ff4840;
    color: white;
    border-radius: 10px;
    padding: 5px 14px;
    :hover {
      border: 1px solid #c8150d;
      background-color: #c8150d;
    }
  }
`;
