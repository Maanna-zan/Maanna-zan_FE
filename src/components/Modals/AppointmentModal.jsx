import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apis } from '@shared/axios';
import { cookies } from '@shared/cookie';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { InputArea } from '@components/Atoms/Input';
import { ButtonText } from '@components/Atoms/Button';
import Save from '@features/mypage/Save';

export default function ApporintmentModal({ onClose, data }) {
  const router = useRouter();
  // console.log('data', data);

  return (
    <ModalDiv className="modal">
      <div className="modal-overlay">
        <img
          style={{
            position: 'fixed',
            right: '20px',
            top: '20px',
            // display: 'flex',
            // justifyContent: 'flex-end',
            width: '12px',
            height: '12px',
          }}
          onClick={onClose}
          src="Group 1972.png"
          alt="취소 버튼"
        />

        <InnerDiv>
          <img className="Img" src="Image1.png" alt="약속잡기 완료" />
          <p className="goodjob">약속을 성공적으로 만들었습니다</p>
          <div className="twoButton">
            <ButtonText
              onClick={onClose}
              label="닫기"
              size="xxxsm"
              variant="trans"
            />
            <ButtonText
              onClick={() => {
                router.push('/mypage');
              }}
              label="약속 일정 보기"
              size="xxxsm"
              variant="primary"
            />
          </div>
        </InnerDiv>
      </div>
    </ModalDiv>
  );
}

const ModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #6a758152;
  /* mix-blend-mode: darken; */
  z-index: 999;
  .modal-overlay {
    padding: 20px 40px;
    border-radius: 20px;
    position: fixed;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffff;
    z-index: 1000;
    max-width: 400px;
    min-width: 280px;
    width: 50%;
    border: 1px solid #939aa0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: 10px;
  .InputArea {
    border-color: #9fa4a9;
    width: 250px;
    display: flex;
    justify-items: center;
  }
  .Img {
    width: 106px;
    height: 106px;
    display: flex;
    margin: 0 auto;
    margin-top: 60px;
  }
  .goodjob {
    font-weight: 600;
    font-size: 20px;
    line-height: 26px;
  }
  .twoButton {
    display: flex;
    justify-content: flex-end;
    margin-right: -50px;
    gap: 5px;
  }
`;
const InputDiv = styled.div`
  border: 1px solid #9fa4a9;
  padding: 10px;
  border-radius: 8px;
  color: #9fa4a9;
  background-color: #f7f8f9;
`;

const EttingDiv = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
`;
const FindButton = styled.button`
  border: none;
  color: #9fa4a9;
  background-color: transparent;
  width: fit-content;
  font-size: 11px;
`;

const ModeParentsDiv = styled.div`
  display: flex;
  gap: 20px;
  font-size: 14px;
  justify-content: center;
  .unModeP {
    color: #9ea4aa;
  }
  .modeDiv {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;
const Hr = styled.hr`
  border: 0.5px solid #ff4840;
  width: 60px;
  height: 0px;
  border-bottom: 0px;
  margin-top: -13px;
`;

const BottomHr = styled.hr`
  border: 0.5px solid#E8EBED;
  width: 368px;
  height: 0px;
  border-bottom: 0px;
  margin-top: 170px;
`;
