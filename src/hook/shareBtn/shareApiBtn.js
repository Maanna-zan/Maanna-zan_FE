import { ShareBtn } from '@components/Atoms/ShareBtn';
import React from 'react';
import { ButtonText } from '@components/Atoms/Button';
const ShareApiBtn = ({ url, title, text, icon, handleShareClick }) => {
  return (
    <ShareBtn
      style={{ cursor: 'pointer', height: '24px' }}
      onClick={handleShareClick}
    >
      {icon}
    </ShareBtn>
  );
};

export default ShareApiBtn;
// 여러 소셜미디어 아이콘을 사용하고 싶다면 배열로 전달할 수도 있음
// socialMedia={['twitter', 'facebook']}
