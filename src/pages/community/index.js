import { HeadInfo } from '@components/Atoms/SEO/HeadInfo';
import CommunityList from '@features/CommunityList';
import React from 'react';

const Community = () => {
  return (
    <div>
      <HeadInfo title="게시글 작성페이지입니다" />
      <CommunityList />
    </div>
  );
};

export default Community;
