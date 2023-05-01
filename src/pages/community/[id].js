import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apis } from '../../shared/axios';
import { cookies } from '../../shared/cookie';
import Alcohols from '.';
import AddComment from '@features/AddComment';
import CommentsList from '@features/CommentsList';
import { WebWrapper792px } from '@components/Atoms/Wrapper';
import { keys } from '@utils/createQueryKey';
import { useGetPost, useGetLikePost } from '../../hook/post/useGetPost';
import { FlexColumn, FlexRow } from '@components/Atoms/Flex';
import { BoxTextReal } from '@components/Atoms/BoxTextReal';
import { LikeHeartIcon, DisLikeHeartIcon } from '@components/Atoms/HeartIcon';
import { ShareBtn } from '@components/Atoms/ShareBtn';
import styled from 'styled-components';
import { ImgCenter, ImgWrapper792 } from '@components/Atoms/imgWrapper';
import ShareApiBtn from '../../hook/shareBtn/shareApiBtn';
import { AderessIcon } from '@components/Atoms/AderessIcon';
import { AderessMarker } from '@components/Atoms/AderessMarker';
import { DeleteIcon } from '@components/Atoms/DeleteIcon';
import { useDeletePost } from '../../hook/post/useDeletePost';
import { useUpdatePost } from '../../hook/post/useUpdatePost';
import { useLikePost } from '../../hook/useLikes';
import { LightTheme } from '@components/Themes/theme';
import { ButtonText } from '@components/Atoms/Button';
const Community = () => {
  const { query } = useRouter();
  const router = useRouter();

  const { id } = router.query;
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['GET_COMMUNITYDETAIL'],
    queryFn: async () => {
      const { data } = await apis.get(`/posts/${query.id}`, {});

      return data.data;
    },
    //enabled: -> 참일 때 실행시켜준다.
    enabled: Boolean(query.id),
    onSuccess: () => {},
  });
  const [isUpdated, setIsUpdated] = useState(false);

  const { posts, postIsLoading } = useGetPost();
  const { postsLike, postIsLikeLoading } = useGetLikePost();

  let potLikeMatch = [];
  if (postsLike && postsLike.data && postsLike.data.posts) {
    potLikeMatch = postsLike.data.posts;
  }

  const postId = query.id;
  const post = posts.find((p) => p.id === Number(postId)) || {};
  const postLikeMine = potLikeMatch.find((p) => p.id === Number(postId)) || {};

  const [newPost, setNewPost] = useState({
    title: post?.title ?? '',
    description: post?.description ?? '',
    s3Url: post?.s3Url || '',
    taste: post?.null,
    service: post?.null,
    atmosphere: post?.null,
    satisfaction: post?.null,
    postStarAvg: post?.null,
  });
  console.log('---postLikeMine', postLikeMine);
  const { updatePost } = useUpdatePost(postId);
  const { deletePost, onSuccess } = useDeletePost();
  const { likePost } = useLikePost();

  const [isEditMode, setIsEditMode] = useState(false);

  const deletePostHandler = (postId) => {
    deletePost(postId);
  };

  const [like, setLike] = useState(postLikeMine.like);

  const likePostHandler = async (postId) => {
    try {
      await likePost(postId);
      setLike(!like);
    } catch (error) {
      console.error(error);
    }
  };

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    setNewPost((pre) => ({
      ...pre,
      s3Url: file ? formData : null,
    }));

    const imageUrl = URL.createObjectURL(file);
    document.getElementById('image-preview').src = imageUrl;
  };
  const handleRatingChange = (name, value) => {
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value[name],
    }));
    console.log('setPosthandleRatingChange', post);
  };
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleStarClick = (clickedStar) => {
    const newPost = {
      ...post,
      postStarAvg: clickedStar,
    };
    setPost(newPost);
  };

  const handleStarHover = (hoveredStar) => {
    setHoveredStar(hoveredStar);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newPost.title);
    formData.append('description', newPost.description);
    formData.append('taste', post.taste);
    formData.append('service', post.service);
    formData.append('atmosphere', post.atmosphere);
    formData.append('satisfaction', post.satisfaction);

    if (newPost?.s3Url) {
      for (const [key, value] of newPost.s3Url.entries()) {
        formData.append(key, value);
      }
    }
    try {
      await updatePost(formData);
      setIsEditMode(false);
      alert('게시물 내용이 변경되었습니다.');
      setNewPost({
        title: newPost.title,
        description: newPost.description,
        s3Url: newPost.s3Url || '',
      }); // 새로운 데이터로 상태 업데이트
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isUpdated) {
      setNewPost({
        title: post?.title ?? '',
        description: post?.description ?? '',
        s3Url: post?.s3Url || '',
      });
      setIsUpdated(false);
    }
  }, [isUpdated]);
  if (postIsLoading || postIsLikeLoading) return <div>로딩중...</div>;
  const [showReviewForm, setShowReviewForm] = useState(false);
  return (
    <div>
      {isEditMode ? (
        <StBgeditMode>
          <form
            onSubmit={handleSubmit}
            style={{
              paddingTop: '28px',
              overflow: 'hidden',
              boxSizing: 'border-box',
              height: `calc(100vh - ${394}px)`,
            }}
          >
            <WebWrapper792px
              style={{
                margin: '0 auto',
                position: 'relative',
                backgroundColor: 'white',
                borderRadius: '10px',
              }}
            >
              {showReviewForm && (
                <ReviewForm
                  post={post}
                  handleRatingChange={handleRatingChange}
                  handleStarClick={handleStarClick}
                  handleStarHover={handleStarHover}
                />
              )}
              <div
                style={{
                  font: `var(--head2-bold) Pretendard sans-serif`,
                  marginBottom: '28px',
                }}
              >
                <FlexRow
                  style={{
                    padding: '8px',
                    overflow: 'hidden',
                    boxSizing: 'border-box',
                  }}
                >
                  <label htmlFor="title">제목 : </label>
                  <input
                    style={{
                      width: '60%',
                      padding: 'auto 4px',
                      overflow: 'hidden',
                      boxSizing: 'border-box',
                    }}
                    type="text"
                    id="title"
                    name="title"
                    value={newPost?.title ?? ''}
                    onChange={(e) =>
                      setNewPost({ ...newPost, title: e.target.value })
                    }
                  />
                </FlexRow>
              </div>
              <FlexRow
                style={{
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                }}
              >
                <FlexRow
                  style={{
                    gap: '10px',
                    font: `var( --body1-medium) Pretendard sans-serif`,
                  }}
                >
                  <div></div>
                  <div>{post?.nickname}</div>
                </FlexRow>

                <div>{posts[query.id - 1]?.createAt.substr(0, 10)}</div>
              </FlexRow>
              <FlexRow
                style={{
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                }}
              >
                <FlexRow style={{ gap: '24px', alignItems: 'center' }}>
                  <FlexRow style={{ gap: '10px' }}>
                    <div>
                      <AderessMarker />
                    </div>
                    <div>장소</div>
                  </FlexRow>

                  <div>{post?.storename}</div>
                </FlexRow>
                <FlexRow
                  style={{
                    gap: '20px',
                    height: '24px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '2px',
                  }}
                >
                  <span
                    onClick={() => likePostHandler(postId)}
                    style={{ cursor: 'pointer' }}
                  >
                    {like ? <LikeHeartIcon /> : <DisLikeHeartIcon />}
                  </span>
                  <ShareApiBtn
                    style={{
                      cursor: ' pointer',
                      height: '24px',
                      marginRight: '2px',
                    }}
                    title={`만나잔에 오신걸 환영합니다!`}
                    url={`${apis}/posts/${posts[query.id - 1]}/`}
                    text={`여기서 만나잔!! ${
                      posts[query.id - 1]?.storename
                    }친구가 공유한 가게 구경하기`}
                  ></ShareApiBtn>
                </FlexRow>
              </FlexRow>
              <div style={{ width: '100%', margin: '24px auto' }}>
                <ImgWrapper792>
                  <ImgCenter
                    src={
                      newPost?.s3Url
                        ? URL.createObjectURL(newPost.s3Url.get('file'))
                        : post?.s3Url
                    }
                    alt="uploaded image"
                    id="image-preview"
                  />
                </ImgWrapper792>
              </div>
              <FlexRow
                style={{
                  marginTop: '8px',
                  marginLeft: '4px',
                  alignItems: 'center',
                }}
              >
                <label htmlFor="image">이미지:</label>

                <input
                  style={{ width: '60%' }}
                  type="file"
                  name="s3Url"
                  onChange={changeFileHandler}
                  id="s3Url"
                  value={post?.s3Url ? post?.s3Url.name : ''}
                />
              </FlexRow>
              <FlexColumn
                style={{
                  marginTop: '8px',
                }}
              >
                <label
                  htmlFor="description"
                  style={{
                    font: `var(--label1-regular) Pretendard sans-serif`,
                    marginBottom: '4px',
                    marginLeft: '4px',
                  }}
                >
                  내용
                </label>
                <textarea
                  style={{
                    margin: '4px 8px',
                    borderBottom: `1px solid ${LightTheme.GRAY_400}`,
                    font: `var(--label1-regular) Pretendard sans-serif`,

                    borderRadius: '8px',
                    height: '80px',
                  }}
                  type="text"
                  id="description"
                  name="description"
                  value={newPost?.description ?? ''}
                  onChange={(e) =>
                    setNewPost({ ...newPost, description: e.target.value })
                  }
                />
              </FlexColumn>
              <div
                style={{
                  width: '100%',
                  marginBottom: '50px',
                  paddingBottom: '50px',
                }}
              ></div>
              <button
                style={{
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  float: 'right',
                }}
                type="submit"
              >
                <BoxTextReal
                  variant="redBox"
                  style={{
                    padding: '10px 20px',
                    marginBottom: '28px',
                    border: 'none',
                    color: 'white',
                    borderRadius: '10px',
                  }}
                >
                  수정 완료
                </BoxTextReal>
              </button>
            </WebWrapper792px>
          </form>
        </StBgeditMode>
      ) : (
        <form
          style={{
            paddingTop: '28px',
            overflow: 'hidden',
            boxSizing: 'border-box',
            height: `calc(100vh - ${394}px)`,
          }}
        >
          <WebWrapper792px style={{ margin: '0 auto', position: 'relative' }}>
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  font: `var(--head2-bold) Pretendard sans-serif`,

                  marginBottom: '28px',
                }}
              >
                {post?.title}
              </div>
              <FlexRow
                style={{
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                }}
              >
                <FlexRow
                  style={{
                    gap: '10px',
                    font: `var( --body1-medium) Pretendard sans-serif`,
                  }}
                >
                  <div></div>
                  <div>{post?.nickname}</div>
                </FlexRow>

                {/* <div>{post?.createAt.substr(0, 10)}</div> */}
              </FlexRow>
              <FlexRow
                style={{
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                }}
              >
                <FlexRow style={{ gap: '24px' }}>
                  <FlexRow style={{ gap: '10px' }}>
                    <div>
                      <AderessMarker />
                    </div>
                    <div>장소</div>
                  </FlexRow>

                  <div>{post?.storename}</div>
                </FlexRow>
                <FlexRow
                  style={{
                    gap: '20px',
                    height: '24px',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    onClick={() => likePostHandler(postId)}
                    style={{ cursor: 'pointer' }}
                  >
                    {like ? <LikeHeartIcon /> : <DisLikeHeartIcon />}
                  </span>
                  <ShareApiBtn
                    style={{ cursor: ' pointer' }}
                    title={`만나잔에 오신걸 환영합니다!`}
                    url={`${apis}/posts/${post?.id}/`}
                    text={`여기서 만나잔!! ${post?.storename}친구가 공유한 가게 구경하기`}
                  ></ShareApiBtn>
                </FlexRow>
              </FlexRow>
              <div style={{ width: '100%', marginBottom: '24px' }}>
                <ImgWrapper792>
                  <ImgCenter
                    src={post?.s3Url ? post?.s3Url : '/noimage_282x248_.png'}
                  ></ImgCenter>
                </ImgWrapper792>
              </div>
              <div style={{ width: '100%', marginBottom: '50px' }}>
                {post?.description}
              </div>
              <FlexRow style={{ justifyContent: 'space-between' }}>
                <FlexRow style={{ gap: '24px' }}>
                  <FlexRow style={{ gap: '10px' }}>
                    <div>좋아요</div>
                    <div>{post?.likecnt}</div>
                  </FlexRow>
                  <FlexRow style={{ gap: '10px' }}>
                    <div>댓글</div>
                    <div>{post?.commentList?.length}</div>
                  </FlexRow>
                  <FlexRow style={{ gap: '10px' }}>
                    <div>조회수</div>
                    <div>{post?.viewCount}</div>
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
                width: '80px',
                height: '192px',
                gap: '24px',
                position: 'absolute',
                top: '200px',
                right: '-110px',
                border: '1px solid #eee',
                padding: '8px auto',
                borderRadius: '8px',
                boxSizing: 'border-box',
                justifyContent: 'space-around',
              }}
            >
              <FlexColumn
                style={{
                  gap: '4px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  textAlign: 'center',
                }}
              >
                <div
                  onClick={() => setIsEditMode(!isEditMode)}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    textAlign: 'center',
                    font: `var( --body1-medium) Pretendard sans-serif`,
                    cursor: 'pointer',
                  }}
                >
                  <BoxTextReal
                    size="nonePadding"
                    variant="realDefaultBox"
                    style={{}}
                  >
                    <AderessIcon />
                  </BoxTextReal>
                </div>
                <div
                  type="submit"
                  style={{
                    color: `${LightTheme.FONT_SECONDARY}`,
                    cursor: 'pointer',
                  }}
                >
                  수정하기
                </div>
              </FlexColumn>
              <FlexColumn
                style={{
                  gap: '4px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                <BoxTextReal
                  size="nonePadding"
                  variant="realDefaultBox"
                  style={{ font: `var( --body1-medium) Pretendard sans-serif` }}
                >
                  <DeleteIcon />
                </BoxTextReal>
                <div
                  onClick={() => deletePostHandler(postId)}
                  style={{
                    color: `${LightTheme.FONT_SECONDARY}`,
                    cursor: 'pointer',
                  }}
                >
                  삭제하기
                </div>
              </FlexColumn>
            </FlexColumn>
          </WebWrapper792px>
        </form>
      )}
    </div>
  );
};

export default Community;

const StBgeditMode = styled.div`
  background-color: ${LightTheme.GRAY_50};
`;

const StProfile = styled.div`
  background-color: aliceblue;
  width: 24px;
  height: 24px;
  border-radius: 50px;
`;
