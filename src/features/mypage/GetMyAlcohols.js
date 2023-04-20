import React from 'react';
import { apis } from '@shared/axios';
import { cookies } from '@shared/cookie';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

const GetMyAlcohols = () => {
  const token = cookies.get('access_token');
  const push = useRouter();

  const { data } = useQuery({
    queryKey: ['GET_ALCOHOLS'],
    queryFn: async () => {
      const { data } = await apis.get('/my-page/likeAlkol?all?page=1?size=5', {
        headers: {
          Access_Token: `${token}`,
        },
      });
      console.log('dataPostss--------------', data);
      return data;
    },
  });

  if (data?.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            margin: '202px auto',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            style={{ width: '160px', height: '160px' }}
            src="Group 2041.png"
            alt="작성한 글이 없습니다."
          />
          <p>좋아요한 게시글이 없습니다.</p>
          <p
            onClick={() => {
              push.push('/alcohoLs');
            }}
            style={{ color: '#FF6A64' }}
          >
            {' '}
            커뮤니티 게시글 보러가기
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap',
        }}
      >
        {data?.map((post) => (
          <ContainerDiv key={post.id}>
            <div>
              <img
                style={{
                  width: '384px',
                  height: '242px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                }}
                src={post.postList[0]}
                alt={post.place_name}
              />
              <div>
                <p>{post.place_name}</p>
              </div>
            </div>
          </ContainerDiv>
        ))}
      </div>
    );
  }
};

export default GetMyAlcohols;

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  width: 384px;
  height: 278px;
  margin-top: 20px;
  .p {
    margin-top: 12px;
    font-size: 16px;
  }
`;
