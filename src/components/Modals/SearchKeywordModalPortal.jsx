import { InputArea } from '@components/Atoms/Input';
import KeywordSearchModal from '@components/Modals/SearchKeywordModal';
import React, { createContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { apis } from '@shared/axios';
import { useMutation } from '@tanstack/react-query';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { FlexRow } from '@components/Atoms/Flex';
import { WebWrapper, WebWrapperHeight } from '@components/Atoms/Wrapper';
import styled from 'styled-components';
import MapMidPoint from '@features/map/MapMidPoint';
import { useRouter } from 'next/router';

// createContext 함수를 사용하여 컨텍스트 생성(midPoint props MapMidPoint.js로 전달 위해)
export const MidPointContext = createContext({});
//  Modal Portal(Landing) Page
function SearchedKeywordLandingPage() {
    //  Input Box 갯수 state. 값으로 1을 넣은 이유는 처음에 1개가 기본 있어야 한다.
    const [inputCount, setInputCount] = useState(1);
    //  Modal창 열고 닫는 state
    const [showModal, setShowModal] = useState(false);
    //   currentInputIndex 상태값을 설정
    const [currentInputIndex, setCurrentInputIndex] = useState(-1);
    //  입력값 상태값 설정
    const [inputValues, setInputValues] = useState(Array.from({ length: 4 }, () => ''));
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
    //  중간 위치 탐색 page 이동 위한 useRouter선언.
    const router = useRouter();
    //  자식 컴포넌트 props 꺼내서 쓸 수 있도록 한다.
    function checkedPlaceHandler(place) {
        // checkedPlace 객체를 request 폼으로 가공
        const { x, y } = place;
        console.log("place",place)
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
        let newCheckedPlace = { ...checkedPlace, [currentInputIndex === 0 ? 'x' : `x${currentInputIndex + 1}`]: x, [currentInputIndex === 0 ? 'y' : `y${currentInputIndex + 1}`]: y };
        //  setCheckedPlace함수 서버 통신위하여 가공
        setCheckedPlace(newCheckedPlace);
        //	positions state에 검색된 state값 차곡차곡 담기위한 다중마커state값 (place는 모달창에서 검색 및 선택된 값)
        setCheckedMarkerPlace(place)
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
    }
    //  Modal창 닫는 Handler
    const onCloseModalHandler = () => {
        setShowModal(false);
    }
     //Input 박스 추가
    const renderInputArea = (index) => {
        return (
            <InputArea 
                key={index} 
                type="text" 
                placeholder='이 버튼을 눌러 위치를 추가해주세요.'
                value={inputValues[index]}
                variant='default'
                size='df'
                cursor='pointer'
                readOnly={true}
                onClick={() => onInputClickHandler(index)}
                style={{margin:"8px 0 5px 10px",
                        border: 'none',
                        backgroundColor: '#F7F8F9',
                        fontSize: '12px'
                        }}
            ></InputArea>
        );
    }
    //  Modal창 렌더링
    const renderModal = () => {
        if (currentInputIndex < 0) {
            return null;
        }
        //  닫기 버튼 props로 내려줌.
        return (
            showModal && createPortal(
                <KeywordSearchModal 
                    onClose={onCloseModalHandler} 
                    onUpdate={checkedPlaceHandler}
                />,
                document.body
            )
        );
    };
    //  Input Box 받아주는 배열
    const inputs = [];
    for (let i = 0; i < inputCount; i++) {
        inputs.push(renderInputArea(i));
    }

    //  검색 값 request폼으로 가공 후 서버통신
    const { mutate, isLoading } = useMutation({
        mutationFn: async (location) => {
            console.log('location->', location[0]);
            const data = await apis.post
            (
                //  서버 URL
                '/find',
                //  Request값(x,y~x4,y4)
                checkedPlace
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
            const newMidPoint = {lat, lng};
            setMidPoint(newMidPoint);
            console.log("newMidPoint=>",newMidPoint)
        },
    });
    //  중간위치 이동 후 해당 좌표로 지도 이동
    useEffect(() => {
        if(midPoint) {
        setCenter(midPoint)}
    },[midPoint])
    console.log("midPoint=>",midPoint)
    
    //  checkedPlace로 props값 받아오면 useEffect 실행하여 지도에 마커 찍히도록 gettingLocation 함수 실행.
    useEffect(() => {
        if(checkedPlace) {
        //  checkedPlace값은 서버통신위하여 x,y~x4,y4 값으로 가공된 값으로 checkedMarkerPlace와야함
            gettingLocation(checkedMarkerPlace)}
    },[checkedPlace])

    // 키워드 입력후 검색 클릭 시 원하는 키워드의 주소로 이동
    const gettingLocation = function () { 
        // checkedMarkerPlace state값(모달창 검색되어 받아온 배열로 날 것 그대로 가공해주는 값)
        const newSearch = checkedMarkerPlace;
        setPositions(prevPositions =>[
            ...prevPositions,
            {
            title: newSearch.place_name,
            latlng: { lat: newSearch.y, lng: newSearch.x },
            },
        ]);
    }
    return (
        <WebWrapper>
        <WebWrapperHeight>
            <FlexRow style={{ justifyContent: 'space-between' }}>
                <div>
                    <Map 
                        center={center} 
                        style={{ width: '690px', height: '803px', maxWidth:'100%', maxHeight:'100%' }}
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
                                        src:
                                        'MaannajanLogo.png',
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
                                <ButtonGrayStyle 
                                    onClick={addingInputBoxButtonHandler}
                                >
                                추가하기
                                </ButtonGrayStyle>
                                <ButtonRedStyle
                                    onClick={() => {mutate(checkedPlace);}}
                                >
                                검색
                                </ButtonRedStyle>
                                {/* <button onClick={moveToMapMidPointButtonClickHandler}>
                                    중간지점탐색
                                </button> */}
                                {/* <MapMidPoint
                                // onMidPoint={setMidPoint || null}
                                onClick={moveToMapMidPointButtonClickHandler}
                                onMidPoint={moveToMapMidPointButtonClickHandler}
                                /> */}
                                <MidPointContext.Provider value={midPoint}>
                                <MapMidPoint />
                                </MidPointContext.Provider>

                                

                        </div>
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
`
const H1Styled = styled.div`
    font-size: 40px;
    font-weight: 500;
    line-height: 48px;
`
const Highlighting = styled.div`
    font-size: 40px;
    font-weight : 700;
    line-height: 48px;
`
const ButtonGrayStyle = styled.button`
    font-size: 14px;
    font-weight: 400;
    padding:13px 30px 13px 30px;
    margin: 6px;
    color : black;
    background-color : #F4F5F6;
    border : none;
    border-radius : 10px;
`
const ButtonRedStyle = styled.button`
    font-size: 14px;
    font-weight: 600;
    padding:13px 40px 13px 40px;
    margin: 6px;
    color : #FFFFFF;
    background-color : #FF4740;
    border : none;
    border-radius : 10px;
`