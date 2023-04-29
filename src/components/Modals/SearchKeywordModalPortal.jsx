import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { apis } from '@shared/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useRouter } from 'next/router';
import KeywordSearchModal from '@components/Modals/SearchKeywordModal';
import styled from 'styled-components';
import { WebWrapper, WebWrapperHeight } from '@components/Atoms/Wrapper';
import { FlexRow } from '@components/Atoms/Flex';
import { InputArea } from '@components/Atoms/Input';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';

function SearchedKeywordLandingPage() {
  //  Input Box 갯수 state. 값으로 1을 넣은 이유는 처음에 1개가 기본 있어야 한다.
  const [inputCount, setInputCount] = useState(1);
  //  Modal창 열고 닫는 state
  const [showModal, setShowModal] = useState(false);
  //   currentInputIndex 상태값을 설정
  const [currentInputIndex, setCurrentInputIndex] = useState(-1);
  //  입력값 상태값 설정
  const [inputValues, setInputValues] = useState(
    Array.from({ length: 4 }, () => ''),
  );
  //  자식 컴포넌트의 props 값 state
  const [checkedPlace, setCheckedPlace] = useState();
  //  모달창 검색값 있는 그대로 배열로 만들어주는 state 값(다중마커위한)
  const [checkedMarkerPlace, setCheckedMarkerPlace] = useState([]);
  //  중간 지점 state
  const [midPoint, setMidPoint] = useState(null);
  //  마커 찍어 줄 state
  const [positions, setPositions] = useState([]);
  //  지도 초기 위치 및 위도경도 state값
  const [center, setCenter] = useState({
    lat: 37.49676871972202,
    lng: 127.02474726969814,
  });
  //  자식 컴포넌트 props 꺼내서 쓸 수 있도록 한다.
  function checkedPlaceHandler(place) {
    // checkedPlace 객체를 request 폼으로 가공
    const { x, y } = place;
    //  x,y값 undefined일 시 조건문
    if (!x || !y) {
      console.error('Invalid place object:', place);
      return;
    }
    //  place 매개변수 받아 모달창 props의 좌표값 받아서 지도 옮겨줌.
    setCenter({ lat: y, lng: x });
    // 인풋박스 각각의 값에 각각의 props state값 주는 로직.
    const newInputValues = [...inputValues];
    newInputValues[currentInputIndex] = place.place_name;
    setInputValues(newInputValues);
    //  x,y값이 추가 되어도 같은 값이 x2,y2로 들어가는 버그 수정 코드
    let newCheckedPlace = {
      ...checkedPlace,
      [currentInputIndex === 0 ? 'x' : `x${currentInputIndex + 1}`]: x,
      [currentInputIndex === 0 ? 'y' : `y${currentInputIndex + 1}`]: y,
    };
    //  setCheckedPlace함수 서버 통신위하여 가공
    setCheckedPlace(newCheckedPlace);
    //	positions state에 검색된 state값 차곡차곡 담기위한 다중마커state값 (place는 모달창에서 검색 및 선택된 값)
    setCheckedMarkerPlace(place);
  }
  //  Input Box 추가 Button Handler
  const addingInputBoxButtonHandler = () => {
    if (inputCount < 4) {
      setInputCount(inputCount + 1);
    }
  };
  //  Modal창 여는 Handler
  const onInputClickHandler = (index) => {
    setCurrentInputIndex(index);
    setShowModal(true);
  };
  //  Modal창 닫는 Handler
  const onCloseModalHandler = () => {
    setShowModal(false);
  };
  //Input 박스 추가
  const renderInputArea = (index) => {
    return (
      <InputArea
        key={index}
        type="text"
        placeholder="이 버튼을 눌러 위치를 추가해주세요."
        value={inputValues[index]}
        variant="default"
        size="df"
        cursor="pointer"
        readOnly={true}
        onClick={() => onInputClickHandler(index)}
        style={{
          margin: '8px 0 5px 10px',
          border: 'none',
          backgroundColor: '#F7F8F9',
          fontSize: '12px',
        }}
      ></InputArea>
    );
  };
  //  Modal창 렌더링
  const renderModal = () => {
    if (currentInputIndex < 0) {
      return null;
    }
    //  닫기 버튼 props로 내려줌.
    return (
      showModal &&
      createPortal(
        <KeywordSearchModal
          onClose={onCloseModalHandler}
          onUpdate={checkedPlaceHandler}
        />,
        document.body,
      )
    );
  };
  //  Input Box 받아주는 배열
  const inputs = [];
  for (let i = 0; i < inputCount; i++) {
    inputs.push(renderInputArea(i));
  }
  //  검색 값 request폼으로 가공 후 서버통신
  const { mutate } = useMutation({
    queryKey: ['POST_MIDPOINT'],
    mutationFn: async () => {
      const data = await apis.post(
        //  서버 URL
        '/find',
        //  Request값(x,y~x4,y4)
        checkedPlace,
      );
      return data;
    },
    // onError 콜백 함수, 에러 처리
    onError: (error) => {
      console.error(error);
    },
    //  완료 되었을 때 콜백 함수
    onSuccess: (data) => {
      const response = data.data.message;
      alert(response);
      const lat = data.data.data.lat;
      const lng = data.data.data.lng;
      const newMidPoint = { lat, lng };
      setMidPoint(newMidPoint);
    },
  });
  //  중간위치 이동 후 해당 좌표로 지도 이동
  useEffect(() => {
    if (midPoint) {
      setCenter(midPoint);
    }
  }, [midPoint]);
  console.log('midPoint=>', midPoint);

  //  checkedPlace로 props값 받아오면 useEffect 실행하여 지도에 마커 찍히도록 gettingLocation 함수 실행.
  useEffect(() => {
    if (checkedPlace) {
      //  checkedPlace값은 서버통신위하여 x,y~x4,y4 값으로 가공된 값으로 checkedMarkerPlace와야함
      gettingLocation(checkedMarkerPlace);
    }
  }, [checkedPlace]);

  // 키워드 입력후 검색 클릭 시 원하는 키워드의 주소로 이동
  const gettingLocation = function () {
    // checkedMarkerPlace state값(모달창 검색되어 받아온 배열로 날 것 그대로 가공해주는 값)
    const newSearch = checkedMarkerPlace;
    setPositions((prevPositions) => [
      ...prevPositions,
      {
        title: newSearch.place_name,
        latlng: { lat: newSearch.y, lng: newSearch.x },
      },
    ]);
  };
  //  mapmidpoint page로 이동 위한 useRouter선언.
  const router = useRouter();
  //  mapmidpoint 페이지로 이동 위한 핸들러.
  const moveToMapMidPointButtonClickHandler = () => {
    router.push('/mapmidpoint');
  };
  //  midPoint값(중간지점좌표) useQueryClient로 저장 위해 선언
  const queryClient = useQueryClient();
  //  midPoint값 쿼리로 저장하기 위해 다른 이름으로 선언.
  const midPointProp = midPoint;
  //  MIDPOINTPROP키값으로 midPoint값 저장. 해당 키 값으로 값 불러올 수 있음.
  queryClient.setQueryData(['MIDPOINTPROP'], midPointProp);

  // 266 으로 가서 글을 확인해주세요 ~
  const [value, onChange] = useState(new Date());
  console.log('onChange', Calendar);
  const mark = ['2023-04-20', '2023-04-28'];

  const clickDayHandler = (value, event) => {
    console.log('value', value);
    alert(`Clicked day:  ${moment(value).format('MM - DD')}`);
  };
  //value -> 원래 형태 'YYYY년 MM월 DD일' , 'YYYY-MM-DD', 'MM-DD' 이런식으로 변경이 가능합니다

  return (
    <WebWrapper>
      <WebWrapperHeight>
        <FlexRow style={{ justifyContent: 'space-between' }}>
          <div>
            <Map
              center={center}
              style={{
                width: '690px',
                height: '803px',
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            >
              {positions.map((position, index) => (
                <MapMarker
                  key={index}
                  position={position.latlng} // 마커를 표시할 위치
                  image={{
                    src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소
                    size: {
                      width: 24,
                      height: 35,
                    }, // 마커이미지의 크기
                  }}
                  title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                />
              ))}
              {midPoint && (
                <MapMarker
                  position={midPoint}
                  image={{
                    src: 'MaannajanLogo.png',
                    size: { width: 30, height: 38 },
                  }}
                  title="중간지점"
                />
              )}
            </Map>
          </div>

          <ContentWrapper>
            <H1Styled>친구와 본인의 </H1Styled>
            <Highlighting>위치를 입력해주세요</Highlighting>
            <div>
              {inputs}
              {renderModal()}
              <ButtonGrayStyle onClick={addingInputBoxButtonHandler}>
                추가하기
              </ButtonGrayStyle>
              <ButtonRedStyle
                onClick={() => {
                  mutate(checkedPlace);
                }}
              >
                검색
              </ButtonRedStyle>
              <button onClick={moveToMapMidPointButtonClickHandler}>
                중간지점탐색
              </button>
            </div>
            <Div className="calendar-container">
              <Calendar
                //196 줄의 핸들러 함수 -> 날짜 얼럿이 뜹니다.
                onChange={clickDayHandler}
                //유즈스테이트로 달력에서 누른 날의 밸류 값이 밑에 글씨로 떠오릅니다.
                // onChange={onChange}
                value={value}
                //일에서 토요일로 요일을 정렬해줍니다.
                calendarType="US"
                //1일 2일 의 일자를 화면상에서 뺴줍니다.
                formatDay={(locale, date) => moment(date).format('DD')}
                className="mx-auto w-full text-sm border-b"
                //타일에 dot를 찍어주는 기능을 합니다.
                tileContent={({ date, view }) => {
                  // 날짜 타일에 컨텐츠 추가하기 (html 태그)
                  // 추가할 html 태그를 변수 초기화
                  let html = [];
                  // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
                  if (
                    mark.find((x) => x === moment(date).format('YYYY-MM-DD'))
                  ) {
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
                {moment(value).format('YYYY- MM- DD')}
              </div>
            </Div>
          </ContentWrapper>
        </FlexRow>
      </WebWrapperHeight>
    </WebWrapper>
  );
}

export default SearchedKeywordLandingPage;
const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 100px 250px 25px;
`;
const H1Styled = styled.div`
  font-size: 40px;
  font-weight: 500;
  line-height: 48px;
`;
const Highlighting = styled.div`
  font-size: 40px;
  font-weight: 700;
  line-height: 48px;
`;
const ButtonGrayStyle = styled.button`
  font-size: 14px;
  font-weight: 400;
  padding: 13px 30px 13px 30px;
  margin: 6px;
  color: black;
  background-color: #f4f5f6;
  border: none;
  border-radius: 10px;
`;
const ButtonRedStyle = styled.button`
  font-size: 14px;
  font-weight: 600;
  padding: 13px 40px 13px 40px;
  margin: 6px;
  color: #ffffff;
  background-color: #ff4740;
  border: none;
  border-radius: 10px;
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
    margin-left: 22px;
  }
`;
