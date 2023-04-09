import React from 'react';
import { ButtonText } from '@components/Atoms/Button';
import Link from 'next/link';

export const LinkToNav = () => {
  return (
    <nav>
      <Link href="/alcohols">
        <ButtonText variant="borderColorWhite" label={'리스트'}></ButtonText>
      </Link>
      <Link href="/map">
        <ButtonText variant="borderColorWhite" label={'탐색'}></ButtonText>
      </Link>
      <Link href="/community">
        <ButtonText variant="borderColorWhite" label={'커뮤니티'}></ButtonText>
      </Link>
      <Link href="/signin">
        <ButtonText variant="borderColorWhite" label={'로그인'}></ButtonText>
      </Link>
      <Link href="/signup">
        <ButtonText variant="borderColorWhite" label={'회원가입'}></ButtonText>
      </Link>
    </nav>
  );
};
