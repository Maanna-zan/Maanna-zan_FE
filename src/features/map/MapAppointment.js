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
import { WebWrapper, WebWrapperHeight } from '@components/Atoms/Wrapper';
import { ButtonText } from '@components/Atoms/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LightTheme } from '@components/Themes/theme';
import ApporintmentModal from '@components/Modals/AppointmentModal';
import { createPortal } from 'react-dom';
import { FlexRow } from '@components/Atoms/Flex';
import { apis } from '@shared/axios';

const MapAppointment = ({checkedPlace}) => {
  const router = useRouter();
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  //버튼으로 보내줄 값들
  const [appointment, setAppointment] = React.useState('');
  const { address_name, category_group_code, category_group_name, category_name, distance, id, phone, place_name, place_url, road_address_name, x, y } = checkedPlace;
  const mapRequestDto = {
    address_name,
    category_group_code,
    category_group_name,
    category_name,
    distance,
    apiId: id,
    phone,
    place_name,
    place_url,
    road_address_name,
    x,
    y,
    selectedDate: appointment,
  };

  //
  const token = cookies.get('access_token');
  const { mutate } = useMutation({
    mutationFn: async (payload) => {
      const data = await apis.post('/my-page/schedule', payload, {
        headers: {
          Access_Token: `${token}`,
        },
      }
      );
      return data;
    },
    onSuccess: (data) => {
    if (data.data.statusCode == 200) {
      setShowModal(true);
    }
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  useEffect(() => {
    const token = cookies.get('access_token');
    setIsLoginMode(token);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 달력 관련 로직
  const [value, onChange] = useState(new Date());
  const mark = ['2023-04-20', '2023-04-28'];
  const clickDayHandler = (value, event) => {
    alert(`Clicked day:  ${moment(value).format('YYYY-MM-DD')}`);
  };
  //value -> 원래 형태 'YYYY년 MM월 DD일' , 'YYYY-MM-DD', 'MM-DD' 이런식으로 변경이 가능합니다
  const selectAppointmentHandler = () => {
    setAppointment(moment(value).format('YYYY-MM-DD'));
    mutate(mapRequestDto);
  };
  const nickName =
    typeof window !== 'undefined'
      ? localStorage.getItem('nick_name') ?? ''
      : '';

  return (
    <WebWrapper style={{marginTop: '150px'}}>
      <WebWrapperHeight>
        <FlexRow style={{maxWidth: '100wh'}}>
          {!isLoginMode ? (
            <div>
              <StWebBg onClick={() => {scrollToTop()}}></StWebBg>
              <div style={{filter: 'blur(6px)', opacity: '0.1'}}>
                <WebWrapper style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                  <Div className="calendar-container">
                    <Calendar
                      onChange={onChange}
                      value={value}
                      calendarType="US"
                      formatDay={(locale, date) => moment(date).format('DD')}
                      className="mx-auto w-full text-sm border-b"
                    />
                    <div>
                      <AppointmentPlaceWrapper>
                        <div className="AppointmentPlace">중간 위치에 있는 술집을 선택해 주세요.</div>
                        {checkedPlace ? (
                          <span className="PlaceChecked">" {checkedPlace?.place_name} "</span>
                        ) : (
                          <span className="PlaceUnchecked" style={{color: `${LightTheme.FONT_SECONDARY}`}}>목록에서 선택해 주세요.</span>
                        )}
                      </AppointmentPlaceWrapper>
                      <p className="ShowDateText">
                        <span className="textRed">{nickName}</span>님이 선택하신 약속
                        날짜는
                        <span className="textRed">
                          {moment(value).format('YYYY년 MM월 DD일')}
                        </span>
                        입니다.
                      </p>
                      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <ButtonText
                          size="lg"
                          variant="primary"
                          label="약속잡기"
                          onClick={() => {
                            selectAppointmentHandler();
                          }}
                          style={{marginTop: '5vh'}}
                        />
                      </div>
                    </div>
                  </Div>
                  <div style={{position: 'relative'}}>
                    {showModal &&
                      createPortal(
                        <ApporintmentModal onClose={() => setShowModal(false)} />,
                        document.body,
                      )}
                  </div>
                </WebWrapper>
              </div>
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
                  <div>
                    <AppointmentPlaceWrapper>
                      <div className="AppointmentPlace">중간 위치에 있는 술집을 선택해 주세요.</div>
                          {checkedPlace ? (
                            <span className="PlaceChecked">" {checkedPlace?.place_name} "</span>
                          ) : (
                            <span className="PlaceUnchecked" style={{ color: `${LightTheme.FONT_SECONDARY}` }}>목록에서 선택해 주세요.</span>
                          )}
                    </AppointmentPlaceWrapper>
                      <p className="ShowDateText">
                        <span className="textRed">{nickName}</span>님이 선택하신 약속
                        날짜는
                        <span className="textRed">
                          {moment(value).format('YYYY년 MM월 DD일')}
                        </span>
                        입니다.
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <ButtonText size="lg" variant="primary" label="약속잡기"
                        onClick={() => {selectAppointmentHandler()}}
                        style={{  marginTop: '5vh' }}/>
                      </div>
                  </div>
                </Div>
                <div>
                  {showModal &&
                    createPortal(
                      <ApporintmentModal onClose={() => setShowModal(false)} />,
                      document.body,
                    )}
                </div>
              </WebWrapper>
            </div>
          )}
        </FlexRow>
      </WebWrapperHeight>
    </WebWrapper>
  );
};

export default MapAppointment;

const Ddiv = styled.div`
  .category-slider {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }

  .category-slide {
    flex: 0 0 33%;
    margin-right: 10px;
    scroll-snap-align: center;
  }

  .category-slide:last-child {
    margin-right: 0;
  }

  .category-slide img {
    width: 100%;
    height: auto;
  }

  .category-slide p {
    margin-top: 10px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }
`;

const Div = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  gap: 70px;
  align-items: center;
  .react-calendar {
    width: 470px;
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
    color: ${LightTheme.PRIMARY_NORMAL};
  }
  .ShowDateText {
    color: ${LightTheme.FONT_PRIMARY};
    font: var(--title1-semibold) Pretendard sans-serif;
  }
`;

const StWebBg = styled.div`
  width: 1003px;
  height: 318px;
  left: 360px;
  top: 1146px;
  background-image: url('/UnlogedInImg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-size: contain;
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
const DeparturesWrapper = styled.div`
display: flex;
flex-direction: column;
width: 40%;
`
const AppointmentPlaceWrapper = styled.div`
  .AppointmentPlace {
  color: ${LightTheme.FONT_PRIMARY};
  font: var(--head3-bold) Pretendard sans-serif;
  }

  .PlaceChecked {
    color: ${LightTheme.FONT_PRIMARY};
    font: var(--head3-medium) Pretendard sans-serif;
  }
  .PlaceUnchecked {
    color: ${LightTheme.FONT_SECONDARY};
    font: var(--head3-medium) Pretendard sans-serif;
  }
`;