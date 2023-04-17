import React from 'react';
import { KakaoSDK } from 'kakao-sdk';

const initKakaoSDK = (apiKey) => {
  KakaoSDK.init(apiKey);
};

const ShareKakaoBtn = ({ url, title, description, imageUrl }) => {
  const apiKey = `${process.env.NEXT_PUBILC_KAKAOMAP_KEY}`;

  useEffect(() => {
    initKakaoSDK(apiKey);
  }, []);

  const handleKakaoShare = () => {
    KakaoSDK.Link.createDefaultButton({
      container: '#kakao-link-btn',
      objectType: 'feed',
      content: {
        title,
        description,
        imageUrl,
        link: {
          webUrl: url,
          mobileWebUrl: url,
        },
      },
      buttons: [
        {
          title: '사이트 바로가기',
          link: {
            webUrl: url,
            mobileWebUrl: url,
          },
        },
      ],
    });
  };

  return (
    <div>
      <button id="kakao-link-btn" onClick={handleKakaoShare}>
        카카오로 공유하기
      </button>
    </div>
  );
};

export default ShareKakaoBtn;
