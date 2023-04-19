import { ButtonText } from '@components/Atoms/Button';
import { InputArea } from '@components/Atoms/Input';
import KeywordSearchModal from '@components/Modals/SearchKeywordModal';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function AddingInputBoxButton({onSearch, selectedPlace}) {
    //  Input Box 갯수 state. 값으로 1을 넣은 이유는 처음에 1개가 기본 있어야 한다.
    const [inputCount, setInputCount] = useState(1);
    //  Modal창 열고 닫는 state
    const [showModal, setShowModal] = useState(false);
    //   currentInputIndex 상태값을 설정
    const [currentInputIndex, setCurrentInputIndex] = useState(-1);
    //  입력값 상태값 설정
    const [inputValues, setInputValues] = useState(Array.from({ length: 4 }, () => ''));
    
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
        console.log("onSearch=> ",onSearch)
    }
    //onConfirm 콜백 함수 정의
    const handleModalConfirm = (value) => {
        const newInputValues = [...inputValues];
        newInputValues[currentInputIndex] = value;
        setInputValues(newInputValues);
        setShowModal(false);
    }
    const [searchPlace, setSearchPlace] = useState(null);
    function handleSearchResult(place) {
        setSearchPlace(place);
    }
    useEffect(() => {
        if (selectedPlace) {
          document.getElementById('input-box').value = selectedPlace.place_name;
        }
      }, [selectedPlace]);
    //  Input 박스 추가
    const renderInputArea = (index) => {
        return (
            <InputArea 
                key={index} 
                type="text" 
                placeholder='이 버튼을 눌러 위치를 추가해주세요.'
                value={inputValues[index]}
                // onSearch={onSearch}
                variant='default'
                size='leftIcon'
                cursor='pointer'
                readOnly={true}
                onChange={(e) => {
                    const newInputValues = [...inputValues];
                    newInputValues[index] = e.target.value;
                    setInputValues(newInputValues);
                }}
                onClick={() => onInputClickHandler(index)}
                onSearch={handleSearchResult} // onSearch 전달
            >{onSearch}</InputArea>
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
                <KeywordSearchModal onClose={onCloseModalHandler} 
                onConfirm={handleModalConfirm}
                //  이거 빠지면 SearchKeywordModal.jsx파일에서 
                // 155번째줄 onSearch(places[i]); 부분 에러. onSearch is not a function
                onSearch={handleSearchResult}
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
              {/* <KeywordSearchModal onClose={onCloseModalHandler} onSearch={handleSearchResult} /> */}
        </div>
    );
}

export default AddingInputBoxButton;