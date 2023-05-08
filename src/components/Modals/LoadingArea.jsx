import { FlexColumn } from '@components/Atoms/Flex';
import { Loading } from '@components/Atoms/Loading';
import styled, { keyframes } from 'styled-components';
import { LightTheme } from '@components/Themes/theme';
import React from 'react';
const spinAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const SpinningLoading = styled.span`
  animation: ${spinAnimation} 1s infinite linear;
`;
export const LoadingArea = () => {
  return (
    <FlexColumn
      style={{
        height: 'calc(100vh - 80px)',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <SpinningLoading>
        <Loading></Loading>
      </SpinningLoading>
      <span
        style={{
          color: `${LightTheme.FONT_PRIMARY}`,
          font: `var(--title2-semibold) Pretendard sans-serif`,
          marginBottom: '30px',
        }}
      >
        로딩중이에요.
      </span>
    </FlexColumn>
  );
};
