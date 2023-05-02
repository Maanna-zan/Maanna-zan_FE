import { useState } from 'react';
import { createPortal } from 'react-dom';
import SettingModal from './SettingModal';
import styled from 'styled-components';

export default function SettingPortalExample({ data }) {
  // console.log('data', data);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div onClick={() => setShowModal(true)}>
        {' '}
        <Img src="Group 2000.png" alt="유저 설정버튼 입니다." />
      </div>
      {showModal &&
        createPortal(
          <SettingModal data={data} onClose={() => setShowModal(false)} />,
          document.body,
        )}
    </>
  );
}

const Img = styled.img`
  margin-top: 7px;
  width: 20px;
  height: 20px;
  :hover {
    height: 24px;
    width: 24px;
  }
`;
