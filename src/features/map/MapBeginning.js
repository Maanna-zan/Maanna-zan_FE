import { FlexRow } from '@components/Atoms/Flex';
import { ImgCenter, ImgWrapper690x803 } from '@components/Atoms/imgWrapper';
import { WebWrapper, WebWrapperHeight } from '@components/Atoms/Wrapper';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const MapBeginning = () => {
  //  중간 위치 검색하기 버튼 눌렀을 때, 중간 위치 검색 페이지로 이동 위한 선언들.
  const queryClient = useQueryClient();
  const router = useRouter();
  //  중간 위치 검색 페이지 이동 버튼 핸들러
  const moveToMapSearchButtonClickHandler = () => {
    router.push('/map');
  };
  return (
    <WebWrapper style={{ paddingTop: '150px' }}>
      <WebWrapperHeight>
        <FlexRow style={{ justifyContent: 'space-between' }}>
          <ImgWrapper690x803 style={{ backgroundColor: 'white' }}>
            <ImgCenter
              style={{
                width: '100vw',
                height: '100vh',
                marginBottom: '200px',
              }}
              src="mainPageSecondScroll.png"
            />
          </ImgWrapper690x803>

          <ContentWrapper>
            <H1Styled>
              중간 위치에 있는
              <Highlighting>술집을 찾아드립니다.</Highlighting>
            </H1Styled>
            <ImgCenter
              style={{
                width: '350px',
                height: '350px',
                marginBottom: '200px',
                opacity: '50%',
                position: 'absolute',
                margin: '233px 0 0 440px',
                zIndex: `-1`,
              }}
              src="mainPageSecondScrolldeIcon.png"
            />
            <ButtonStyle
              size="xl"
              variant="primary"
              fontColor="white"
              style={{ cursor: 'pointer' }}
              onClick={moveToMapSearchButtonClickHandler}>
              중간 위치 검색하기
            </ButtonStyle>
          </ContentWrapper>
        </FlexRow>
      </WebWrapperHeight>
    </WebWrapper>
  );
};

export default MapBeginning;
const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 140px 150px 0px;
`;
const H1Styled = styled.h1`
  font-size: 40px;
  font-weight: 500;
`;
const Highlighting = styled.div`
  font-size: 40px;
  font-weight: 700;
`;
const ButtonStyle = styled.button`
  font-size: 12px;
  font-weight: 600;
  padding: 13px;
  color: #ffffff;
  background-color: #ff4740;
  border: none;
  border-radius: 20px;
`;
