import { ButtonText } from '@components/Atoms/Button';
import { InputArea } from '@components/Atoms/Input';
import KeywordSearchModal from '@components/Modals/SearchKeywordModal';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { apis } from '@shared/axios';
import { cookies } from '@shared/cookie';
import { useMutation } from '@tanstack/react-query';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { FlexRow } from '@components/Atoms/Flex';
import { WebWrapper, WebWrapperHeight } from '@components/Atoms/Wrapper';

function AddingInputBoxButton() {
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
        // const lat = place.y;
        // const lng = place.x;
        // positions[currentInputIndex] = { lng, lat}

        //  인풋박스 index이용하여 각자의 값에 x,y빼내어 case별로 구분.
        // let newCheckedPlace = { x, y };
        // switch (currentInputIndex) {
        //     case 1:
        //         newCheckedPlace = { ...newCheckedPlace, x2: x, y2: y };
        //         break;
        //     case 2:
        //         newCheckedPlace = { ...newCheckedPlace, x2: x, y2: y, x3: x, y3: y };
        //         break;
        //     case 3:
        //         newCheckedPlace = { ...newCheckedPlace, x2: x, y2: y, x3: x, y3: y, x4: x, y4: y };
        //         break;
        //     default:
        //     break;
        // }
        //  x,y값이 추가 되어도 같은 값이 x2,y2로 들어가는 버그 수정 코드
        let newCheckedPlace = { ...checkedPlace, [currentInputIndex === 0 ? 'x' : `x${currentInputIndex + 1}`]: x, [currentInputIndex === 0 ? 'y' : `y${currentInputIndex + 1}`]: y };
        //  setCheckedPlace함수 서버 통신위하여 가공
        setCheckedPlace(newCheckedPlace);
        // setPositions([{ lat: y, lng: x }]);
        //checkedPlace 찍힐 때 마다 마커 찍기 위한 positions 상태값 업데이트 로직 추가.
        //newCheckedPlace 객체는 positions 배열에 추가될 새로운 마커 위치 정보 담는다
        // const newPositions = [...positions];
        // newPositions[currentInputIndex] = { lat: y, lng: x };
        // setPositions(newPositions);
        // console.log('positions->', positions);
        console.log("서버보내는 checkedPlace", checkedPlace)
        console.log("서버보내는 newCheckedPlace", newCheckedPlace)
        // const newPositions = [...positions]; // positions state 복제
        // newPositions.push({ lat: y, lng: x }); // 새 마커 추가
        // setPositions(newPositions); // positions state 업데이트
        setCheckedPlace(prevCheckedPlace => ({
            ...prevCheckedPlace,
            [currentInputIndex === 0 ? 'x' : `x${currentInputIndex + 1}`]: x,
            [currentInputIndex === 0 ? 'y' : `y${currentInputIndex + 1}`]: y
        }));
        setPositions(prevPositions => [...prevPositions, {lat: y, lng: x}]);
        console.log("prevCheckedPlace=======>", prevCheckedPlace)
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
                size='leftIcon'
                cursor='pointer'
                readOnly={true}
                onClick={() => onInputClickHandler(index)}
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
    // refresh token 얻기
    const token = cookies.get('refresh_token');
    //  검색 값 request폼으로 가공 후 서버통신
    const { mutate, isLoading } = useMutation({
        mutationFn: async (location) => {
            console.log('location->', location[0]);
            const data = await apis.post(
                //  서버 URL
                '/find',
                //  Request값(x,y~x4,y4)
                checkedPlace,
                {
                    headers: {
                        refresh_token: `${token}`,
                        },
                },
                console.log("전송되는checkedPlace=>",checkedPlace)
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
            console.log('response', response);
            alert(response);
            const lat = data.data.data.lat;
            const lng = data.data.data.lng;
            const newMidPoint = {lat, lng};
            console.log("newMidPoint",newMidPoint);
            setMidPoint(newMidPoint);
        },
    });
    // useEffect(() => {
    //     if (checkedPlace) {
    //         const newPositions = [...positions];
    //         newPositions[currentInputIndex] = { lat: checkedPlace.y, lng: checkedPlace.x };
    //         setPositions(newPositions);
    //         gettingLocation(newPositions);
    //     }
    //   }, [checkedPlace, currentInputIndex, positions]);
    // 지도가 움직이지만, gettingLocation함수 에러없이 작동 하지만 값이 없음.
    useEffect(() => {
        if(checkedPlace) {
            gettingLocation(positions)}
    },[checkedPlace])

    // 키워드 입력후 검색 클릭 시 원하는 키워드의 주소로 이동
    const gettingLocation = function (positions) { 
        //  checkedPlace가 오는게 아니라 positions가 와야함. postions가 마커 state 값
        const newSearch = checkedPlace;
        // console.log("data-> ", data)
        // positions 배열을 복제하여 prevPositions로 사용
        const prevPositions = [...positions];
        // 검색 결과를 center에 추가.(검색결과위치로 좌표찍기)
        // 이 부분 checkedPlaceHandler() 함수에서 수행했기 때문에 중복된 코드
        // setCenter({ lat: newSearch.y, lng: newSearch.x });
        // 검색 결과를 positions에 추가.(마커를 찍어줌))
        setPositions(prevPositions =>[
            ...prevPositions,
            {
            title: newSearch.place_name,
            latlng: { lat: newSearch.y, lng: newSearch.x },
            },
            
        ]);
        console.log('newSearch->', newSearch);
        console.log('positions->', positions);
        console.log('마지막 checkedPlace->', checkedPlace);
    }
    return (
        <WebWrapper>
        <WebWrapperHeight>
            <FlexRow style={{ justifyContent: 'space-between' }}>
                <div>
                    <Map 
                        center={center} 
                        style={{ width: '690px', height: '803px', top:'179', left:'360' }}
                    >
                            {positions.map((position, index) => (
                                <MapMarker
                                    key={index}
                                    position={position.latlng} // 마커를 표시할 위치
                                    image={{
                                        src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
                                        size: {
                                        width: 24,
                                        height: 35,
                                        }, // 마커이미지의 크기입니다
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
            
                <div>
                    <h1>
                    친구와 본인의 위치를 입력해주세요.
                    </h1>
                    <p>
                    중간 위치에 있는 맛집을 찾아드립니다.
                    </p>
                        <div>
                            {inputs}
                            {renderModal()}
                                <button 
                                    onClick={addingInputBoxButtonHandler}
                                >
                                추가하기
                                </button>
                                <button
                                    onClick={() => {mutate(checkedPlace);}}
                                >
                                중간위치찾기
                                </button>
                        </div>
                </div>
            </FlexRow>
        </WebWrapperHeight>
        </WebWrapper>
    );
}

export default AddingInputBoxButton;