import React from 'react';
import styled from 'styled-components';

const FirstPage = () => {
  return (
    <PageDiv>
      <div
        style={{
          height: '500px',
          width: '50%',
          backgroundColor: 'tomato',
          fontWeight: '900',
        }}
      >
        우리가 그걸
      </div>
      <div>그게 무슨 말인거에요?</div>
      <input />
      <button>합치기</button>
    </PageDiv>
  );
};

export default FirstPage;

const PageDiv = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
