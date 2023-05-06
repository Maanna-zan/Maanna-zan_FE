import { HeadInfo } from '@components/Atoms/SEO/HeadInfo';
import { BoxText } from '@components/Atoms/box';
import CommunityList from '@features/post/CommunityList';
import Link from 'next/link';
import React from 'react';
import AddPostForm from './add';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { routeChangeCompleteHandler } from '@utils/routeChangeCompleteHandler';
const routeChangeCompleteHandler = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(
      `__next_scroll_${window.history.state.idx}`,
      JSON.stringify({
        y: window.scrollY,
      }),
    );
  }
};

const Community = () => {
  const router = useRouter();
  const routeChangeCompleteHandler = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(
        `__next_scroll_${router.asPath}`,
        JSON.stringify({
          x: window.pageXOffset,
          y: window.pageYOffset,
        }),
      );
    }
  };

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      const _scroll = sessionStorage.getItem(
        `__next_scroll_${window.history.state.idx}`,
      );
      if (_scroll) {
        const { y } = JSON.parse(_scroll);
        window.scrollTo(0, y);
        sessionStorage.removeItem(`__next_scroll_${window.history.state.idx}`);
      }
    } else {
      setIsLoaded(true);
    }

    router.events.on('routeChangeComplete', routeChangeCompleteHandler);
    return () => {
      router.events.off('routeChangeComplete', routeChangeCompleteHandler);
    };
  }, [router.events]);

  return (
    <div>
      <HeadInfo title="게시글 작성페이지입니다" />
      <CommunityList></CommunityList>
    </div>
  );
};

export default Community;
