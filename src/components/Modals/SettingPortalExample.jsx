import { useState } from 'react';
import { createPortal } from 'react-dom';
import SettingModal from './SettingModal';

export default function SettingPortalExample({ data }) {
  // console.log('data', data);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div onClick={() => setShowModal(true)}>
        {' '}
        <img
          style={{ width: '20px', height: '20px' }}
          src="Group 2000.png"
          alt="유저 설정버튼 입니다."
        />
      </div>
      {showModal &&
        createPortal(
          <SettingModal data={data} onClose={() => setShowModal(false)} />,
          document.body,
        )}
    </>
  );
}
