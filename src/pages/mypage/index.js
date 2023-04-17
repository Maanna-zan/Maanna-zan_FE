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
    <>
      <div key={data?.id}>
        MyPage
        <div style={{ display: 'flex' }}>
          <h1>{data?.userName}님</h1>
          <SettingPortalExample data={data} />
        </div>
        <div>게시글 {data?.postCnt}</div>
      </div>
      {settingMyPage === 'log' ? (
        <>
          <div style={{ display: 'flex', gap: '5px', alignContent: 'center' }}>
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
                setSettingMyPage('save');
              }}
            >
              보관함
            </p>
          </div>
          <BottomDiv>
            <Log />
          </BottomDiv>
        </>
      ) : settingMyPage === 'post' ? (
        <>
          <div style={{ display: 'flex', gap: '5px', alignContent: 'center' }}>
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
                setSettingMyPage('save');
              }}
            >
              보관함
            </p>
          </div>
          <BottomDiv>
            <FindPost />
          </BottomDiv>
        </>
      ) : (
        <>
          <div style={{ display: 'flex', gap: '5px', alignContent: 'center' }}>
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
                setSettingMyPage('save');
              }}
            >
              보관함
            </p>
          </div>
          <BottomDiv>
            <Save data={data} />
          </BottomDiv>
        </>
      )}
    </>
  );
};

export default MyPage;
const BottomDiv = styled.div`
  width: 100%;
  height: 727px;
  background-color: #f7f8f9;
`;
