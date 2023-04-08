import React from 'react';
import { InputArea } from '@components/Atoms/Input';
import { AiOutlineSearch } from 'react-icons/ai';
import { ButtonText } from '@components/Atoms/Button';
import styled from 'styled-components';
export const MainSearch = () => {
  return (
    <InputAreaWrapper>
      <InputArea style={{ position: 'absolute' }} />
      <AiOutlineSearch
        style={{ position: 'absolute', right: '20px' }}
      ></AiOutlineSearch>
    </InputAreaWrapper>
  );
};
const InputAreaWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  position: relative;
`;
