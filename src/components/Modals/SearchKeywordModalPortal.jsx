import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { apis } from '@shared/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useRouter } from 'next/router';
import KeywordSearchModal from '@components/Modals/SearchKeywordModal';
import styled from 'styled-components';
import { WebWrapper, WebWrapperHeight } from '@components/Atoms/Wrapper';
import { FlexColumnCenter, FlexRow } from '@components/Atoms/Flex';
import { InputArea } from '@components/Atoms/Input';
import { ButtonText } from '@components/Atoms/Button';
import { ArrangeCenterWrapper } from '@components/Atoms/Wrapper';
import { LightTheme } from '@components/Themes/theme';

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
      return;
    }
    //  place 매개변수 받아 모달창 props의 좌표값 받아서 지도 옮겨줌.
    setCenter({ lat: y, lng: x });
    // 인풋박스 각각의 값에 각각의 props state값 주는 로직.
    const newInputValues = [...inputValues];
    // 인풋 박스 안에 넣을 값중 키워드이름 + (주소). 그중 도로명 주소가 없다면 지번 주소로 입력되도록 placeAddress선언
    const placeAddress = place.road_address_name || place.address_name;
    //  인풋 박스에 키워드이름(주소이름) 적히도록 수정.
    newInputValues[currentInputIndex] = `${place.place_name} (${placeAddress})`;
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
    // positions 업데이트 (정확히 원하는 마커 지워 지도록 positions값 currentInputIndex 같이 엮어서 업데이트 해줌. 매우 중요)
    const newPositions = [...positions];
    newPositions[currentInputIndex] = {
      title: place.place_name,
      latlng: { lat: place.y, lng: place.x },
    };
    setPositions(newPositions);

    //  newInputValues값 쿼리로 저장 위해 선언
    const InputValuesProp = newInputValues;
    //  INPUTVALUESPROP키값으로 newInputValues값 저장. 해당 키 값으로 값 불러올 수 있음.
    queryClient.setQueryData(['INPUTVALUESPROP'], InputValuesProp);
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

  useEffect (() => {
    inputValues
  },[inputValues])
  //  X버튼 핸들러(inputValue 초기화)
  const onInputClearHandler = (index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = '';
    setInputValues(newInputValues);

    // positions 업데이트 (정확한 해당 마커 지워지도록 positions 업데이트 코드 추가)
  const newPositions = [...positions];
  newPositions[index] = undefined;
  setPositions(newPositions);

    let newCheckedPlace = {
      ...checkedPlace,
      [index === 0 ? 'x' : `x${index + 1}`]: undefined,
      [index === 0 ? 'y' : `y${index + 1}`]: undefined,
    };
    setCheckedPlace(newCheckedPlace);
  };
  //Input 박스 추가
  const renderInputArea = (index) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center'}}>
        <InputArea
          key={index}
          type="text"
          placeholder="이  버튼을  눌러  본인  혹은  친구의 위치를  추가해주세요."
          value={inputValues[index]}
          variant="default"
          size="leftIcon"

          readOnly={true}
          onClick={() => onInputClickHandler(index)}
          style={{
            width: 'calc(100%)', //X 버튼 너비를 제외한 인풋박스의 너비를 설정위해 calc활용(필요시 연산자를 사용하여 값 계산하기)
            margin: '8px 0 5px 10px',
            border: 'none',
            backgroundColor: `${LightTheme.GRAY_50}`,
            fontFamily: `${'var(--label1-regular)'} Pretendard sans-serif`,
            fontSize: '14px',
            lineHeight: '18px',
            cursor: 'pointer',
            //Icon style
            // inputValues에 값 들어가면 돋보기 아이콘 사라지게하기. 반대로 X 버튼 나타나기.
            //  (...spread연산자 쓴 이유는 inputValues 배열의 모든 요소를 새로운 배열에 펼쳐서 복사하기위해)
            ...(inputValues[index]
              ? {
                  paddingLeft: '12px',
                  border: '1px solid black',
                }
              : {
                  backgroundImage: `url(ModalPortalSearchBarIcon.png)`, //Icon 불러오기
                  backgroundRepeat: 'no-repeat', //이미지 한번만
                  backgroundPosition: '12px center', // 위치
                  backgroundSize: '18px', // 이미지 크기
                  paddingLeft: '36px', //  placeholder와의 거리
                }),
            boxSizing: 'border-box', //   input의 넓이가 부모 넓이보다 넘는 현상방지
          }}
        ></InputArea>
        {inputValues[index] && (
          <div
            onClick={() => onInputClearHandler(index)}
            style={{
              position: 'absolute',
              marginLeft: '435px',
              paddingTop: '6px',
              pointerEvents: 'auto',
            }}
          >
            <img src="ModalPortalInputXButton.png" alt="X button" />
          </div>
        )}
      </div>
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
      const response = data.data.data.message;
      const stationName = data.data.data.stationName;
      //  중간지점으로 지하철역 검색되면 첫번째 alert창. 
      if (stationName) {
        alert(`중간지점과 가까운 지하철역 '${stationName}역'이 검색되었습니다.`);
      } else {
        alert("중간지점을 찾기 성공하였습니다.");
      }
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
  // midPoint값이 있고 inputValues값이 변경 되면 중간위치값 사라지도록 설정.
  useEffect(() => {
    if (midPoint && inputValues.some((value) => !value)) {
      setMidPoint(null);
    }
  }, [inputValues]);
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

  return (
    <WebWrapper>
      <WebWrapperHeight>
        <FlexRow style={{ justifyContent: 'space-between', paddingTop: '30px' }}>
          <div>
            <Map center={center} style={{ width: '690px', height: '90vh',maxWidth: '690px',maxHeight: '803px' }}>
              {positions?.map((position, index) => (
                inputValues[index] && (
                  <MapMarker key={index} position={position?.latlng}
                    image={{ src: 'MarkerIMG.png', size: { width: 38, height: 50 }}}
                    title={position?.title}/>
                )
              ))}
              {midPoint && (
                <MapMarker position={midPoint} 
                image={{ src: 'MaannajanLogo.png', size: { width: 30, height: 38 }}} title="중간지점"/>
              )}
            </Map>
          </div>

          <FlexColumnCenter style={{ margin: '0 200px 250px 25px' ,maxWidth: '470px',maxHeight: '803px'}}>
            <TitleStyled>친구와 본인의 </TitleStyled>
            <Highlighting>위치를 입력해 주세요.</Highlighting>
            <div style={{ width: '100%', maxWidth: '418px' }}>
              {inputs}
              {renderModal()}
              <ArrangeCenterWrapper>
                <AddInputButtonStyle
                  inputCount={inputCount}
                  onClick={addingInputBoxButtonHandler}
                  // disabled={midPoint}
                  // {...(midPoint ? { style: { cursor: 'default' } } : null)}
                  /* styled-components로 해당 버튼 꾸며주기에 아래와 같은 조건을 걸기 위해서는 props를 내려준다. */
                >
                  {inputCount < 4
                    ? '친구 위치 추가하기'
                    : '최대 4명까지 추가할 수 있습니다.'}
                </AddInputButtonStyle>
              </ArrangeCenterWrapper>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {!midPoint && inputValues.filter(Boolean).length < 2 && (
                <ButtonText size="lg" variant="basic" label="중간 위치 찾기" 
                  fontColor={LightTheme.GRAY_400}
                  borderWidth="0px"
                  backgroundColor={LightTheme.GRAY_100}
                  hoverBackgroundColor="null"
                  hoverBorderColor="null"
                  hoverFontColor="null"
                  style={{ cursor: 'default', font: `${'var(--label2-regular)'} Pretendard sans-serif` }}
                  disabled={true}
                />
              )}
              {!midPoint &&
                inputValues.filter(Boolean).length >= 2 && ( //filter(Boolean)은 inputValues 배열에서 falsy 값
                  <ButtonText //(즉, undefined, null, false, "", 0, NaN)를 필터링한다.
                    size="lg" variant="primaryBolder" label="중간 위치 찾기"
                    fontColor={`${LightTheme.PRIMARY_NORMAL}`}
                    hoverBackgroundColor={`${LightTheme.HOVER_BASIC}`}
                    hoverFontColor={`${LightTheme.PRIMARY_NORMAL}`}
                    active={`${LightTheme.ACTIVE_BASIC}`}
                    style={{font: `${'var(--label2-regular)'} Pretendard sans-serif`}}
                    onClick={() => {
                      //그러므로 inputValues 배열에서 값이 있는 요소만을 가지고 있는 새로운 배열을 반환한다.
                      mutate(checkedPlace);
                    }}
                  />
                )}
              {midPoint && (
                <ButtonText size="lg" variant="primary" label="중간 술집 검색"
                  hoverBackgroundColor={LightTheme.PRIMARY_LIGHT}
                  style={{font: `${'var(--label2-regular)'} Pretendard sans-serif`}}
                  onClick={moveToMapMidPointButtonClickHandler}
                />
              )}
            </div>
            <AdditionalInfoStyle>최대 4명까지 검색이 가능합니다.</AdditionalInfoStyle>
          </FlexColumnCenter>
        </FlexRow>
      </WebWrapperHeight>
    </WebWrapper>
  );
}

export default SearchedKeywordLandingPage;
const TitleStyled = styled.div`
  font: var(--display2-medium) Pretendard sans-serif;
`;
const Highlighting = styled.div`
  //width값있어야 전체 width늘어남..
  width: 418px;
  font: var(--display2-bold) Pretendard sans-serif;
`;
const AddInputButtonStyle = styled.button`
  font-size: 14px;
  font-weight: 400;
  padding: 13px 30px 13px 30px;
  margin: 6px;
  color: ${LightTheme.FONT_SECONDARY};
  background-color: transparent;
  border: none;
  border-radius: 10px;
  // inputCount를 props로 내려 inputCount가 4개가 되면 pointer 속성을 없앤다.
  cursor: ${(props) => (props.inputCount < 4 ? 'pointer' : 'default')};
  //Icon style
  // inputCount를 props로 내려 inputCount가 4개가 되면 plus img를 없앤다.
  background-image: ${(props) =>
    props.inputCount < 4 ? 'url(ModalPortalAddInputPlus.png)' : 'none'};
  background-repeat: no-repeat; //이미지 한번만
  background-position: 140px center; //  위치
  background-size: 22px; // 이미지 크기
  box-sizing: border-box; //   input의 넓이가 부모 넓이보다 넘는 현상방지 */
`;
  const AdditionalInfoStyle = styled.div`
    margin: 8px 0 0 0;
    color: ${LightTheme.FONT_SECONDARY};
    font: var(--caption1-regular) Pretendard sans-serif;
    text-align: right;
  `