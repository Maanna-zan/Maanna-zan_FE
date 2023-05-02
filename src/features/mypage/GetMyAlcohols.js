import React from 'react';
import { apis } from '@shared/axios';
import { cookies } from '@shared/cookie';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { LikeHeartIcon } from '@components/Atoms/HeartIcon';

//페이지네이션 임포트
import Pagination from '@components/Modals/Pagenation2';
import chunk from '@components/Modals/chunk';

const GetMyAlcohols = () => {
  const token = cookies.get('access_token');
  const push = useRouter();

  //페이지 네이션 처음 시작이 1번창부터 켜지도록
  const [activePage, setActivePage] = useState(1);

  const { data } = useQuery({
    queryKey: ['GET_ALCOHOLS'],
    queryFn: async () => {
      const { data } = await apis.get('/my-page/likeAlkol', {
        headers: {
          Access_Token: `${token}`,
        },
      });
      // console.log('dataPostss--------------', data);
      return data;
    },
  });

  //페이지네이션을 위한 구역 data 는 쿼리에서 먼저 undefined되기에 ? 로 있을 때
  //map을 돌릴 데이터를 4개씩 끊어서 라는 뜯 입니다 (9개ㅈ씩 끊고 싶으면 9 적으면 됩니다. )
  const chunkedData = data ? chunk(data, 9) : [];
  const currentPageData = chunkedData[activePage - 1] ?? [];

  if (!data || data?.length === 0) {
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
              push.push('/alcohols');
            }}
            style={{ color: '#FF6A64' }}
          >
            {' '}
            술집 리스트 보러가기
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <LogBox>
          <div
            style={{
              display: 'flex',
              gap: '24px',
              flexWrap: 'wrap',
            }}
          >
            {currentPageData.map((post) => (
              <ContainerDiv key={post.apiId}>
                <div
                  onClick={() => {
                    push.push(`/alcohols/${post.apiId}`);
                  }}
                >
                  <img
                    style={{
                      width: '384px',
                      height: '242px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                    }}
                    src={post.postList[0]?.s3Url || 'noimage_282x200____.png'}
                    alt={post.place_name}
                  />
                  <div className="flexGap">
                    <p className="title">{post.place_name}</p>
                    <div className="flex">
                      <LikeHeartIcon />
                      <p className="likecnt">{post.roomLikecnt}</p>
                    </div>
                  </div>
                </div>
              </ContainerDiv>
            ))}
          </div>
        </LogBox>

        <Pagination
          pages={chunkedData.map((_, i) => i + 1)}
          activePage={activePage}
          setPage={setActivePage}
        />
      </div>
    );
  }
};

export default GetMyAlcohols;

const LogBox = styled.div`
  /* border: 1px solid black; */
  width: 1210px;
  height: 960px;
`;

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
  .title {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }
  .flexGap {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .flex {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;
