import { useState } from 'react';
import { createPortal } from 'react-dom';
import SignInModal from './SignInModal';
import { ButtonText } from '@components/Atoms/Button';

export default function SignInPotalExample() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <ButtonText
        style={{ font: `var( --title2-semibold) Pretendard sans-serif` }}
        variant="hoverRed"
        label={'로그인'}
        onClick={() => setShowModal(true)}
      ></ButtonText>
      {showModal &&
        createPortal(
          <SignInModal onClose={() => setShowModal(false)} />,
          document.body,
        )}
    </>
  );
}
