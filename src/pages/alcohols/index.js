import AlcoholList from '@features/AlcoholList';
import React from 'react';
import { HeadInfo } from '@components/Atoms/SEO/HeadInfo';
const Alcohols = () => {
  return (
    <div>
      <HeadInfo title="만나잔에 오신걸 환영합니다! " />
      <AlcoholList />
    </div>
  );
};

export default Alcohols;
