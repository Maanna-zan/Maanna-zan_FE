import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { apis } from '../../shared/axios';
import { useState } from 'react';
import { cookies } from '../../shared/cookie';
import { useDeletePost } from '../../hook/post/useDeletePost';
import { useGetPost } from '../../hook/post/useGetPost';
import { Post } from './Post';

const CommunityList = () => {
  const { go } = useRouter();
  //토큰은 어세스나 리프레시 토큰 둘 중 하나만 헤더로 보여주면 된다.
  const token = cookies.get('refresh_token');
  // console.log('token', token);
  const { posts, postIsLoading } = useGetPost();
  if (!posts || postIsLoading) return <div>로딩중...</div>;

  return (
    <>
      <div>
        CommunityList
        {posts.map((post) => (
          <Post
            post={post}
            key={post.id}
            apiId={post.id}
            // onClick={() => {
            //   go(`/community/${post.id}`);
            // }}
          >
            <h1>가게이름임</h1>
            <div>{post.storename}</div>
            <h1>글제목임</h1>
            <div>{post.title}</div>
            <div>{post.id}</div>
            <div>{post.likecnt}</div>
            <img src={post.image} alt={post.storename} />
            <div>{post.description}</div>
            <div>nickname---{post?.nickname}</div>
          </Post>
        ))}
      </div>
    </>
  );
};

export default CommunityList;
