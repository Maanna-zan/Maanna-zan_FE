import { useState } from 'react';
import { createPortal } from 'react-dom';
import SignUpModal from './SignUpModal';
import { ButtonText } from '@components/Atoms/Button';

export default function SignUpPortalExample() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  return (
    <>
      <ButtonText
        style={{ font: `var( --title2-semibold) Pretendard sans-serif` }}
        variant="hoverRed"
        label={'회원가입'}
        onClick={() => setShowSignUpModal(true)}
      ></ButtonText>
      {showSignUpModal &&
        createPortal(
          <SignUpModal onClose={() => setShowSignUpModal(false)} />,
          document.body,
        )}
    </>
  );
}
