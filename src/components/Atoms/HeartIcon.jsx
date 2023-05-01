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
export const LikeCircleHeartIcon = () => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="15" cy="15" r="15" fill="white" />
      <path
        d="M21.7663 10.2377C21.3753 9.84531 20.9111 9.53404 20.4002 9.32168C19.8893 9.10931 19.3417 9 18.7887 9C18.2357 9 17.6881 9.10931 17.1772 9.32168C16.6663 9.53404 16.2021 9.84531 15.8112 10.2377L14.9998 11.0517L14.1884 10.2377C13.3987 9.44548 12.3277 9.00041 11.2109 9.00041C10.0941 9.00041 9.02303 9.44548 8.23334 10.2377C7.44365 11.0299 7 12.1044 7 13.2248C7 14.3452 7.44365 15.4196 8.23334 16.2119L9.0447 17.0258L14.9998 23L20.9549 17.0258L21.7663 16.2119C22.1574 15.8197 22.4677 15.354 22.6794 14.8415C22.891 14.3289 23 13.7796 23 13.2248C23 12.67 22.891 12.1206 22.6794 11.6081C22.4677 11.0956 22.1574 10.6299 21.7663 10.2377Z"
        fill="#FF4840"
      />
    </svg>
  );
};
export const DisLikeCircleHeartIcon = () => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="15" cy="15" r="15" fill="white" />
      <path
        d="M21.7663 10.2377C21.3753 9.84531 20.9111 9.53404 20.4002 9.32168C19.8893 9.10931 19.3417 9 18.7887 9C18.2357 9 17.6881 9.10931 17.1772 9.32168C16.6663 9.53404 16.2021 9.84531 15.8112 10.2377L14.9998 11.0517L14.1884 10.2377C13.3987 9.44548 12.3277 9.00041 11.2109 9.00041C10.0941 9.00041 9.02303 9.44548 8.23334 10.2377C7.44365 11.0299 7 12.1044 7 13.2248C7 14.3452 7.44365 15.4196 8.23334 16.2119L9.0447 17.0258L14.9998 23L20.9549 17.0258L21.7663 16.2119C22.1574 15.8197 22.4677 15.354 22.6794 14.8415C22.891 14.3289 23 13.7796 23 13.2248C23 12.67 22.891 12.1206 22.6794 11.6081C22.4677 11.0956 22.1574 10.6299 21.7663 10.2377Z"
        stroke="#FF4840"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    fill: #ff385c;
  }
  box-sizing: border-box;
  /* margin: 6px; */
`;

const StLiked = styled.path`
  width: 24px;
  height: 24px;
`;
