import AlcoholList from '@features/AlcoholList';
import React from 'react';
import { HeadInfo } from '@components/Atoms/SEO/HeadInfo';
import { useEffect } from 'react';
const Alcohols = () => {
  useEffect(() => {
    // 페이지가 마운트될 때 이전 페이지에서 저장한 스크롤 값을 불러옴
    const scrollY = localStorage.getItem('scrollY');
    window.scrollTo(0, scrollY);

    // 페이지가 언마운트될 때 현재 스크롤 값을 저장함
    return () => {
      localStorage.setItem('scrollY', window.scrollY);
    };
  }, []);
  return (
    <div>
      <HeadInfo title="만나잔에 오신걸 환영합니다! " />
      <AlcoholList />
    </div>
  );
};

export default Alcohols;
