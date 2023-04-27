import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment/moment';
import 'react-calendar/dist/Calendar.css';
import styles from './react-calender.module.css';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import Calender from './Calender';
import { cookies } from '@shared/cookie';
import { apis } from '@shared/axios';
import instance from '@shared/instance';

function Log() {
  const token = cookies.get('access_token');

  const { data } = useQuery({
    querryKey: ['GET_MYALCOHOLSLIST'],
    queryFn: async () => {
      const data = await instance.get('/my-page/likeAlkol', {
        headers: {
          Access_Token: `${token}`,
        },
      });
      console.log('data--------------', data);
      return data;
    },
  });
  return (
    <div style={{ display: 'flex', alignItems: 'center', zIndex: '300' }}>
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          gap: '24px',
          flexDirection: 'row',
          width: '100%',
          zIndex: '310',
        }}
      >
        <Calender />
        <ReviewDiv>
          <p>나의 로그</p>
          <div
            style={{
              width: '688px',
              height: '459px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: '310',
            }}
          >
            <img
              style={{ width: '160px', height: '160px', zIndex: '320' }}
              src="Group 2041.png"
              alt="작성한 기록이 없습니다."
            />
            <p>작성한 기록이 없습니다.</p>
          </div>
        </ReviewDiv>
      </div>
    </div>
  );
}

export default Log;

const ReviewDiv = styled.div`
  width: 688px;
  height: 459px;
  display: flex;
  flex-direction: column;
  .p {
    font-size: 24px;
    font-weight: 600;
  }
`;
