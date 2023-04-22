import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { apis } from '../../shared/axios';
import { cookies } from '../../shared/cookie';
import Alcohols from '.';
import AddComment from '@features/AddComment';
import CommentsList from '@features/CommentsList';
import { WebWrapper792px } from '@components/Atoms/Wrapper';
import { keys } from '@utils/createQueryKey';
import { useGetPost } from '../../hook/post/useGetPost';
import { FlexColumn, FlexRow } from '@components/Atoms/Flex';
import { BoxTextReal } from '@components/Atoms/BoxTextReal';
import { LikeHeartIcon } from '@components/Atoms/HeartIcon';
import { ShareBtn } from '@components/Atoms/ShareBtn';
import styled from 'styled-components';
import { ImgCenter, ImgWrapper792 } from '@components/Atoms/imgWrapper';
import ShareApiBtn from '../../hook/shareBtn/shareApiBtn';

const Community = () => {
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

  return (
    <div>
      <WebWrapper792px style={{ margin: '0 auto', position: 'relative' }}>
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              font: `var(--head2-bold) normal sans-serif`,

              marginBottom: '28px',
            }}
          >
            {posts[query.id]?.title}
          </div>

          <FlexRow
            style={{ justifyContent: 'space-between', marginBottom: '10px' }}
          >
            <FlexRow
              style={{
                gap: '10px',
                font: `var( --body1-medium) normal sans-serif`,
              }}
            >
              <div></div>
              <div>{posts[query.id]?.nickname}</div>
            </FlexRow>

            <div>{posts[query.id]?.createAt.substr(0, 10)}</div>
          </FlexRow>

          <FlexRow
            style={{ justifyContent: 'space-between', marginBottom: '10px' }}
          >
            <FlexRow style={{ gap: '24px' }}>
              <FlexRow style={{ gap: '10px' }}>
                <div>
                  <img
                    style={{ margin: '0px 8px 0px 0' }}
                    src="adress.png"
                    alt="주소아이콘"
                  />
                </div>
                <div>장소</div>
              </FlexRow>

              <div>{posts[query.id]?.storename}</div>
            </FlexRow>
            {/* 하트, 공유 묶음 확인 */}
            <FlexRow
              style={{
                gap: '20px',
                height: '24px',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LikeHeartIcon></LikeHeartIcon>
              <ShareApiBtn
                style={{ cursor: ' pointer' }}
                title={`만나잔에 오신걸 환영합니다!`}
                url={`${apis}/posts/${posts[query.id]}/`}
                text={`여기서 만나잔!! ${
                  posts[query.id]?.storename
                }친구가 공유한 가게 구경하기`}
              ></ShareApiBtn>
            </FlexRow>
          </FlexRow>
          <div style={{ width: '100%', marginBottom: '24px' }}>
            <ImgWrapper792>
              <ImgCenter
                src={
                  posts[query.id].s3Url
                    ? posts[query.id].s3Url
                    : '/noimage_282x248_.png'
                }
              ></ImgCenter>
            </ImgWrapper792>
          </div>
          <div style={{ width: '100%', marginBottom: '50px' }}>
            {posts[query.id]?.description}
          </div>

          <FlexRow style={{ justifyContent: 'space-between' }}>
            <FlexRow style={{ gap: '24px' }}>
              <FlexRow style={{ gap: '10px' }}>
                <div>좋아요</div>
                <div>{posts[query.id]?.likecnt}</div>
              </FlexRow>
              <FlexRow style={{ gap: '10px' }}>
                <div>댓글</div>
                {/* 댓글몇개?? 수정 */}
                <div>{posts[query.id]?.commentList.length}</div>
              </FlexRow>
              <FlexRow style={{ gap: '10px' }}>
                <div>조회수</div>
                <div>{posts[query.id]?.viewCount}</div>
              </FlexRow>
            </FlexRow>
            {/* 카테고린데 카테고리 데이터없음 */}
            <BoxTextReal size="nonePadding" variant="grayBolderBox">
              카테고리
            </BoxTextReal>
          </FlexRow>
        </div>
        <AddComment />
        <CommentsList />

        <FlexColumn
          style={{
            gap: '24px',
            position: 'absolute',
            top: '200px',
            right: '-110px',
            border: '1px solid #eee',
            padding: '4px',
            overflow: 'hidden',
            boxSizing: 'border-box',
            borderRadius: '8px',
            boxSizing: 'border-box',
          }}
        >
          <FlexColumn style={{ gap: '10px' }}>
            <div
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <BoxTextReal
                size="nonePadding"
                variant="realDefaultBox"
                style={{}}
              >
                <img
                  style={{ margin: '0px 0' }}
                  src="editBtn.png"
                  alt="주소아이콘"
                ></img>
              </BoxTextReal>
            </div>
            <div>수정하기</div>
          </FlexColumn>
          <FlexColumn
            style={{
              gap: '10px',
            }}
          >
            <BoxTextReal size="nonePadding" variant="realDefaultBox" style={{}}>
              <img
                style={{ margin: '0px 0' }}
                src="deleteBtn.png"
                alt="주소아이콘"
              ></img>
            </BoxTextReal>
            <div>삭제하기</div>
          </FlexColumn>
        </FlexColumn>
      </WebWrapper792px>
    </div>
  );
};

export default Community;

const StProfile = styled.div`
  background-color: aliceblue;
  width: 24px;
  height: 24px;
  border-radius: 50px;
`;
