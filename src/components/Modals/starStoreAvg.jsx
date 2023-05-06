import { FlexRow } from '@components/Atoms/Flex';
import React from 'react';

export const StarStoreAvg = ({ starAvg }) => {
  const yellowStars = Math.floor(starAvg); // 올림된 노란 별 개수
  const isHalfStar = starAvg - yellowStars >= 0.5; // 반개 별이 필요
  const grayStars = 5 - yellowStars - (isHalfStar ? 1 : 0); // 남은 회색 별 개수

  return (
    <FlexRow style={{ gap: '2px' }}>
      {Array.from({ length: yellowStars }, (_, i) => (
        <svg
          key={`yellow-star-${i}`}
          width="14"
          height="13"
          viewBox="0 0 14 13"
          fill="#F9BD1A"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 0L8.5716 4.83688H13.6574L9.5429 7.82624L11.1145 12.6631L7 9.67376L2.8855 12.6631L4.4571 7.82624L0.342604 4.83688H5.4284L7 0Z" />
        </svg>
      ))}
      {isHalfStar && (
        <svg
          key="half-star"
          width="14"
          height="13"
          viewBox="0 0 14 13"
          fill="#F9BD1A"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 0L8.5716 4.83688H13.6574L9.5429 7.82624L11.1145 12.6631L7 9.67376L2.8855 12.6631L4.4571 7.82624L0.342604 4.83688H5.4284L7 0Z"
            clipPath="url(#half-star-clip)"
          />
          <clipPath id="half-star-clip">
            <rect x="0" y="0" width="7" height="13" />
          </clipPath>
        </svg>
      )}
      {Array.from({ length: grayStars }, (_, i) => (
        <svg
          key={`gray-star-${i}`}
          width="14"
          height="13"
          viewBox="0 0 14 13"
          fill="#C9CDD2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 0L8.5716 4.83688H13.6574L9.5429 7.82624L11.1145 12.6631L7 9.67376L2.8855 12.6631L4.4571 7.82624L0.342604 4.83688H5.4284L7 0Z"
            fill="#C9CDD2"
          />
        </svg>
      ))}
    </FlexRow>
  );
};
