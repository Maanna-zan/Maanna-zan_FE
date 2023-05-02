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
import { PostWrtingIcon } from '@components/Atoms/PostWrtingIcon';
import { PostArrow } from '@components/Atoms/PostArrow';
import { ReviewForm } from '@features/post/ReviewForm';
import { useGetStoredetail } from '../../hook/alcohol/useGetStore';
const Community = () => {
  const { query } = useRouter();
  const router = useRouter();
  const handleShareClick = async () => {
    try {
      await navigator.share({
        title,
        text,
        url,
      });
      alert('성공적으로 공유가 되었습니다.');
    } catch (err) {
      alert('공유중에 에러가 났습니다. 다시 시도해주십시오', err);
    }
  };
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
  console.log('카테고리 찾아 삼만리', postLikeMine);
  const { store, storeIsLoading } = useGetStoredetail({
    apiId: post.apiId,
  });
  console.log(' store 여기를 봐 여기를!!', store);
  // const [newPost, setNewPost] = useState({
  //   title: post?.title ?? '',
  //   description: post?.description ?? '',
  //   s3Url: post?.s3Url || '',
  //   taste: post?.null,
  //   service: post?.null,
  //   atmosphere: post?.null,
  //   satisfaction: post?.null,
  //   postStarAvg: post?.null,
  // });
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    s3Url: null,
    taste: '',
    service: '',
    atmosphere: '',
    satisfaction: '',
  });
  console.log('---postLikeMine', postLikeMine);
  const { updatePost } = useUpdatePost(postId);
  const { deletePost, onSuccess } = useDeletePost();
  const { likePost } = useLikePost();

  const [isEditMode, setIsEditMode] = useState(false);

  const deletePostHandler = (postId) => {
    const confirmed = window.confirm('정말로 삭제하시기를 원하십니까?');
    if (confirmed) {
      deletePost(postId);
    }
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
    setNewPost((prevPost) => ({
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
    setNewPost(newPost);
  };

  const handleStarHover = (hoveredStar) => {
    setHoveredStar(hoveredStar);
  };
  const checkFormValidity = () => {
    if (!post.title || !post.description) {
      alert('모든 항목에 체크해주세요');
      return false;
    } else if (
      !post.taste ||
      !post.service ||
      !post.atmosphere ||
      !post.satisfaction
    ) {
      alert('해당 가게의 평가를 작성해주세요.');
      return false;
    }

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkFormValidity()) {
      return;
    }
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
  // const [showReviewForm, setShowReviewForm] = useState(false);

  //카테고리
  const categoryNames = store.map((item) => item.category_name);
  // console.log('categoryNames', categoryNames);
  const indexAllName = categoryNames[0]?.lastIndexOf('>');
  const resultcategoryNames = categoryNames[0]?.slice(indexAllName + 2);
  // console.log('테스트카테고리', resultcategoryNames);

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
  console.log(handleShareClick, 'handleShareClick');

  if (postIsLoading || postIsLikeLoading) return <div>로딩중...</div>;
  return (
    <div>
      {isEditMode ? (
        <StBgeditMode style={{ paddingBottom: '200px' }}>
          <form
            onSubmit={handleSubmit}
            style={{
              paddingTop: '28px',
              // paddingBottom: '300px',
              overflow: 'hidden',
              boxSizing: 'border-box',
              height: '1200px',
              borderRadius: '10px',
            }}
          >
            <WebWrapper792px
              style={{
                margin: '0 auto',
                position: 'relative',
                overflow: 'hidden',
                boxSizing: 'border-box',
                backgroundColor: 'white',
                borderRadius: '10px',
                paddingBottom: ' 40px',
              }}
            >
              <FlexRow
                style={{
                  // alignItems: 'center',
                  gap: '20px',
                  padding: '14px',
                }}
              >
                <PostWrtingIcon />
                <FlexColumn
                  style={{
                    justifyContent: 'space-between',
                    // alignItems: 'center',
                    gap: '20px',
                    marginBottom: '16px',
                    width: '100%',
                  }}
                >
                  <FlexRow
                    style={{
                      justifyContent: 'space-between',
                      // alignItems: 'center',
                      gap: '20px',
                      marginBottom: '16px',
                    }}
                  >
                    <span
                      style={{
                        font: `var(--body1-bold) Pretendard sans-serif`,
                      }}
                    >
                      해당 가게의 평가를 수정해주세요.
                    </span>
                    <span
                      // onClick={() => setShowReviewForm(!showReviewForm)}
                      style={{
                        width: '24',
                        height: '24px',
                        // transform: showReviewForm
                        //   ? 'rotate(180deg)'
                        //   : 'rotate(0deg)',
                        // transition: 'all, 0.3s',
                      }}
                    >
                      {/* <PostArrow /> */}
                    </span>
                  </FlexRow>
                  {/* {showReviewForm && ( */}
                  <ReviewForm
                    post={post}
                    handleRatingChange={handleRatingChange}
                    handleStarClick={handleStarClick}
                    handleStarHover={handleStarHover}
                  />
                  {/* )} */}
                </FlexColumn>
              </FlexRow>
              <div
                style={{
                  font: `var(--head2-bold) Pretendard sans-serif`,
                  marginBottom: '28px',
                }}
              >
                <FlexRow
                  style={{
                    padding: '8px',
                    margin: '8px',
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
                      borderBottom: '1px solid gray',
                    }}
                    required
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
                  <span
                    style={{
                      cursor: ' pointer',
                      height: '24px',
                      marginRight: '2px',
                    }}
                    title={`만나잔에 오신걸 환영합니다!`}
                    url={`${apis}/community/${posts[query.id - 1]}/`}
                    text={`여기서 만나잔!! ${
                      posts[query.id - 1]?.storename
                    }친구가 공유한 가게 구경하기`}
                    onClick={() => handleShareClick}
                  >
                    <ShareBtn />
                  </span>
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
                  required
                />
              </FlexColumn>
              <div
                style={{
                  width: '100%',
                  // marginBottom: '50px',
                  // paddingBottom: '50px',
                }}
              ></div>
              <button
                style={{
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  float: 'right',
                  marginTop: '18px',
                }}
                type="submit"
              >
                <BoxTextReal
                  variant="redBox"
                  style={{
                    padding: '10px 20px',

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
        <div>
          <form
            style={{
              paddingTop: '28px',
              overflow: 'hidden',
              boxSizing: 'border-box',
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
                    <span
                      style={{
                        cursor: ' pointer',
                        height: '24px',
                        marginRight: '2px',
                      }}
                      title={`만나잔에 오신걸 환영합니다!`}
                      url={`${apis}/community/${posts[query.id - 1]}/`}
                      text={`여기서 만나잔!! ${
                        posts[query.id - 1]?.storename
                      }친구가 공유한 가게 구경하기`}
                      onClick={() => handleShareClick}
                    >
                      <ShareBtn />
                    </span>
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
                <FlexRow
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <FlexRow style={{ gap: '24px' }}>
                    <FlexRow style={{ gap: '10px' }}>
                      <div
                        style={{
                          font: `var(--body2-medium) Pretendard sans-serif`,
                        }}
                      >
                        좋아요
                      </div>
                      <div>{post?.likecnt}</div>
                    </FlexRow>
                    <FlexRow style={{ gap: '10px' }}>
                      <div
                        style={{
                          font: `var(--body2-medium) Pretendard sans-serif`,
                        }}
                      >
                        댓글
                      </div>
                      <div>{post?.commentList?.length}</div>
                    </FlexRow>
                    <FlexRow style={{ gap: '10px' }}>
                      <div
                        style={{
                          font: `var(--body2-medium) Pretendard sans-serif`,
                        }}
                      >
                        조회수
                      </div>
                      <div>{post?.viewCount}</div>
                    </FlexRow>
                  </FlexRow>
                  {/* 카테고리 */}
                  <BoxTextReal
                    size="nonePadding"
                    variant="grayBolderBox"
                    padding="4px 16px"
                    borderRadius="20px"
                    style={{
                      font: `var(--caption1-regular) Pretendard sans-serif`,
                    }}
                  >
                    {resultcategoryNames}
                  </BoxTextReal>
                </FlexRow>
              </div>

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
                  onClick={() => setIsEditMode(!isEditMode)}
                >
                  <div
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
                  onClick={() => deletePostHandler(postId)}
                >
                  <BoxTextReal
                    size="nonePadding"
                    variant="realDefaultBox"
                    style={{
                      font: `var( --body1-medium) Pretendard sans-serif`,
                    }}
                  >
                    <DeleteIcon />
                  </BoxTextReal>
                  <div
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
          <AddComment />
          <CommentsList style={{ paddingBottom: '80px' }}></CommentsList>
        </div>
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
