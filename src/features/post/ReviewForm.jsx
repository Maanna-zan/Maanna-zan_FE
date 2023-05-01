import React, { useState } from 'react';
import { FlexColumn, FlexRow } from '@components/Atoms/Flex';
import { Rating } from './Rating';
import { PostStar, PostStarChecked } from '@components/Atoms/PostStar';

import styled from 'styled-components';
export const ReviewForm = ({ post, handleRatingChange, handleStarClick }) => {
  const [hoveredStar, setHoveredStar] = useState(0);
  const starStyle = { cursor: 'pointer', transition: 'color 0.3s easeInOut' };
  return (
    <FlexColumn style={{ gap: '20px' }}>
      <FlexRow style={{ alignItems: 'center' }}>
        <span
          style={{
            font: `var(--body1-bold) Pretendard sans-serif`,
            marginRight: '48px',
          }}
        >
          별점
        </span>
        {[1, 2, 3, 4, 5].map((starValue) => (
          <span
            key={starValue}
            onClick={() => handleStarClick(starValue)}
            onMouseEnter={() => setHoveredStar(starValue)}
            onMouseLeave={() => setHoveredStar(0)}
          >
            {starValue <= (hoveredStar || post.postStarAvg) ? (
              <PostStarChecked
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s easeInOut',
                }}
              />
            ) : (
              <PostStar
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s easeInOut',
                }}
              />
            )}
          </span>
        ))}
      </FlexRow>
      <FlexColumn
        style={{
          gap: '20px',
          marginRight: '44px',
        }}
      >
        <span
          style={{
            font: `var(--body1-bold) Pretendard sans-serif`,
          }}
        >
          세부평가
        </span>
        <FlexRow style={{ justifyContent: 'space-between' }}>
          <FlexColumn>
            <StSpan>맛</StSpan>
            <Rating
              name="taste"
              value={post.taste}
              onChange={(value) => handleRatingChange('taste', value)}
            />
          </FlexColumn>
          <FlexColumn>
            <StSpan>서비스</StSpan>
            <Rating
              name="service"
              value={post.service}
              onChange={(value) => handleRatingChange('service', value)}
            />
          </FlexColumn>
          <FlexColumn>
            <StSpan>분위기</StSpan>
            <Rating
              name="atmosphere"
              value={post.atmosphere}
              onChange={(value) => handleRatingChange('atmosphere', value)}
            />
          </FlexColumn>
          <FlexColumn>
            <StSpan>만족도</StSpan>
            <Rating
              name="satisfaction"
              value={post.satisfaction}
              onChange={(value) => handleRatingChange('satisfaction', value)}
            />
          </FlexColumn>
        </FlexRow>
      </FlexColumn>
    </FlexColumn>
  );
};

const StSpan = styled.span`
  margin-bottom: 9px;
  font: var(--body1-medium) Pretendard sans-serif;
`;
