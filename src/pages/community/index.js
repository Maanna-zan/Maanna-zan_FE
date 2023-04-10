import { HeadInfo } from '@components/Atoms/SEO/HeadInfo';
import { BoxText } from '@components/Atoms/box';
import CommunityList from '@features/post/CommunityList';
import Link from 'next/link';
import React from 'react';
import AddPostForm from './add';

const Community = () => {
  return (
    <div>
      <HeadInfo title="게시글 작성페이지입니다" />
      <CommunityList></CommunityList>
    </div>
  );
};

export default Community;
