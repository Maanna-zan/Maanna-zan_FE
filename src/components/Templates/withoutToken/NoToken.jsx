import React from 'react';
import styled from 'styled-components';

const NoToken = () => {
  return (
    <Wall>
      <div>
        <div className="WhiteBox">
          <img
            className="img"
            src="Group 2559.png"
            alt="로그인이 필요한 서비스 입니다."
          />
          <p className="info">로그인이 필요한 서비스입니다.</p>
        </div>
      </div>
    </Wall>
  );
};

export default NoToken;

const Wall = styled.div`
  width: 100%;
  height: 90vh;
  background: #f7f8f9;
  display: flex;
  justify-content: center;
  align-items: center;
  .WhiteBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 410px;
    height: 410px;
    background: #ffffff;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
  }

  .img {
    display: flex;
    margin-left: 35px;
    height: fit-content;
    width: 190px;
    height: 190px;
  }
  .info {
    display: flex;
    margin-top: -30px;
    height: fit-content;
    font-weight: 600;
    font-size: 20px;
    line-height: 26px;
  }
`;
