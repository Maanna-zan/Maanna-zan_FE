import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useState } from 'react';
import GetmyPost from './GetmyPost';
import GetMyAlcohols from './GetMyAlcohols';
import { ButtonText } from '@components/Atoms/Button';

const FindPost = () => {
  const push = useRouter();
  const [likeList, setLikeList] = useState('alcohol');

  return (
    <div>
      {likeList === 'alcohol' ? (
        <div>
          <div style={{ display: 'flex', gap: '15px', padding: '20px 0px' }}>
            <ButtonText
              size="xxsm"
              variant="primary"
              label="리스트"
              onClick={() => {
                setLikeList('alcohol');
              }}
            />
            <ButtonText
              size="xxsm"
              variant="basic"
              label="게시글"
              onClick={() => {
                setLikeList('posts');
              }}
            />
          </div>

          <GetMyAlcohols />
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <ButtonText
              size="xxsm"
              variant="basic"
              label="리스트"
              onClick={() => {
                setLikeList('alcohol');
              }}
            />
            <ButtonText
              size="xxsm"
              variant="primary"
              label="게시글"
              onClick={() => {
                setLikeList('posts');
              }}
            />
          </div>
          <GetmyPost />
        </div>
      )}
    </div>
  );
};

export default FindPost;
