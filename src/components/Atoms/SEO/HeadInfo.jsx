import React from 'react';
import Head from 'next/head';
import { ShareBlockStandard } from 'react-share';

export const HeadInfo = ({ title, keyword, contents, shareUrl }) => {
  return (
    <Head>
      <title>Maanna zan-{title}</title>
      <meta name="keywords" content={keyword} />
      <meta name="contents" content={contents} />
      {/* <meta keyword={keyword} />
      <meta contents={contents} /> */}
    </Head>
  );
};
