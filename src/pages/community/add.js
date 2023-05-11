import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { cookies } from '../../shared/cookie';
import { apis } from '../../shared/axios';
import { FlexColumn, FlexRow } from '@components/Atoms/Flex';
import { WebWrapper792px } from '@components/Atoms/Wrapper';
import { ReviewForm } from '@features/post/ReviewForm';
import { PostWrtingIcon } from '@components/Atoms/PostWrtingIcon';
import { PostArrow } from '@components/Atoms/PostArrow';
import { LightTheme } from '@components/Themes/theme';
import { BoxTextReal } from '@components/Atoms/BoxTextReal';
const AddPostForm = () => {
  const router = useRouter();
  const apiIdReal = router.query.storeId;

  const [post, setPost] = useState({
    title: '',
    description: '',
    s3Url: '',
    taste: null,
    service: null,
    atmosphere: null,
    satisfaction: null,
    postStarAvg: null,
  });

  const access_token = cookies.get('access_token');
  const refresh_token = cookies.get('refresh_token');

  const { mutate, isSuccess, onMutate, onSuccess } = useMutation({
    mutationFn: async (payload) => {
      const data = await apis.post(`/posts/${apiIdReal}`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          access_token: `${access_token}`,
        },
      });
      return data;
    },
    onSuccess: (data) => {
      alert('게시글 작성을 하셨습니다!');
      router.push('/community');
    },
  });
  const [hoveredStar, setHoveredStar] = useState(0);

  const [currentTitleLength, setCurrentTitleLength] = useState(
    setPost?.title ? setPost?.title?.length : 0,
  );
  const [currentDesLength, setCurrentDesLength] = useState(
    setPost?.description ? setPost?.description?.length : 0,
  );
  const [maxTitleLength] = useState(50);
  const [maxDesLength] = useState(500);

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

  // const changeInputHandler = (e) => {
  //   const { value, name } = e.target;
  //   setPost((pre) => ({ ...pre, [name]: value }));
  // };

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file); // 이미지를 file 키로 추가
    setPost((pre) => ({ ...pre, s3Url: formData }));
  };
  const handleRatingChange = (name, value) => {
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value[name],
    }));
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
    } else if (false) {
      alert('모든 항목에 체크해주세요');
    }

    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkFormValidity()) {
      return;
    }

    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('description', post.description);
    formData.append('taste', post.taste);
    formData.append('service', post.service);
    formData.append('atmosphere', post.atmosphere);
    formData.append('satisfaction', post.satisfaction);

    if (post.s3Url) {
      for (const [key, value] of post.s3Url.entries()) {
        formData.append(key, value);
      }
    }
    mutate(formData);
  };
  const [showReviewForm, setShowReviewForm] = useState(false);

  return (
    <div style={{ backgroundColor: `${LightTheme.GRAY_50}` }}>
      <WebWrapper792px style={{ margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <FlexColumn style={{ gap: '20px', paddingTop: '40px' }}>
            <FlexColumn style={{}}>
              <BoxTextReal size="1624" variant="grayBolderBox">
                <FlexRow
                  style={{
                    // alignItems: 'center',
                    gap: '20px',
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
                        {post?.storename} 해당 가게의 평가를 작성해주세요.
                      </span>
                      <span
                        onClick={() => setShowReviewForm(!showReviewForm)}
                        style={{
                          width: '24',
                          height: '24px',
                          transform: showReviewForm
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)',
                          transition: 'all, 0.3s',
                        }}
                      >
                        <PostArrow />
                      </span>
                    </FlexRow>
                    {showReviewForm && (
                      <ReviewForm
                        post={post}
                        handleRatingChange={handleRatingChange}
                        handleStarClick={handleStarClick}
                        handleStarHover={handleStarHover}
                      />
                    )}
                  </FlexColumn>
                </FlexRow>
              </BoxTextReal>
            </FlexColumn>
            <span style={{ textAlign: 'right' }}>
              {currentTitleLength}/{maxTitleLength}
            </span>
            <input
              type="text"
              value={post.title}
              name="title"
              onChange={(e) => {
                const trimmedValue = e.target.value.slice(0, maxTitleLength);
                setPost({ ...post, title: trimmedValue });
                setCurrentTitleLength(trimmedValue.length);
              }}
              placeholder="제목을 작성해주세요"
              required
              style={{
                borderBottom: '1px solid #eee',
                height: '50px',
                border: '1px solid #eee',
                padding: '16px',
                borderRadius: '10px',
                overflow: 'hidden',
                boxSizing: 'border-box',
                backgroundColor: 'white',
              }}
            />
            {/* 내용 입력란 */}
            <span style={{ textAlign: 'right' }}>
              {currentDesLength}/{maxDesLength}
            </span>
            <textarea
              type="text"
              style={{
                border: '1px solid #eee',
                padding: '16px',
                borderRadius: '10px',
                overflow: 'hidden',
                boxSizing: 'border-box',
                borderRadius: '8px',
                height: '300px',
                marginBottom: '40px',
                width: '100%',
              }}
              value={post.description}
              name="description"
              onChange={(e) => {
                const trimmedValue2 = e.target.value.slice(0, maxDesLength);
                setPost({ ...setPost, description: trimmedValue2 });
                setCurrentDesLength(trimmedValue2.length);
              }}
              required
              placeholder="내용을 입력해주세요"
            />
            <FlexRow
              style={{
                gap: '24px',
                marginBottom: '50px',
                justifyContent: 'space-between',
              }}
            >
              <input
                type="file"
                name="s3Url"
                onChange={changeFileHandler}
                style={{ width: '40%', marginBottom: '30px' }}
              />
              {/* <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: 'white',
              border: 'red 1px solid',
              color: 'red',
              borderRadius: '10px',
            }}
          >
            임시저장
          </button> */}
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
                  작성하기
                </BoxTextReal>
              </button>
            </FlexRow>
          </FlexColumn>
        </form>
      </WebWrapper792px>
    </div>
  );
};
export default AddPostForm;
