import { HeadInfo } from '@components/Atoms/SEO/HeadInfo';
import { MainFirstSection } from '@components/Templates/mainpage/MainFirstSection';
import { MainLastSectionMovie } from '@components/Templates/mainpage/MainLastSectionMovie';
import { MainSecondSection } from '@components/Templates/mainpage/MainSecondSection';
import React from 'react';

const App = () => {
  return (
    <div>
      <HeadInfo title={`만나잔에 오신걸 환영합니다!`} />
      <MainFirstSection />
      <div style={{ margin: '145px 0 161px 0' }}>
        <MainSecondSection />
      </div>
      <MainLastSectionMovie />
    </div>
  );
};

export default App;
