import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { apis } from '../../shared/axios';
import { cookies } from '../../shared/cookie';
import Alcohols from '.';
import AddComment from '@features/AddComment';
import CommentsList from '@features/CommentsList';
import { WebWrapper } from '@components/Atoms/Wrapper';
import { keys } from '@utils/createQueryKey';
import { useGetPost } from '../../hook/post/useGetPost';

const community = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { query } = useRouter();
  console.log('query', query);

  const token = cookies.get('refresh_token');

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['GET_COMMUNITYDETAIL'],
    queryFn: async () => {
      const { data } = await apis.get(`/posts/${query.id}`, {
        headers: {
          //   // 'Content-Type': 'multipart/form-data',
          // refresh_token: `${token}`,
        },
      });
      console.log('커뮤니티data-------------', data);
      return data.data;
    },
    //enabled: -> 참일 때 실행시켜준다.
    enabled: Boolean(query.id),
    onSuccess: () => {},
  });

  const { posts, postIsLoading } = useGetPost();

  if (postIsLoading) return <div>로딩중...</div>;

  console.log('datacmo---->', posts[query.id]);
  //   id
  // :
  // 5
  // like
  // :
  // false
  // likecnt
  // :
  // 0
  // modifiedAt
  // :
  // "2023-04-21"
  // nickname
  // :
  // "장동희2"
  // s3Url
  // :
  // "https://maanna-zan.s3.ap-northeast-2.amazonaws.com/55fc4476-5694-42ed-a1c9-59c9dc8b14e6_%EC%95%BC%ED%82%A4%ED%86%A0%EB%A6%AC%EA%B3%A0%EC%9A%B0.jpeg"
  // soju
  // :
  // false
  // title
  // :
  // "꼬치 맛집 야키토리고우"
  // viewCount
  // :
  // 0
  return (
    <WebWrapper>
      {posts[query.id]?.description}
      <div>
        <button
          onClick={() => {
            router.push('/community');
          }}
        >
          뒤로가기
        </button>
        <div>id---{data?.id}</div>
        <div>like---{data?.like}</div>
        <div>storename---{data?.storename}</div>
        <div>nickname---{data?.nickname}</div>
        <img src={data?.s3Url} alt={data?.storename} />
        <div>likecnt---{data?.likecnt}</div>
        <div>title---{data?.title}</div>
        <div>description---{data?.description}</div>
        <div>소주---{data?.soju}</div>
        <div>맥주---{data?.beer}</div>
        {/* <div>생성일{data?.createAt.substr(0, 10)}</div> */}
        <AddComment />
        <CommentsList />
      </div>
    </WebWrapper>
  );
};

export default community;
