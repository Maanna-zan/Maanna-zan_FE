import { ShareBtn } from '@components/Atoms/ShareBtn';
import React from 'react';
import { ButtonText } from '@components/Atoms/Button';
const ShareApiBtn = ({ url, title, text, icon }) => {
  const handleShareClick = async () => {
    try {
      await navigator.share({
        title,
        text,
        url,
      });
      console.alert('성공적으로 공유가 되었습니다.');
    } catch (error) {
      console.error('공유에 실패하였습니다.', error);
    }
    console.log('url:', url);
    console.log('title:', title);
    console.log('text:', text);
  };

  return (
    <ShareBtn style={{ cursor: ' pointer', height: '24px' }}>
      <div onClick={handleShareClick}>{}</div>
    </ShareBtn>
  );
};

export default ShareApiBtn;
// 여러 소셜미디어 아이콘을 사용하고 싶다면 배열로 전달할 수도 있음
// socialMedia={['twitter', 'facebook']}
