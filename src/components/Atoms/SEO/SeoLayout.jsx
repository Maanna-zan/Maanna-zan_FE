import { Footer } from '@components/Organisms/Footer';
import { Header } from '@components/Organisms/Header';
import React, { Children } from 'react';

export const SeoLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
