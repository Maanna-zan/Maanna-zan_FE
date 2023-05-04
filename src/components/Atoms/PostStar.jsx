import React from 'react';
import styled from 'styled-components';

export const PostStar = () => {
  return (
    <StStar
      width="28"
      height="26"
      viewBox="0 0 28 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <SthoverStar
        d="M14 0L17.1432 9.67376H27.3148L19.0858 15.6525L22.229 25.3262L14 19.3475L5.77101 25.3262L8.9142 15.6525L0.685208 9.67376H10.8568L14 0Z"
        fill="#C9CDD2"
      />
    </StStar>
  );
};
const SthoverStar = styled.path`
  &:hover {
    fill: #f9bd1a;
  }
`;
const StStar = styled.svg`
  cursor: pointer;
  transition: color 0.3s ease-in-out;
`;

export const PostStarChecked = () => {
  return (
    <StStar
      width="28"
      height="26"
      viewBox="0 0 28 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 0L17.1432 9.67376H27.3148L19.0858 15.6525L22.229 25.3262L14 19.3475L5.77101 25.3262L8.9142 15.6525L0.685208 9.67376H10.8568L14 0Z"
        fill="#F9BD1A"
      />
    </StStar>
  );
};

export const MinStar = () => {
  return (
    <svg
      width="14px"
      height="13px"
      viewBox="0 0 14 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 0L8.5716 4.83688H13.6574L9.5429 7.82624L11.1145 12.6631L7 9.67376L2.8855 12.6631L4.4571 7.82624L0.342604 4.83688H5.4284L7 0Z"
        fill="#F9BD1A"
      />
    </svg>
  );
};
