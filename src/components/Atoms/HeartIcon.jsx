import React from 'react';
import styled from 'styled-components';
export const LikeHeartIcon = () => {
  return (
    <StSpan fill="#ff385c " className="likedHeart">
      <StSvg fill="#ff385c " className="primary" stroke="#ff385c">
        <StLiked d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></StLiked>
      </StSvg>
    </StSpan>
  );
};
export const DisLikeHeartIcon = () => {
  return (
    <StSpan fill="#ff385c " className="likedHeart">
      <StSvg fill="current" className="primary" stroke="#ff385c">
        <StLiked d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></StLiked>
      </StSvg>
    </StSpan>
  );
};

const StSpan = styled.span`
  fill: none;
  display: block;
  width: 24px;
  height: 24px;
  width: current;
  height: current;

  box-sizing: border-box;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2px;
`;
const StSvg = styled.svg`
  width: 24px;
  height: 24px;

  box-sizing: border-box;
  margin: 6px;
`;

const StLiked = styled.path`
  width: 24px;
  height: 24px;
`;
