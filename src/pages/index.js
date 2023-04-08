import FirstPage from '@features/FirstPage';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const App = (props) => {
  console.log(props);

  //정보 저장 or DOM 접근
  const letterDivRefs = useRef([]);
  console.log('letterDivRefs', letterDivRefs);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          // entry.target.style.transform = 'rotate(360deg)';
        } else {
          entry.target.style.opacity = 0;
        }
      });
    });

    letterDivRefs.current.forEach((div) => observer.observe(div));

    return () => {
      letterDivRefs.current.forEach((div) => observer.unobserve(div));
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !letterDivRefs.current.includes(el)) {
      letterDivRefs.current.push(el);
    }
  };
  console.log('addToRefs', addToRefs);

  return (
    <BodyDiv>
      <LetterDiv ref={addToRefs}>
        <FirstPage className="dummy" />
      </LetterDiv>
      <LetterDiv ref={addToRefs}>
        <h1 className="dummy">왜 안바꾸지????? 뭐지????</h1>
      </LetterDiv>
      <LetterDiv ref={addToRefs}>
        <FirstPage className="dummy" />
      </LetterDiv>
      <LetterDiv ref={addToRefs}>
        <h1 className="dummy">새로운 아이폰</h1>
      </LetterDiv>
      <LetterDiv ref={addToRefs}>
        <h1 className="dummy">속았지 실은 이것도 c타입이야</h1>
      </LetterDiv>
      <LetterDiv ref={addToRefs}>
        <FirstPage className="dummy" />
      </LetterDiv>
    </BodyDiv>
  );

};

export default App;

const BodyDiv = styled.div`
  background: black;
  height: 100%;
  position: relative;
`;
const LetterDiv = styled.div`
  /* margin-top: 1000px; */
  height: 100vh;
  color: white;
  position: relative;
  text-align: center;
  opacity: 0;
  transition: all 10s;
  display: flex;
  justify-content: center;
  align-items: center;
  .dummy {
    position: absolute;
  }
`;

//next에서 제공해주는 기능
export async function getServerSideProps(context) {
  //여기는 서버를 실행하는 곳 여기서 서버란 프론트 쪽이 가지고 있는 서버
  //여기서 axios 실행하면 corps에러가 안난다
  return {
    props: { message: '예상기 매니저님 짱' },
  };
}
