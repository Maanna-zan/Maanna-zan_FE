import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment/moment';
import 'react-calendar/dist/Calendar.css';
import styles from './react-calender.module.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { cookies } from '@shared/cookie';
import { apis } from '@shared/axios';
import EventForm from './EventForm';
import { InputArea } from '@components/Atoms/Input';
import LogMyDayDetailModal from '@components/Modals/LogMyDayDetailModal';
import { createPortal } from 'react-dom';

//페이지네이션 임포트
import Pagination from '@components/Modals/Pagenation2';
import chunk from '@components/Modals/chunk';
import { ButtonText } from '@components/Atoms/Button';

const LogMyDay = ({
  setDifferMeet,
  selectedDateLog,
  selectedDate,
  onSubmit,
  data,
}) => {
  const queryClient = useQueryClient();

  const [value, onChange] = useState(new Date());
  //페이지 네이션 처음 시작이 1번창부터 켜지도록
  const [activePage, setActivePage] = useState(1);
  //캘린더 로그 수정모드
  const [isEditMode, setIsEditMode] = useState({});
  //캘린더 로그 상세조회
  const [showModal, setShowModal] = useState(false);
  // console.log('showModal', showModal);
  const [callenderId, setCallenderId] = useState(null);
  const [callederTitle, setCallenderTitle] = useState('');
  const [callederContent, setCallenderContent] = useState('');
  const [callederSetDated, setCallenderSetDated] = useState('');

  const handleEdit = (calLog) => {
    setIsEditMode((prev) => ({ ...prev, [calLog.id]: true }));
    setCallenderId(calLog.id);
    setCallenderTitle(calLog.title);
    setCallenderSetDated(calLog.selectedDate);
    setCallenderContent(calLog.content);
  };

  const handleUpdate = () => {
    const payload = {
      title: callederTitle,
      content: callederContent,
      selectedDate: callederSetDated,
    };
    const calLog = data.find((calLog) => calLog.id === callenderId);
    if (calLog) {
      calLogUpdate({ id: calLog.id, payload });
    }
    setIsEditMode((prev) => ({ ...prev, [calLog.id]: false }));
  };

  const handleDelete = (id) => {
    calLogDelete(id);
  };

  // const mark = ['2023-04-20', '2023-04-28'];

  const clickDayHandler = (value, event) => {
    // console.log('value', value);
    // alert(`Clicked day:  ${value}`);
  };

  const token = cookies.get('access_token');

  // 츄가
  const { mutate } = useMutation({
    mutationFn: async (event) => {
      // console.log('event', event);
      const data = await apis.post('my-page/calendar', event, {
        headers: {
          Access_Token: `${token}`,
        },
      });
      // console.log('data', data);
      return data;
    },
    onError: (error) => {
      // console.log('error', error.response.data.message);
      alert(error.response.data.message);
    },
    onSuccess: (data) => {
      alert(data.data.message);
    },
  });

  //추가 payload
  const handleEventSubmit = (event) => {
    mutate(event);
  };

  //페이지네이션을 위한 구역 data 는 쿼리에서 먼저 undefined되기에 ? 로 있을 때
  //map을 돌릴 데이터를 4개씩 끊어서 라는 뜯 입니다 (9개ㅈ씩 끊고 싶으면 9 적으면 됩니다. )
  const chunkedData = data ? chunk(data, 4) : [];
  const currentPageData = chunkedData[activePage - 1] ?? [];

  const reversedCurrentPageData = currentPageData.slice().reverse();

  if (!data || data?.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', zIndex: '300' }}>
        <div
          style={{
            display: 'flex',
            gap: '40px',
            flexDirection: 'row',
            width: '100%',
            zIndex: '310',
          }}
        >
          <Div>

            <EventForm
              selectedDateLog={selectedDateLog}
              selectedDate={selectedDate}
              onSubmit={handleEventSubmit}
            />
          </Div>
          <ReviewDiv>
            <h1 className="title">기록</h1>
            <div className="changeTab">
              <ButtonText
                onClick={() => {
                  setDifferMeet(false);
                }}
                label="약속일정"
                size="xxsm"
                variant="backGray"
              />
              <ButtonText label="메모장" size="xxsm" variant="primary" />
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
                alt="작성한 메모가 없어요!"
              />
              <p>작성한 메모가 없어요!</p>
            </div>
          </ReviewDiv>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ display: 'flex', gap: '40px' }}>
        <Div>
          <EventForm
            selectedDateLog={selectedDateLog}
            selectedDate={selectedDate}
            onSubmit={handleEventSubmit}
          />
        </Div>
        <ReviewDiv>
          <h1 className="title">기록</h1>
          <div className="changeTab">
            <ButtonText
              onClick={() => {
                setDifferMeet(false);
              }}
              label="약속일정"
              size="xxsm"
              variant="backGray"
            />
            <ButtonText label="메모장" size="xxsm" variant="primary" />
          </div>
          <LogBox>
            {reversedCurrentPageData.map((calLog) => (
              <CalLogDiv key={calLog.id}>
                <img
                  src="Group 2248.png"
                  alt="글쓰기 수정 버튼"
                  className="editImg"
                  onClick={() => setShowModal(calLog.id)} // calLog.id를 사용하여 해당 id를 setShowModal에 전달
                />
                <>
                  {showModal === calLog.id &&
                    createPortal(
                      <LogMyDayDetailModal
                        id={calLog.id}
                        data={calLog}
                        onClose={() => setShowModal(false)}
                      />,
                      document.body,
                    )}
                </>
                <div className="log">
                  <p className="title">{calLog.title}</p>
                  <p className="content">{calLog.content}</p>
                  <p>{calLog.selectedDate.substr(2).replace(/-/gi, '.')}</p>
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

export default LogMyDay;

const LogBox = styled.div`
  /* border: 1px solid black; */
  width: fit-content;
  height: 560px;
`;

const ReviewDiv = styled.div`
  width: 688px;
  display: flex;
  flex-direction: column;
  margin-top: -495px;
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
  margin-top: -8px;
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
  .editmode {
    display: flex;
    flex-direction: column;
    width: 570px;
    /* border: 1px solid #c8150d; */
  }
  .twoEdit {
    display: flex;
  }
  .twoButton {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .editInput {
    border: none;
    width: 180px;
  }
  .textarea {
    margin-top: 5px;
    border: none;
    height: 100%;
    width: 570px;
    resize: none; /* 크기 조절 못하게 함 */
  }
  .textarea::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
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
