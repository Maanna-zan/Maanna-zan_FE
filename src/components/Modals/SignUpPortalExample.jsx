import { useState } from 'react';
import { createPortal } from 'react-dom';
import SignUpModal from './SignUpModal';
import { ButtonText } from '@components/Atoms/Button';

export default function SignUpPortalExample() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <ButtonText
        style={{ font: `var( --title2-semibold) Pretendard sans-serif` }}
        variant="hoverRed"
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
