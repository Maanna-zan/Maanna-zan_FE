import React from 'react';
import Head from 'next/head';
export const HeadInfo = ({ title, keyword, contents }) => {
  return (
    <Head>
      <title>Maanna zan-{title}</title>
      <meta keyword={keyword} />
      <meta contents={contents} />
    </Head>
  );
};
