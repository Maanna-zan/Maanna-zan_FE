import { useState } from 'react';
import { createPortal } from 'react-dom';
import SettingModal from './SettingModal';

export default function SettingPortalExample({ data }) {
  console.log('data', data);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div onClick={() => setShowModal(true)}>setting</div>
      {showModal &&
        createPortal(
          <SettingModal data={data} onClose={() => setShowModal(false)} />,
          document.body,
        )}
    </>
  );
}
