import React, { useState } from 'react';
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

const MyPage = () => {
  const router = useRouter();
  const token = cookies.get('access_token');
  const refresh_token = cookies.get('refresh_token');
  const [settingMyPage, setSettingMyPage] = useState('log');
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['GET_MYPAGE'],
    queryFn: async () => {
      const { data } = await instance.get('/my-page', {
        headers: {
          Access_Token: `${token}`,
        },
      });

      console.log('data', data.data);
      return data.data;
    },
    // onError 콜백 함수 구현
    onError: (error) => {
      console.log('error', error);
    },
  });

  return (
    <div style={{ zIndex: '200' }}>
      <WebWrapper>
        <UserDiv key={data?.id}>
          <div className="userSetting">
            <UserNameP>
              <Span>{data?.userName}</Span>님
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
            <div
              style={{ display: 'flex', gap: '40px', alignContent: 'center' }}
            >
              <p
                style={{ color: 'red' }}
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
            </div>
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
            <div
              style={{
                display: 'flex',
                gap: '40px',
                alignContent: 'center',
              }}
            >
              <p
                onClick={() => {
                  setSettingMyPage('log');
                }}
              >
                기록
              </p>
              <p
                style={{ color: 'red' }}
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
            </div>
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
            <div
              style={{
                display: 'flex',
                gap: '40px',
                alignContent: 'center',
              }}
            >
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
                style={{ color: 'red' }}
                onClick={() => {
                  setSettingMyPage('like');
                }}
              >
                좋아요
              </p>
            </div>
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
            <div
              style={{ display: 'flex', gap: '10px', alignContent: 'center' }}
            >
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
            </div>
          </WebWrapper>

          <BottomDiv>
            <WebWrapper>
              <Save data={data} />
            </WebWrapper>
          </BottomDiv>
        </>
      )}
    </div>
  );
};

export default MyPage;

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
  height: 727px;
  background-color: #f7f8f9;
`;
