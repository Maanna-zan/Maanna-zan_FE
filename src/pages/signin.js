import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { apis } from '../shared/axios';
import { cookies } from '../shared/cookie';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';
import { StyledButton } from '@components/Atoms/Button';
import { ButtonText } from '@components/Atoms/Button';
import { InputArea } from '@components/Atoms/Input';
import { Header } from '@components/Organisms/Header';
import { MainSearch } from '@components/Molecules/MainSearch';
import { HeadInfo } from '@components/Atoms/SEO/HeadInfo';

const SignIn = () => {
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
      // cookies.set('email', decoded.sub, { path: '/' });
    },
    onSuccess: () => {
      router.push('/');
    },
  });

  //가드
  // useEffect(() => {
  //   const token = cookies.get('refresh_token');
  //   if (token) {
  //     router.push('/todos');
  //   }
  // }, []);

  //쿠키가 있는지 확인
  //쿠키가 있으면 todolist로 보내기
  // useEffect(() => {
  //   const token = cookies.get('token');
  //   console.log(token);
  //   if (token) {
  //     router.push('/todos');
  //   }
  // }, []);

  return (
    <div>
      <HeadInfo title="만나잔에 오신걸 환영합니다! 로그인해주세요~"/>
      <Header></Header>
      로그인
      <InputArea
        type="text"
        name="email"
        value={user.email}
        onChange={changHandler}
        placeholder="id를 입력하세요"
      />
      <InputArea
        type="password"
        name="password"
        value={user.password}
        onChange={changHandler}
        placeholder="비밀번호를 입력하세요"
      />
      <button
        onClick={() => {
          register(user);
        }}
      >
        로그인
      </button>
      <button
        onClick={() => {
          router.push('/signup');
        }}
      >
        회원가입
      </button>
      <ButtonText
        label="Click me"
        size="md"
        variant="primary"
        active={true}
        onClick={() => console.log('Button clicked!')}
      />
      <MainSearch></MainSearch>
    </div>
  );
};
export default SignIn;
