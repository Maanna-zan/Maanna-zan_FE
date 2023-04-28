import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment/moment';
import 'react-calendar/dist/Calendar.css';
import styles from './react-calender.module.css';
import { useQuery, useMutation } from '@tanstack/react-query';
import styled from 'styled-components';
import Calender from './Calender';
import { cookies } from '@shared/cookie';
import { apis } from '@shared/axios';
import instance from '@shared/instance';
import EventForm from './EventForm';
import Pagination from '@components/Modals/Pagenation2';
import chunk from '@components/Modals/chunk';

function Log() {
  const [value, onChange] = useState(new Date());
  const [activePage, setActivePage] = useState(1);

  // const mark = ['2023-04-20', '2023-04-28'];

  const clickDayHandler = (value, event) => {
    console.log('value', value);
    // alert(`Clicked day:  ${value}`);
  };

  const [mark, setMark] = useState([]);

  const token = cookies.get('access_token');

  const { data } = useQuery({
    queryKey: ['LOG_DATE'],
    queryFn: async () => {
      const data = await apis.get('my-page/calendarList', {
        headers: {
          Access_Token: `${token}`,
        },
      });
      console.log('result~~~', data.data);
      return data.data.data;
    },
    onSuccess: (data) => {
      console.log('successdata', data);
      // setMark([data.data[0].selectedDate]);
      // // // ["2022-02-02", "2022-02-02", "2022-02-10"] 형태로 가져옴
      const mark = data.map((item) => item.selectedDate);
      setMark(mark);
    },
  });
  console.log('res', data);

  const { mutate } = useMutation({
    mutationFn: async (event) => {
      const data = await apis.post('my-page/calendar', event, {
        headers: {
          Access_Token: `${token}`,
        },
      });
      console.log('data', data);
      return data;
    },
    onError: (error) => {
      console.log('error', error.response.data.message);
      alert(error.response.data.message);
    },
    onSuccess: (data) => {
      alert(data.data.message);
    },
  });
  const handleEventSubmit = (event) => {
    console.log('Submitted event:', event);
    mutate(event);
  };

  const chunkedData = chunk(data, 4);
  const currentPageData = chunkedData[activePage - 1] ?? [];

  if (data?.length === 0) {
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
          <Div className="calendar-container">
            <Calendar
              onChange={onChange}
              value={value}
              calendarType="US"
              formatDay={(locale, date) => moment(date).format('DD')}
              className="mx-auto w-full text-sm border-b"
              tileContent={({ date, view }) => {
                // 날짜 타일에 컨텐츠 추가하기 (html 태그)
                // 추가할 html 태그를 변수 초기화

                let html = [];
                // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
                if (mark.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
                  html.push(<div className="dot"></div>);
                }
                // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
                return (
                  <React.Fragment key={moment(date).format('YYYY-MM-DD')}>
                    <div className="flex justify-center items-center absoluteDiv">
                      {html}
                    </div>
                  </React.Fragment>
                );
              }}
            />
            <div className="text-gray-500 mt-4">
              {moment(value).format('YYYY년 MM월 DD일')}
            </div>
            <EventForm
              selectedDate={moment(value).format('YYYY-MM-DD')}
              onSubmit={handleEventSubmit}
            />
          </Div>
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
  } else {
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
          <Div className="calendar-container">
            <Calendar
              onChange={onChange}
              value={value}
              calendarType="US"
              formatDay={(locale, date) => moment(date).format('DD')}
              className="mx-auto w-full text-sm border-b"
              tileContent={({ date, view }) => {
                // 날짜 타일에 컨텐츠 추가하기 (html 태그)
                // 추가할 html 태그를 변수 초기화

                let html = [];
                // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
                if (mark.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
                  html.push(<div className="dot"></div>);
                }
                // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
                return (
                  <React.Fragment key={moment(date).format('YYYY-MM-DD')}>
                    <div className="flex justify-center items-center absoluteDiv">
                      {html}
                    </div>
                  </React.Fragment>
                );
              }}
            />
            <div className="text-gray-500 mt-4">
              {moment(value).format('YYYY년 MM월 DD일')}
            </div>
            <EventForm
              selectedDate={moment(value).format('YYYY-MM-DD')}
              onSubmit={handleEventSubmit}
            />
          </Div>
          <ReviewDiv>
            {currentPageData.map((calLog) => (
              <CalLogDiv key={calLog.id}>
                <img
                  src="Group 2248.png"
                  alt="글쓰기 수정 버튼"
                  className="editImg"
                />
                <div>
                  <p>{calLog.title}</p>
                  <p>{calLog.content}</p>
                  <p>{calLog.selectedDate.substr(2).replace(/-/gi, '.')}</p>
                </div>
              </CalLogDiv>
            ))}
            <Pagination
              pages={chunkedData.map((_, i) => i + 1)}
              activePage={activePage}
              setPage={setActivePage}
            />
          </ReviewDiv>
        </div>
      </div>
    );
  }
}

export default Log;

const ReviewDiv = styled.div`
  width: 688px;

  display: flex;
  flex-direction: column;
  .p {
    font-size: 24px;
    font-weight: 600;
  }
`;

const Div = styled.div`
  .react-calendar {
    width: 400px;
    max-width: 100%;
    background: rgb(255, 255, 255);
    /* border: 1px solid #a0a096; */
    border-radius: 8px;
    border: 1px solid #e8ebed; */
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
    padding: 10px;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    color: #ff4840;
    background: white;
  }
  .react-calendar__tile--now {
    background: #ff4840;
    border-radius: 12px;
  }
  .react-calendar__navigation__label > span {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    border-radius: 12px;
    color: white;
  }
  .react-calendar__tile--active {
    background-color: #ff4840;
    border-radius: 12px;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #000000;
  }
  .react-calendar__month-view__weekdays {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
  .dot {
    height: 8px;
    width: 8px;
    background-color: #f87171;
    border-radius: 50%;
    display: flex;
    margin-left: 16px;
  }

`;

const CalLogDiv = styled.div`
  width: 672px;
  height: 125px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e8ebed;
  margin-top: 12px;
  display: flex;
  gap: 20px;
  padding: 12px;
  .editImg {
    height: 38px;
    width: 38px;
  }
`;
