import { useState } from 'react';
import { createPortal } from 'react-dom';
import Modal from './Modal';
import { ButtonText } from '@components/Atoms/Button';

export default function PortalExample() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <ButtonText
        variant="borderColorWhite"
        label={'로그인'}
        onClick={() => setShowModal(true)}
      ></ButtonText>
      {showModal &&
        createPortal(
          <Modal onClose={() => setShowModal(false)} />,
          document.body,
        )}
    </>
  );
}
