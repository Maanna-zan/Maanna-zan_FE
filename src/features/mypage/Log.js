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

//페이지네이션 임포트
import Pagination from '@components/Modals/Pagenation2';
import chunk from '@components/Modals/chunk';

function Log() {
  const queryClient = useQueryClient();

  const [value, onChange] = useState(new Date());
  //페이지 네이션 처음 시작이 1번창부터 켜지도록
  const [activePage, setActivePage] = useState(1);
  //캘린더 로그 수정모드
  const [isEditMode, setIsEditMode] = useState({});

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

  const [mark, setMark] = useState([]);

  const token = cookies.get('access_token');

  const { data } = useQuery({
    queryKey: ['LOG_DATE'],
    queryFn: async () => {
      const data = await apis.get('/my-page/calendarList', {
        headers: {
          Access_Token: `${token}`,
        },
      });
      // console.log('result~~~', data.data);
      return data.data.data;
    },
    onSuccess: (data) => {
      if (!data || data.length === 0) {
        return <div>No data available.</div>;
      }
      // console.log('successdata', data);
      // setMark([data.data[0].selectedDate]);
      // // // ["2022-02-02", "2022-02-02", "2022-02-10"] 형태로 가져옴
      const mark = data.map((item) => item.selectedDate);
      setMark(mark);
    },
  });
  // console.log('res', data);

  // 츄가
  const { mutate } = useMutation({
    mutationFn: async (event) => {
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

  //캘린더 로그 수정
  //수정
  const { mutate: calLogUpdate } = useMutation({
    mutationFn: async ({ id, payload }) => {
      // console.log('patloadEdit', payload);
      const { data } = await apis.patch(`/my-page/calendar/${id}`, payload, {
        headers: {
          Access_Token: `${token}`,
        },
      });
      // console.log('editdata', data);
      return data;
    },
    onSuccess: () => {
      setIsEditMode(false);

      queryClient.invalidateQueries(['LOG_DATE']);
      window.alert('수정 완료!');
    },
    onError: () => {
      window.alert('수정 오류!');
    },
  });
  //삭제
  const { mutate: calLogDelete } = useMutation({
    mutationFn: async (id) => {
      await apis.delete(`/my-page/calendar/${id}`, {
        headers: {
          Access_Token: `${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['LOG_DATE']);
      alert.confirm('일정을 삭제하시겠습니까?');
    },
  });

  if (!data || data?.length === 0) {
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
            <EventForm
              selectedDateLog={moment(value).format('MM월DD일')}
              selectedDate={moment(value).format('YYYY-MM-DD')}
              onSubmit={handleEventSubmit}
            />
          </Div>
          <ReviewDiv>
            <h1 className="title">기록</h1>
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
            <EventForm
              selectedDateLog={moment(value).format('MM월DD일')}
              selectedDate={moment(value).format('YYYY-MM-DD')}
              onSubmit={handleEventSubmit}
            />
          </Div>
          <ReviewDiv>
            <h1 className="title">기록</h1>
            <div>
              {currentPageData.map((calLog) => (
                <CalLogDiv key={calLog.id}>
                  {isEditMode[calLog.id] ? (
                    <>
                      <div className="editmode">
                        <div className="twoEdit">
                          <InputArea
                            className="editInput"
                            variant="default"
                            size="md"
                            type="text"
                            name="title"
                            value={callederTitle}
                            onChange={(e) => setCallenderTitle(e.target.value)}
                          />
                          <InputArea
                            className="editInput"
                            variant="default"
                            size="md"
                            type="date"
                            name="content"
                            value={callederSetDated}
                            onChange={(e) =>
                              setCallenderSetDated(e.target.value)
                            }
                          />
                        </div>
                        <textarea
                          className="textarea"
                          name="content"
                          value={callederContent}
                          onChange={(e) => setCallenderContent(e.target.value)}
                        />
                      </div>
                      <div className="twoButton">
                        <button className="done" onClick={handleUpdate}>
                          수정
                        </button>
                        <button
                          className="del"
                          onClick={() => handleDelete(calLog.id)}
                        >
                          삭제
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        src="Group 2248.png"
                        alt="글쓰기 수정 버튼"
                        className="editImg"
                        onClick={() => handleEdit(calLog)}
                        // onClick={() => {
                        //   setIsEditMode((prev) => ({
                        //     ...prev,
                        //     [calLog.id]: !prev[calLog.id],
                        //   }));
                        // }}
                      />
                      <div>
                        <p>{calLog.title}</p>
                        <p>{calLog.content}</p>
                        <p>
                          {calLog.selectedDate.substr(2).replace(/-/gi, '.')}
                        </p>
                      </div>
                    </>
                  )}
                </CalLogDiv>
              ))}
            </div>
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
  .title {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
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
