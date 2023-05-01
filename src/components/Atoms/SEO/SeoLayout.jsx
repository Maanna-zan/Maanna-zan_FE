import { Footer } from '@components/Organisms/Footer';
import { Header } from '@components/Organisms/Header';
import React, { Children } from 'react';
import styled from 'styled-components';
import { WebWrapper } from '../Wrapper';

export const SeoLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Wrapper>
        <Footer />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
`;
