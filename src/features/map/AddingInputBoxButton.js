import { ButtonText } from '@components/Atoms/Button';
import { InputArea } from '@components/Atoms/Input';
import KeywordSearchModal from '@components/Modals/SearchKeywordModal';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

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
    //  자식 컴포넌트 props 꺼내서 쓸 수 있도록 한다.
    function checkedPlaceHandler(place) {
        // checkedPlace 객체를 request 폼으로 가공
        const { x, y } = place;
        // 인풋박스 각각의 값에 각각의 props state값 주는 로직.
        const newInputValues = [...inputValues];
        newInputValues[currentInputIndex] = place.place_name;
        setInputValues(newInputValues);
        //  인풋박스 index이용하여 각자의 값에 x,y빼내어 case별로 구분.
        let newCheckedPlace = { x, y };
        switch (currentInputIndex) {
            case 1:
                newCheckedPlace = { ...newCheckedPlace, x2: x, y2: y };
                break;
            case 2:
                newCheckedPlace = { ...newCheckedPlace, x2: x, y2: y, x3: x, y3: y };
                break;
            case 3:
                newCheckedPlace = { ...newCheckedPlace, x2: x, y2: y, x3: x, y3: y, x4: x, y4: y };
                break;
            default:
            break;
        }
        //  setCheckedPlace함수 서버 통신위하여 가공
        setCheckedPlace(newCheckedPlace);
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
    console.log("checkedPlace", checkedPlace)
    //  Input Box 받아주는 배열
    const inputs = [];
    for (let i = 0; i < inputCount; i++) {
        inputs.push(renderInputArea(i));
    }
    return (
        <div>
            {inputs}
            {renderModal()}
            <ButtonText 
                size='lg'
                variant='default'
                onClick={addingInputBoxButtonHandler}>
                추가하기
            </ButtonText>
            <button
            onClick={() => {
                mutate(checkedPlace);
            }}
        >
            중간위치찾기
            </button>
        </div>
    );
}

export default AddingInputBoxButton;