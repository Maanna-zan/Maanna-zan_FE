import { HeadInfo } from '@components/Atoms/SEO/HeadInfo';
import { MainFirstSection } from '@components/Templates/mainpage/MainFirstSection';
import { MainLastSectionMovie } from '@components/Templates/mainpage/MainLastSectionMovie';
import { MainSecondSection } from '@components/Templates/mainpage/MainSecondSection';
import FirstPage from '@features/FirstPage';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const App = () => {
  return (
    <div>
      <HeadInfo title="만나잔에 오신걸 환영합니다!" />
      <MainFirstSection />
      <MainSecondSection />
      <MainLastSectionMovie />
    </div>
  );
};

export default App;

//next에서 제공해주는 기능
export async function getServerSideProps(context) {
  //여기는 서버를 실행하는 곳 여기서 서버란 프론트 쪽이 가지고 있는 서버
  //여기서 axios 실행하면 corps에러가 안난다
  return {
    props: { message: '예상기 매니저님 짱' },
  };
}
