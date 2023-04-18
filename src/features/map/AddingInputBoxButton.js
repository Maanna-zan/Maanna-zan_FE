import { ButtonText } from '@components/Atoms/Button';
import { InputArea } from '@components/Atoms/Input';
import React, { useState } from 'react';

function AddingInputBoxButton() {
    const [inputCount, setInputCount] = useState(1);

    const addingInputBoxButtonHandler = () => {
        if (inputCount < 4) {
            setInputCount(inputCount + 1);
            }
    };

    const inputs = [];

    for (let i = 0; i < inputCount; i++) {
        inputs.push(
        <InputArea 
        key={i} 
        type="text" 
        placeholder='이 버튼을 눌러 위치를 추가해주세요.'
        variant='default'
        size='leftIcon'
        />
        );
    }

    return (
        <div>
            {inputs}
            <ButtonText 
            size='lg'
            variant='default'
            onClick={addingInputBoxButtonHandler}>
            추가하기</ButtonText>
        </div>
    );
}

export default AddingInputBoxButton;