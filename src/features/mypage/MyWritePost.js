import React from 'react';
import styled from 'styled-components';

const MyWritePost = (data) => {
  console.log('mywrutedata', data.data.posts);
  const myData = data.data.posts;

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
              push.push('/community');
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
      <ContainerDiv>
        {myData.map((post) => (
          <PostDiv key={post.id}>
            <img
              className="image"
              src="{post.s3URl}"
              alt="내가 쓴 게시물"
              onerror="this.onerror=null; this.src='Group 2017.png';"
            />
            <div className="innerDiv">
              <p className="title">{post.title}</p>
              <p className="description">{post.description}</p>
            </div>
          </PostDiv>
        ))}
      </ContainerDiv>
    );
  }
};

export default MyWritePost;

const ContainerDiv = styled.div`
  display: flex;
  gap: 24px;
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
  }
`;
