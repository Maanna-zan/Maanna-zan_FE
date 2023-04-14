import React from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { apis } from '../shared/axios';
import { useState } from 'react';
import { cookies } from '../shared/cookie';

const CommunityList = () => {
  const go = useRouter();
  //토큰은 어세스나 리프레시 토큰 둘 중 하나만 헤더로 보여주면 된다.
  const token = cookies.get('access_token');

  console.log('token', token);
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['GET_COMMUNITY'],
    queryFn: async () => {
      const data = await apis.get('/posts', {
        headers: {
          Access_Token: `${token}`,
        },
      });
      console.log('data--------------', data);
      console.log(' data.data.commentList', data?.data[1].commentList);
      return data.data;
    },
  });
  // const [comments, setComments] = useState([]);
  // if (data?.commentList) {
  //   setComments(
  //     data.commentList.map((comment) => ({
  //       id: comment.id,
  //       nickName: comment.nickName,
  //       content: comment.content,
  //       createdAt: comment.createdAt,
  //     })),
  //   );
  // }

  return (
    <div>
      CommunityList
      {data &&
        data.map((post) => (
          <div
            key={post.id}
            onClick={() => {
              go.push(`/community/${post.id}`);
            }}
          >
            <h1>가게이름임{post.storename}</h1>
            <div>{post.id}</div>
            <div>{post.likecnt}</div>
            <img src={post.image} alt={post.storename} />
            <div>{post.description}</div>
            <div>nickname---{post.nickname}</div>
            {post?.commentList?.map((comment) => (
              <div key={comment.id}>
                {comment.id}
                {comment.nickName}
                {comment.content}
                {comment.createdAt}
              </div>
            ))}
          </div>
        ))}
      <div></div>
    </div>
  );
};

export default CommunityList;
