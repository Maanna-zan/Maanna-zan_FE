import React from 'react';
import Calendar from 'react-calendar';
import moment from 'moment/moment';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import { cookies } from '@shared/cookie';
import { useRouter } from 'next/router';
import { Link } from 'react-scroll';
import { WebWrapper } from '@components/Atoms/Wrapper';
import { ButtonText } from '@components/Atoms/Button';

const MapAppointment = () => {
  const router = useRouter();
  const [isLoginMode, setIsLoginMode] = useState(false);
  //버튼으로 보내줄 값들
  const [appointment, setAppointment] = React.useState({
    selectedDate: '',
    //필요한 key, value 값 추가해서 사용하세용 !
    //1번 출발 : '',
  });
  useEffect(() => {
    const token = cookies.get('access_token');
    setIsLoginMode(token);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 266 으로 가서 글을 확인해주세요 ~
  const [value, onChange] = useState(new Date());
  console.log('onChange', Calendar);
  const mark = ['2023-04-20', '2023-04-28'];

  const clickDayHandler = (value, event) => {
    console.log('value', value);
    alert(`Clicked day:  ${moment(value).format('YYYY-MM-DD')}`);
  };
  //value -> 원래 형태 'YYYY년 MM월 DD일' , 'YYYY-MM-DD', 'MM-DD' 이런식으로 변경이 가능합니다

  const selectAppointmentHandler = () => {
    setAppointment({
      selectedDate: moment(value).format('YYYY-MM-DD'),
    });
  };
  console.log('setAppointmentvalue', appointment);
  const nickName =
    typeof window !== 'undefined'
      ? localStorage.getItem('nick_name') ?? ''
      : '';

  return (
    <>
      {!isLoginMode ? (
        <div>
          <StWebBg
            onClick={() => {
              router.push('/map');
            }}
          ></StWebBg>
          <LoginNotice>
            로그인 시 이용 가능합니다.
            <Link
              className="Go"
              onClick={scrollToTop}
              to="top"
              smooth={true}
              duration={500}
            >
              로그인 하러가기
            </Link>
          </LoginNotice>
        </div>
      ) : (
        <div>
          <WebWrapper
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            <Div className="calendar-container">
              <Calendar
                //196 줄의 핸들러 함수 -> 날짜 얼럿이 뜹니다.
                //onChange={clickDayHandler}
                //유즈스테이트로 달력에서 누른 날의 밸류 값이 밑에 글씨로 떠오릅니다.
                onChange={onChange}
                value={value}
                //일에서 토요일로 요일을 정렬해줍니다.
                calendarType="US"
                //1일 2일 의 일자를 화면상에서 뺴줍니다.
                formatDay={(locale, date) => moment(date).format('DD')}
                className="mx-auto w-full text-sm border-b"
              />
              <p className="textGray">
                <span className="textRed">{nickName}</span>님이 선택하신 약속
                날짜는
                <span className="textRed">
                  {moment(value).format('YYYY년 MM월 DD일')}
                </span>
                입니다.
              </p>
              <ButtonText
                size="lg"
                variant="primary"
                label="약속잡기"
                onClick={selectAppointmentHandler}
              />
            </Div>
            <Region>
              <div>출발 장소</div>
              <p className="depart">1번 출발장소</p>
              <p className="depart">2번 출발장소</p>
              <p className="depart">3번 출발장소</p>
              <p className="depart">4번 출발장소</p>
              <p className="depart">
                중간위치 술집장소:{' '}
                <span className="departChild">서울시 개포동 문래아파트</span>
              </p>
            </Region>
          </WebWrapper>
        </div>
      )}
    </>
  );
};

export default MapAppointment;

const Div = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  gap: 70px;
  align-items: center;
  .react-calendar {
    width: 487px;
    height: 318px;
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
    width: fit-content;
    block-size: fit-content;
  }
  .react-calendar__navigation__label > span {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    border-radius: 12px;
    /* Primary Color/active */
    background: #ffe0df;
  }
  .react-calendar__month-view__days__day--weekend {
    color: black;
  }
  /* react-calendar__tile react-calendar__month-view__days__day react-calendar__month-view__days__day--weekend default_pointer_cs */
  .react-calendar__tile--active {
    background: #ff6a64;
    border-radius: 12px;
  }
  .react-calendar__month-view__days__day—weekend {
    color: #000000;
  }
  /* react-calendar__navigation__arrow react-calendar__navigation__next2-button default_pointer_cs */
  .react-calendar__navigation :hover,
  .react-calendar__navigation :focus {
    border-radius: 50%;
    color: red;
  }
  .react-calendar__month-view__weekdays {
    font-size: 16px;
    line-height: 24px;
  }

  .textGray {
    font-size: 20px;
    font-weight: 400;
    display: flex;
    justify-content: center;
  }
  .textRed {
    color: #ff4840;
  }
`;

const StWebBg = styled.div`
  width: 100vw;
  height: 400px;
  background-image: url('/mainFirstBg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;
const LoginNotice = styled.p`
  font-size: 30px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .Go {
    font-size: 24px;
    font-weight: 500;
    color: #ff4840;
  }
`;

const Region = styled.div`
  background-color: aliceblue;
  width: 100%;

  .depart {
    display: flex;
    flex-direction: column;
    font-size: 22px;
    align-items: baseline;
    margin-left: 100px;
    margin-top: 40px;
  }
  .departChild {
    color: #ff4840;
  }
`;
