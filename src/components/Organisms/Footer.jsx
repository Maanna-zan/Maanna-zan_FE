import { WebWrapper } from '@components/Atoms/Wrapper';
import React from 'react';
import styled from 'styled-components';

export const Footer = () => {
  return (
    <>
      <FooterDiv>
        <WebWrapper>
          <InnerDiv>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <img className="logoimg" src="Group 1893.png" alt="만나잔 로고" />
              <div className="informationB">
                <p className="Bp">(주)만나잔</p>
                <div>
                  <p className="Bp">대표이사 이산하</p>
                  <p className="Bp">경기 성남시 분당구 정자일로 95</p>
                  <p className="Bp">manajan@gmail.com</p>
                </div>
                <div>
                  <p className="Bp">사업자등록번호 123-45-67890</p>
                  <p className="Bp">통신판매업신고번호 제1234-서울서초-1234</p>
                </div>
              </div>
            </div>
            <div className="informationA">
              <a className="aTag">리스트</a>
              <a className="aTag">탐색</a>
              <a className="aTag">커뮤니티</a>
              <a className="aTag">공지사항</a>
              <a className="aTag">개인정보처리방침</a>
            </div>
          </InnerDiv>
        </WebWrapper>
        <Hr />
      </FooterDiv>
    </>
  );
};

const FooterDiv = styled.div`
  width: 100%;
  height: 314px;
  background: #26282b;
`;
const InnerDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  row-gap: 28px;
  padding-top: 75px;
  .logoimg {
    width: 81px;
    height: 22px;
  }
  .informationA {
    display: flex;
    width: 30%;
    justify-content: center;
    gap: 28px;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #e8ebed;
  }
  .informationB {
    padding-top: 30px;
    display: flex;
    width: 100%;
    gap: 24px;
    justify-content: center;
    font-weight: 400;
    font-size: 11px;
    line-height: 14px;
    color: #e8ebed;
  }
  .Bp {
    margin-top: -10px;
  }
`;

const Hr = styled.hr`
  margin-top: 53px;
  background: #72787f;
  width: 85%;
`;
