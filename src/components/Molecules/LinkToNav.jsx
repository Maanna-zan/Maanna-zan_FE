import React from 'react';
import { ButtonText } from '@components/Atoms/Button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cookies } from '../../shared/cookie';
import { useRouter } from 'next/router';
import SignInPotalExample from '@components/Modals/SignInPortalExample';
import SignUpPortalExample from '@components/Modals/SignUpPortalExample';
import { useQuery } from '@tanstack/react-query';
import { apis } from '@shared/axios';
import instance from '@shared/instance';
import styled from 'styled-components';

export const LinkToNav = () => {
  const router = useRouter();
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  // 토큰 삭제 함수
  const deleteTokens = () => {
    cookies.remove('access_token');
    cookies.remove('refresh_token');
  };
  const handleLogout = () => {
    deleteTokens();
    router.push('/');
  };
  const token = cookies.get('access_token');
  const refresh_token = cookies.get('refresh_token');
  console.log('access_token', token);
  console.log('refresh_token', refresh_token);

  useEffect(() => {
    setIsLoginMode(!!token);
  }, [token]);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['GET_MYPAGE'],
    queryFn: async () => {
      const { data } = await apis.get('/my-page', {
        headers: {
          Access_Token: `${token}`,
        },
      });

      console.log('data', data.data);
      return data.data;
    },
    // onError 콜백 함수 구현
    onError: (error) => {
      console.log(error);
      // // 에러 처리
      if (error.response.data.statusCode === 401) {
        const refreshToken = cookies.get('refresh_token');
        if (refreshToken) {
          const data = instance.get('/my-page', {
            headers: {
              refresh_token: `${refreshToken}`,
            },
          });
          return data;
        }
      }
    },
  });

  return (
    <nav>
      <Link href="/alcohols">
        <ButtonText variant="hoverRed" label={'리스트'}></ButtonText>
      </Link>
      <Link href="/map">
        <ButtonText variant="hoverRed" label={'탐색'}></ButtonText>
      </Link>
      <Link href="/community">
        <ButtonText variant="hoverRed" label={'커뮤니티'}></ButtonText>
      </Link>
      {!token ? (
        <>
          <SignInPotalExample />
          <SignUpPortalExample />
        </>
      ) : (
        <>
          <ButtonText
            variant="hoverRed"
            onClick={() => setShowSubMenu(!showSubMenu)}
            label={`${data?.userName}님`}
          ></ButtonText>
          {showSubMenu && (
            <Ullist className="ullist">
              <li className="listName">
                <a
                  onClick={() => setShowSubMenu(!showSubMenu)}
                >{`${data?.userName}님`}</a>
              </li>
              <li className="list">
                <a
                  className="email"
                  onClick={() => setShowSubMenu(!showSubMenu)}
                >{`${data?.email}`}</a>
              </li>
              <Link href="/mypage">
                <li className="list">
                  <a onClick={() => setShowSubMenu(!showSubMenu)}>마이페이지</a>
                </li>
              </Link>
              <li className="list">
                <a onClick={handleLogout}>로그아웃</a>
              </li>
            </Ullist>
          )}
        </>
      )}
    </nav>
  );
};

const Ullist = styled.ul`
  gap: 24px;
  display: flex;
  border-radius: 0px 0px 12px 12px;
  flex-direction: column;
  align-items: flex-start;
  width: 166px;
  height: 170px;
  margin-left: 245px;
  margin-top: -1px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  .listName {
    margin-left: -30px;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    list-style: none;
  }
  .list {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    margin-left: -30px;
    list-style: none;
    :hover {
      color: red;
    }
  }
  .email {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #9ea4aa;
  }
`;
