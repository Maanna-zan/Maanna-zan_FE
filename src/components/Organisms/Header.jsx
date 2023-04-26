import React from 'react';
import { LinkToNav } from '@components/Molecules/LinkToNav';
import { WebWrapper } from '@components/Atoms/Wrapper';
import { Logo } from '@components/Atoms/Logo';
import { FlexRow } from '@components/Atoms/Flex';
import { MainLogo } from '@components/Atoms/MainLogo';

export const Header = () => {
  return (
    <>
      <WebWrapper>
        <FlexRow
          style={{
            justifyContent: 'space-between',
            height: '80px',
            alignItems: 'center',
          }}
        >
          <MainLogo />
          <LinkToNav />
        </FlexRow>
      </WebWrapper>
    </>
  );
};
