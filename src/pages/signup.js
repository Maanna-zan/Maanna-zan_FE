import { apis } from '../shared/axios';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { useConfirm } from '../hook/useConfirm';

const SignUp = () => {
  const router = useRouter();

  // 비동기서버통신을 위한 커스텀 훅
  const [confirm] = useConfirm();
  const confirmEmail = () => {
    confirm({ type: 'email', value: user.email });
  };
  const confirmNickName = () => {
    confirm({ type: 'nickName', value: user.nickName });
  };

  const [user, setUser] = React.useState({
    userName: '',
    nickName: '',
    phoneNumber: '',
    email: '',
    password: '',

    birth: '',
  });
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
      router.push('/signin');
    },
  });
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
    // userName 검사 예
    if (!userData.userName) {
      alert('이름을 입력해주세요.');
      return false;
    }
    // nickName 검사 예
    const userNickName = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
    if (!userNickName.test(userData.nickName)) {
      alert('닉네임을 입력해주세요.');
      return false;
    }

    // 휴대폰번호 검사 예
    const userPhoneNumber = /^01([0|1|6|7|8|9]?)([0-9]{3,4})([0-9]{4})$/;
    if (!userPhoneNumber.test(userData.phoneNumber)) {
      alert('올바른 휴대폰 번호를 입력해주세요.');
      return false;
    }
    // email 검사 예
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      alert('올바른 이메일 주소를 입력해주세요.');
      return false;
    }
    //birth 검사 예
    const userBirth =
      /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
    if (!userBirth.test(userData.birth)) {
      alert('올바른 생년월일 형식으로 입력해주세요.');
      return false;
    }

    // password 검사
    if (!validatePassword(userData.password)) {
      alert(
        '비밀번호는 알파벳 소문자, 대문자, 숫자, 특수문자를 포함한 9~20자여야 합니다.',
      );
      return false;
    }

    return true;
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        // alignContent: 'center',
        gap: '10px',
      }}
    >
      회원가입
      <input
        type="text"
        name="userName"
        value={user.userName}
        placeholder="성명을 입력해주세요."
        onChange={changHandler}
        required
      />
      <input
        type="text"
        name="nickName"
        value={user.nickName}
        placeholder="사용하실 별명을 입력해주세요."
        onChange={changHandler}
        maxLength="16"
        required
      />
      <button type="button" onClick={confirmNickName}>
        중복확인
      </button>
      <p>
        /2자 이상 16자 이하, 영어 또는 숫자 또는 한글로 구성해야 하며 / 한글
        초성 및 모음은 허가하지 않음
      </p>
      <input
        type="text"
        name="phoneNumber"
        value={user.phoneNumber}
        placeholder="전화번호 숫자만 입력해주세요."
        onChange={changHandler}
        required
      />
      <p>
        시작을 숫자 01로 시작하며 그 후에 0,1,6,7,8,9 중에 하나가 나올수도
        있으며 / 숫자 3~4개 이어지고 / // 또 하이픈 - 하나 존재할수도 있으며 /
        숫자 4개가 이어짐
      </p>
      <input
        type="text"
        name="email"
        value={user.email}
        placeholder="이메일 주소를 입력해주세요."
        onChange={changHandler}
        required
      />
      <button type="button" onClick={confirmEmail}>
        중복확인
      </button>
      <p>
        알파벳은 소문자, 대문자 혼합사용 가능하며 / 숫자, 알파벳, 특수문자는
        하나이상씩 사용해야 하며 / 최소 8글자 최대 20글자로 구성되어야 한다
      </p>
      <input
        type="password"
        name="password"
        value={user.password}
        placeholder="비밀번호를 입력해주세요."
        onChange={handlePasswordChange}
        maxLength="20"
        required
      />
      <input
        type="password"
        name="checkPassword"
        // value={user.checkPassword}
        placeholder="비밀번호를 확인해주세요."
        onChange={handlePasswordChange}
        required
      />
      {<p style={{ color: 'red' }}>비밀번호 확인해주세요.</p>}
      {passwordError && (
        <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>
      )}
      {!passwordError && <p style={{ color: 'red' }}>비밀번호가 일치합니다.</p>}
      <input
        type="text"
        name="birth"
        value={user.birth}
        placeholder="생년월일 8글자를 입력해주세요."
        onChange={changHandler}
      />
      <p>8자리 생년월일로 입력해야 함</p>
      <button
        onClick={() => {
          if (validateForm(user)) {
            register(user);
          }
        }}
      >
        회원가입
      </button>
    </div>
  );
};

export default SignUp;
