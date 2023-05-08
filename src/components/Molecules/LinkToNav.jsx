import React from 'react';
import { ButtonText } from '@components/Atoms/Button';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { cookies } from '../../shared/cookie';
import { useRouter } from 'next/router';
import SignInPotalExample from '@components/Modals/SignInPortalExample';
import SignUpPortalExample from '@components/Modals/SignUpPortalExample';
import { useQuery } from '@tanstack/react-query';
import { apis } from '@shared/axios';
import instance from '@shared/instance';
import styled from 'styled-components';
import { WebWrapper } from '@components/Atoms/Wrapper';

import { createPortal } from 'react-dom';
import SignInModal from '@components/Modals/SignInModal';
import SignUpModal from '@components/Modals/SignUpModal';

export const LinkToNav = () => {
  const router = useRouter();
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);

  //모달창 여닫는 useState
  const [showsignInModal, setShowsignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  // console.log('setShowSignInModal', showsignInModal);
  const token = cookies.get('access_token');
  const nickName = cookies.get('nick_name');

  // 토큰 삭제 함수
  const deleteTokens = () => {
    cookies.remove('access_token');
    cookies.remove('refresh_token');
    cookies.remove('nick_name');
  };
  const handleLogout = () => {
    deleteTokens();
    setShowsignInModal(false);
    router.push('/');
  };

  // console.log('access_token', token);
  // console.log('nickName', nickName);

  useEffect(() => {
    setIsLoginMode(!!token);
    setShowSubMenu(false); // 추가된 코드
  }, [token, setShowSubMenu]);
  //Token Error

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['GET_MYPAGE'],
    queryFn: async () => {
      const { data } = await apis.get('/my-page', {
        headers: {
          Access_Token: `${token}`,
        },
      });

      // console.log('data', data.data);
      return data.data;
    },
    enabled: !!token,
    // onError 콜백 함수 구현
    onError: (error) => {
      // console.log('error', error);
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

  const ref = useRef(null); // nav 태그를 참조하기 위한 useRef

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowSubMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <>
      <nav style={{ display: 'flex' }}>
        <Link href="/alcohols">
          <span>
            <ButtonText
              style={{ font: `var(--title2-semibold) Pretendard sans-serif` }}
              variant={
                router.pathname === '/alcohols' ? 'activeRed' : 'hoverRed'
              }
              label={'술집 리스트'}
            ></ButtonText>
          </span>
        </Link>
        <Link href="/map">
          <ButtonText
            style={{ font: `var(--title2-semibold) Pretendard sans-serif` }}
            variant={router.pathname === '/map' ? 'activeRed' : 'hoverRed'}
            label={'지도 검색'}
          ></ButtonText>
        </Link>
        <Link href="/community">
          <ButtonText
            style={{ font: `var( --title2-semibold) Pretendard sans-serif` }}
            variant={
              router.pathname === '/community' ? 'activeRed' : 'hoverRed'
            }
            label={'커뮤니티'}
          ></ButtonText>
        </Link>
        {!token ? (
          <>
            <ButtonText
              style={{ font: `var( --title2-semibold) Pretendard sans-serif` }}
              variant="hoverRed"
              label={'로그인'}
              onClick={() => setShowsignInModal(true)}
            ></ButtonText>
            {showsignInModal &&
              createPortal(
                <SignInModal
                  setShowsignInModal={setShowsignInModal}
                  setShowSignUpModal={setShowSignUpModal}
                  onClose={() => setShowsignInModal(false)}
                  onOpen={() => setShowsignInModal(true)}
                  onClosed={() => setShowsignInModal(!showsignInModal)}
                />,
                document.body,
              )}

            <>
              <ButtonText
                style={{
                  font: `var( --title2-semibold) Pretendard sans-serif`,
                }}
                variant="hoverRed"
                label={'회원가입'}
                onClick={() => setShowSignUpModal(true)}
              ></ButtonText>
              {showSignUpModal &&
                createPortal(
                  <SignUpModal
                    onClose={() => setShowSignUpModal(false)}
                    onOpen={() => setShowSignUpModal(true)}
                  />,
                  document.body,
                )}
            </>
          </>
        ) : (
          <span
            style={{
              font: `var(--title2-semibold) Pretendard sans-serif`,

              position: 'relative',
              width: 'fit-content',
              zIndex: '700',
            }}
          >
            <ButtonText
              style={{
                font: `var(--title2-semibold) Pretendard sans-serif`,
                padding: '11px 0px 11px 20px',
                // position: 'relative',
              }}
              className="userNameBT"
              variant="hoverRed"
              onClick={() => setShowSubMenu(!showSubMenu)}
              label={`${nickName}님`}
            ></ButtonText>
            {showSubMenu && (
              <Ullist ref={ref} className="ullist">
                <li className="listName">
                  <a
                    onClick={() => setShowSubMenu(!showSubMenu)}
                  >{`${nickName}님`}</a>
                </li>
                <li className="list">
                  <a
                    className="email"
                    onClick={() => setShowSubMenu(!showSubMenu)}
                  >{`${data?.email}`}</a>
                </li>
                <Link href="/mypage">
                  <li className="list">
                    <a onClick={() => setShowSubMenu(!showSubMenu)}>
                      마이페이지
                    </a>
                  </li>
                </Link>
                <li className="list">
                  <a onClick={handleLogout}>로그아웃</a>
                </li>
              </Ullist>
            )}
          </span>
        )}
      </nav>
    </>
  );
};

const Ullist = styled.ul`
  z-index: 800;
  position: absolute;
  left: 5px;
  gap: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 0px 0px 12px 12px;
  width: 166px;
  height: 170px;
  /* margin-left: 400px;
  margin-top: -1px; */
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
    display: flex;
    word-wrap: break-word;
    flex-wrap: wrap;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #9ea4aa;
  }
`;
