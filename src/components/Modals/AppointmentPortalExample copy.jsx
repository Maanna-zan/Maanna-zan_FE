import { useState } from 'react';
import { createPortal } from 'react-dom';
import ApporintmentModal from './AppointmentModal';

export default function AppointmentPortalExample({ data }) {
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
          <ApporintmentModal data={data} onClose={() => setShowModal(false)} />,
          document.body,
        )}
    </>
  );
}
