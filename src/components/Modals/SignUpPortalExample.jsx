import { useState } from 'react';
import { createPortal } from 'react-dom';
import SignUpModal from './SignUpModal';
import { ButtonText } from '@components/Atoms/Button';
import Modal from './Modal';

export default function SignUpPortalExample() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <ButtonText
        variant="borderColorWhite"
        label={'회원가입'}
        onClick={() => setShowModal(true)}
      ></ButtonText>
      {showModal &&
        createPortal(
          <SignUpModal onClose={() => setShowModal(false)} />,
          document.body,
        )}
    </>
  );
}
