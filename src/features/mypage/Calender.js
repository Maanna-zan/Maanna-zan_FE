import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import moment from 'moment/moment';
import styles from './react-calender.module.css';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { apis } from '@shared/axios';
import EventForm from './EventForm';

const Calender = () => {
  const [value, onChange] = useState(new Date());
  console.log('onChange', Calendar);
  const mark = ['2023-04-20', '2023-04-28'];

  const clickDayHandler = (value, event) => {
    console.log('value', value);
    // alert(`Clicked day:  ${value}`);
  };

  //   const [mark, setMark] = useState([]);

  //   const { data } = useQuery(
  //     ["logDate", month],
  //     async () => {
  //       const result = await apis.get(
  //         `/api/healthLogs?health_log_type=DIET`
  //       );
  //       return result.data;
  //     },
  //     {
  //       onSuccess: (data: any) => {
  //         setMark(data);
  //        // ["2022-02-02", "2022-02-02", "2022-02-10"] 형태로 가져옴
  //       },
  //     }
  //   );

  const handleEventSubmit = (event) => {
    console.log('Submitted event:', event);
    // You can send the event data to the server here using an API call
  };
  return (
    <div>
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
              <>
                <div className="flex justify-center items-center absoluteDiv">
                  {html}
                </div>
              </>
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
    </div>
  );
};

export default Calender;

const Div = styled.div`
  .react-calendar {
    width: 400px;
    max-width: 100%;
    background: rgb(255, 255, 255);
    /* border: 1px solid #a0a096; */
    border-radius: 8px;
    border: 1px solid #e8ebed;
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
