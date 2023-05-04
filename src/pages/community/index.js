import { HeadInfo } from '@components/Atoms/SEO/HeadInfo';
import { BoxText } from '@components/Atoms/box';
import CommunityList from '@features/post/CommunityList';
import Link from 'next/link';
import React from 'react';
import AddPostForm from './add';
import { useEffect } from 'react';
const Community = () => {
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
      <HeadInfo title="게시글 작성페이지입니다" />
      <CommunityList></CommunityList>
    </div>
  );
};

export default Community;
