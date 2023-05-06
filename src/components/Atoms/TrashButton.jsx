import React from 'react';
import styled from 'styled-components';
import { LightTheme } from '@components/Themes/theme';

export const TrashButton = ({ onClick }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M2 4.60059H3.77778H18"
        stroke="#9EA4AA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.2223 4.6V17.2C16.2223 17.6774 16.035 18.1352 15.7016 18.4728C15.3682 18.8104 14.916 19 14.4445 19H5.55561C5.08411 19 4.63193 18.8104 4.29853 18.4728C3.96513 18.1352 3.77783 17.6774 3.77783 17.2V4.6M6.4445 4.6V2.8C6.4445 2.32261 6.6318 1.86477 6.9652 1.52721C7.2986 1.18964 7.75078 1 8.22228 1H11.7778C12.2493 1 12.7015 1.18964 13.0349 1.52721C13.3683 1.86477 13.5556 2.32261 13.5556 2.8V4.6"
        stroke="#9EA4AA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.22217 9.09961V14.4996"
        stroke="#9EA4AA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.7778 9.09961V14.4996"
        stroke="#9EA4AA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const ShareButton = ({ onClick }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M15.3337 6.4C16.8064 6.4 18.0003 5.19117 18.0003 3.7C18.0003 2.20883 16.8064 1 15.3337 1C13.8609 1 12.667 2.20883 12.667 3.7C12.667 5.19117 13.8609 6.4 15.3337 6.4Z"
        stroke="#9EA4AA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.66667 12.6998C6.13943 12.6998 7.33333 11.491 7.33333 9.9998C7.33333 8.50864 6.13943 7.2998 4.66667 7.2998C3.19391 7.2998 2 8.50864 2 9.9998C2 11.491 3.19391 12.6998 4.66667 12.6998Z"
        stroke="#9EA4AA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.3337 18.9996C16.8064 18.9996 18.0003 17.7908 18.0003 16.2996C18.0003 14.8084 16.8064 13.5996 15.3337 13.5996C13.8609 13.5996 12.667 14.8084 12.667 16.2996C12.667 17.7908 13.8609 18.9996 15.3337 18.9996Z"
        stroke="#9EA4AA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.96875 11.3584L13.0399 14.9404"
        stroke="#9EA4AA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.031 5.05859L6.96875 8.64059"
        stroke="#9EA4AA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
