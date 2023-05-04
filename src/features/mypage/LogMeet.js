import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonText } from '@components/Atoms/Button';
import { useQuery } from '@tanstack/react-query';
import { apis } from '@shared/axios';
import { cookies } from '@shared/cookie';
//페이지네이션 임포트
import Pagination from '@components/Modals/Pagenation2';
import chunk from '@components/Modals/chunk';
import { LightTheme } from '@components/Themes/theme';
import { ShareBtn } from '@components/Atoms/ShareBtn';
import { ShareButton, TrashButton } from '@components/Atoms/TrashButton';

const LogMeet = ({ setDifferMeet, setMarkMeet, response, selectedDate }) => {
  //페이지 네이션 처음 시작이 1번창부터 켜지도록
  const [activePage, setActivePage] = useState(1);
  //캘린더 로그 수정모드
  const [isEditMode, setIsEditMode] = useState({});

  //페이지네이션을 위한 구역 data 는 쿼리에서 먼저 undefined되기에 ? 로 있을 때
  //map을 돌릴 데이터를 4개씩 끊어서 라는 뜯 입니다 (9개ㅈ씩 끊고 싶으면 9 적으면 됩니다. )
  const chunkedData = response ? chunk(response, 2) : [];
  const currentPageData = chunkedData[activePage - 1] ?? [];
  if (!response || response?.length === 0) {
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
          <ReviewDiv>
            <h1 className="title">기록</h1>
            <div className="changeTab">
              <ButtonText
                onClick={() => {
                  setDifferMeet(false);
                }}
                label="약속일정"
                size="xxxsm"
                variant="backGray"
              />
              <ButtonText label="메모장" size="xxxsm" variant="primary" />
            </div>
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
      <div>
        {/* <div style={{ display: 'flex', gap: '40px' }}> */}
        <ReviewDiv>
          <h1 className="title">기록</h1>
          <div className="changeTab">
            <ButtonText
              onClick={() => {
                setDifferMeet(false);
              }}
              label="약속일정"
              size="xxxsm"
              variant="primary"
            />
            <ButtonText
              onClick={() => {
                setDifferMeet(true);
              }}
              label="메모장"
              size="xxxsm"
              variant="backGray"
            />
          </div>

          <LogBox>
            {currentPageData.map((data) => (
              <CalLogDiv key={data.id}>
                <div className="contents">
                  <div className="meetTitle">
                    <h1 className="place_name">{data.place_name}</h1>
                    <p className="category_name">{data.category_name}</p>
                  </div>

                  <p className="road_address_name">{data.road_address_name}</p>
                  <div className="telnumber">
                    <p className="phone">지번</p>
                    <p className="phone">{data.phone}</p>
                  </div>

                  <p className="selectedDate">
                    {data.selectedDate?.substr(2).replace(/-/gi, '.')}
                  </p>
                </div>
                <div className="map"></div>
                <div className="calButton">
                  <ShareButton />
                  <TrashButton />
                </div>
              </CalLogDiv>
            ))}
          </LogBox>

          <Pagination
            pages={chunkedData.map((_, i) => i + 1)}
            activePage={activePage}
            setPage={setActivePage}
          />
        </ReviewDiv>
      </div>
    );
  }
};

export default LogMeet;

const LogBox = styled.div`
  /* border: 1px solid black; */
  width: fit-content;
  height: 560px;
`;

const ReviewDiv = styled.div`
  width: 688px;
  display: flex;

  flex-direction: column;
  margin-left: 527px;
  margin-top: -328px;
  .changeTab {
    display: flex;
    gap: 10px;
  }
  .log {
    margin-top: -18px;
    block-size: fit-content;
  }
  .title {
    width: 570px;
    display: flex;
    font-size: 16px;
    font-weight: 600;
    word-wrap: break-word;
    overflow-y: hidden;
    height: 20px;
  }
  .title::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
  .content {
    width: 570px;
    font-weight: 400;
    font-size: 14px;
    word-wrap: break-word;
    overflow-y: scroll;
    height: 40px;
  }
  .content::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
`;

const Div = styled.div`
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
  .react-calendar__viewContainer {
    /* margin-top: -20px; */
  }
  .react-calendar__tile {
    padding: 8px 10px;
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
  .react-calendar__navigation :hover {
    border-radius: 50%;
    color: red;
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
    margin-left: 19px;
    position: absolute;
  }
`;

const CalLogDiv = styled.div`
  width: 672px;
  height: 262px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e8ebed;
  margin-top: 12px;
  display: flex;
  /* gap: 20px; */
  padding: 12px;
  .contents {
    width: 242px;
    margin-left: 10px;
  }
  .meetTitle {
    margin-top: -4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .place_name {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
  .category_name {
    height: fit-content;
    font-weight: 400;
    font-size: 11px;
    line-height: 14px;
    color: ${LightTheme.GRAY_200};
  }
  .road_address_name {
    margin: 0;
    height: fit-content;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
  }
  .telnumber {
    margin: 0;
    gap: 15px;
    height: fit-content;
    display: flex;
  }
  .phone {
    font-weight: 400;
    font-size: 11px;
    line-height: 14px;
    color: ${LightTheme.GRAY_200};
  }
  .selectedDate {
    display: flex;
    margin-top: 110px;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
  }
  .map {
    margin-top: 8px;
    margin-left: 20px;
    border: 1px solid #c8150d;
    width: 331px;
    height: 222px;
    border-radius: 8px;
  }
  .calButton {
    margin-top: 10px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .del {
    padding: 3px 12px;
    color: white;
    border-radius: 8px;
    border: 1px solid #ff4840;
    background-color: #ff4840;
    :hover {
      color: #c8150d;
    }
  }

  .done {
    padding: 3px 12px;
    color: white;
    border-radius: 8px;
    border: 1px solid #ff4840;
    background-color: #ff4840;
    :hover {
      color: #c8150d;
    }
  }
`;
