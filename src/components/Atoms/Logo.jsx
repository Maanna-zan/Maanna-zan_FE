import React from 'react';
import Link from 'next/link';
export const Logo = () => {
  return (
    <Link href="/">
      <img
        src="logo.png"
        alt="logo"
        style={{ width: '140px', height: '38px' }}
      />
    </Link>
  );
};
