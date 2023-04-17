import { apis } from '@shared/axios';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { cookies } from '@shared/cookie';

const FindPost = () => {
  const token = cookies.get('access_token');

  const { data } = useQuery({
    querryKey: ['GET_MYPOSTS'],
    queryFn: async () => {
      const data = await apis.get('/my-page/likePost?all?page=1?size=5', {
        headers: {
          Access_Token: `${token}`,
        },
      });
      console.log('data--------------', data.data.data.posts);
      return data.data.data.posts;
    },
  });
  return (
    <div>
      FindPost
      {data &&
        data.map((posts) => (
          <div key={posts.id}>
            <h4>{posts.id}</h4>
            <img src={posts.s3Url} alt={posts.title} />
            <p>{posts.nickname}</p>
            <div>{posts.title}</div>
            <p>{posts.description}</p>
          </div>
        ))}
      <img src="MypageQuestion.png" alt="작성한 글이 없습니다." />
    </div>
  );
};

export default FindPost;
