import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { cookies } from '../../shared/cookie';
import { apis } from '../../shared/axios';
import { useRouter } from 'next/router';
import instance from '@shared/instance';
import styled from 'styled-components';
import SettingPortalExample from '@components/Modals/SettingPortalExample';
import FindPost from '@features/mypage/FindPost';
import Log from '@features/mypage/Log';
import Save from '@features/mypage/Save';
import { WebWrapper } from '@components/Atoms/Wrapper';
import MyWritePost from '@features/mypage/MyWritePost';
import NoToken from '@components/Templates/withoutToken/NoToken';

const MyPage = () => {
  const router = useRouter();
  const token = cookies.get('access_token');
  const [settingMyPage, setSettingMyPage] = useState('log');
  const [userNickName, setUserNickName] = useState('');

  useEffect(() => {
    const nick_name = cookies.get('nick_name');
    setUserNickName(nick_name);
  }, []);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['GET_MYPAGE'],
    queryFn: async () => {
      const { data } = await instance.get('/my-page', {
        headers: {
          Access_Token: `${token}`,
        },
      });

      // console.log('data', data.data);
      return data.data;
    },
    // onError 콜백 함수 구현
    onError: (error) => {
      // console.log('error', error);
    },
  });

  return (
    <>
      {!token ? (
        <>
          <NoToken />
        </>
      ) : (
        <div style={{ zIndex: '200' }}>
          <WebWrapper>
            <UserDiv key={data?.id}>
              <div className="userSetting">
                <UserNameP>
                  <Span>{data?.nickName}</Span>님
                </UserNameP>
                <SettingPortalExample data={data} />
              </div>
              <p className="postsCount">
                게시글 <span className="spanPostsCount">{data?.postCnt}</span>
              </p>
            </UserDiv>
          </WebWrapper>
          {settingMyPage === 'log' ? (
            <>
              <WebWrapper>
                <TabButton>
                  <p
                    className="active"
                    onClick={() => {
                      setSettingMyPage('log');
                    }}
                  >
                    기록
                  </p>
                  <p
                    className="wait"
                    onClick={() => {
                      setSettingMyPage('post');
                    }}
                  >
                    내가 작성한 글 보기
                  </p>
                  <p
                    className="wait"
                    onClick={() => {
                      setSettingMyPage('like');
                    }}
                  >
                    좋아요
                  </p>
                </TabButton>
              </WebWrapper>
              <BottomDiv>
                <WebWrapper>
                  <Log />
                </WebWrapper>
              </BottomDiv>
            </>
          ) : settingMyPage === 'post' ? (
            <>
              <WebWrapper>
                <TabButton>
                  <p
                    className="wait"
                    onClick={() => {
                      setSettingMyPage('log');
                    }}
                  >
                    기록
                  </p>
                  <p
                    className="active"
                    onClick={() => {
                      setSettingMyPage('post');
                    }}
                  >
                    내가 작성한 글 보기
                  </p>
                  <p
                    className="wait"
                    onClick={() => {
                      setSettingMyPage('like');
                    }}
                  >
                    좋아요
                  </p>
                </TabButton>
              </WebWrapper>

              <BottomDiv>
                <WebWrapper>
                  <MyWritePost data={data} />
                </WebWrapper>
              </BottomDiv>
            </>
          ) : settingMyPage === 'like' ? (
            <>
              <WebWrapper>
                <TabButton>
                  <p
                    className="wait"
                    onClick={() => {
                      setSettingMyPage('log');
                    }}
                  >
                    기록
                  </p>
                  <p
                    className="wait"
                    onClick={() => {
                      setSettingMyPage('post');
                    }}
                  >
                    내가 작성한 글 보기
                  </p>
                  <p
                    className="active"
                    onClick={() => {
                      setSettingMyPage('like');
                    }}
                  >
                    좋아요
                  </p>
                </TabButton>
              </WebWrapper>
              <BottomDiv>
                <WebWrapper>
                  <FindPost />
                </WebWrapper>
              </BottomDiv>
            </>
          ) : (
            <>
              <WebWrapper>
                <TabButton>
                  <p
                    onClick={() => {
                      setSettingMyPage('log');
                    }}
                  >
                    기록
                  </p>
                  <p
                    onClick={() => {
                      setSettingMyPage('post');
                    }}
                  >
                    내가 작성한 글 보기
                  </p>
                  <p
                    onClick={() => {
                      setSettingMyPage('like');
                    }}
                  >
                    좋아요
                  </p>
                  <p
                    style={{ color: 'red' }}
                    onClick={() => {
                      setSettingMyPage('save');
                    }}
                  >
                    보관함
                  </p>
                </TabButton>
              </WebWrapper>

              <BottomDiv>
                <WebWrapper>
                  <Save data={data} />
                </WebWrapper>
              </BottomDiv>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MyPage;
const TabButton = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  .active {
    color: #ff4840;
    cursor: pointer;
    font-size: 15px;
  }
  .wait {
    cursor: pointer;
    :hover {
      color: #ff6a64;
    }
  }
`;

const UserDiv = styled.div`
  margin-top: 49px;
  .userSetting {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .postsCount {
    margin-top: -18px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
  }
  .spanPostsCount {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    margin-left: 10px;
  }
`;

const UserNameP = styled.p`
  font-family: 'Pretendard';
  font-style: normal;
  line-height: 36px;
  font-size: 28px;
`;
const Span = styled.span`
  font-style: normal;
  line-height: 36px;
  font-weight: 700;
  font-size: 28px;
`;
const BottomDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f7f8f9;
  padding-bottom: 150px;
`;
