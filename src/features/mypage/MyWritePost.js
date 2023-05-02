import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import Pagination from '@components/Modals/Pagenation2';
import chunk from '@components/Modals/chunk';
import { LikeHeartIcon } from '@components/Atoms/HeartIcon';

const MyWritePost = (data) => {
  const push = useRouter();
  // console.log('mywrutedata', data.data.posts);
  const myData = data.data.posts;

  //페이지 네이션 처음 시작이 1번창부터 켜지도록
  const [activePage, setActivePage] = useState(1);

  //페이지네이션을 위한 구역 data 는 쿼리에서 먼저 undefined되기에 ? 로 있을 때
  //map을 돌릴 데이터를 4개씩 끊어서 라는 뜯 입니다 (9개ㅈ씩 끊고 싶으면 9 적으면 됩니다. )
  const chunkedData = myData ? chunk(myData, 9) : [];
  const currentPageData = chunkedData[activePage - 1] ?? [];

  if (myData?.length === 0) {
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
          <p>작성한 게시글이 없어요!</p>
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
        <ContainerDiv>
          {currentPageData.map((post) => (
            <PostDiv
              key={post.id}
              onClick={() => {
                push.push(`/community/${post.id}`);
              }}
            >
              <img
                className="image"
                src={post.s3Url}
                alt={post.title}
                onerror="this.onerror=null; this.src='Group 2017.png';"
              />
              <div className="innerDiv">
                <div className="flexGap">
                  <p className="title">{post.title}</p>
                  <div className="flex">
                    <LikeHeartIcon />
                    <p className="title">{post.likecnt}</p>
                  </div>
                </div>

                <p className="description">{post.description}</p>
              </div>
            </PostDiv>
          ))}
        </ContainerDiv>
        <Pagination
          pages={chunkedData.map((_, i) => i + 1)}
          activePage={activePage}
          setPage={setActivePage}
        />
      </div>
    );
  }
};

export default MyWritePost;

const ContainerDiv = styled.div`
  display: flex;
  gap: 0px 24px;
  flex-wrap: wrap;
`;

const PostDiv = styled.div`
  margin-top: 20px;
  width: 384px;
  height: 252px;
  background-color: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
  align-items: center;
  .image {
    margin-top: 20px;
    width: 344px;
    height: 144px;
    object-fit: cover;
    border-radius: 4px;
  }
  .innerDiv {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    width: 90%;
  }
  .title {
    display: block;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    margin: 0px 0px 0px 0px;
  }
  .description {
    margin: 0px 0px 0px 0px;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    word-wrap: break-word;
    overflow-y: hidden;
    height: 30px;
  }
  .flexGap {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .flex {
    display: flex;
    gap: 10px;
  }
`;
