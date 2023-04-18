import React from 'react';
import { WebWrapper } from '@components/Atoms/Wrapper';
import { ButtonText } from '@components/Atoms/Button';
import { useRouter } from 'next/router';

export const StoreListTabMenu = ({
  setActiveTab,
  activeTab,
  handleStoreListTabChange,
}) => {
  const router = useRouter();

  return (
    <WebWrapper>
      <div
        style={{
          display: 'flex',
          gap: '40px',
          alignContent: 'center',
        }}
      >
        <ButtonText
          label={'전체'}
          variant={activeTab === 'all' ? 'activeRed' : 'default'}
          onClick={() => {
            handleStoreListTabChange('all');
            setActiveTab('all');
          }}
        >
          전체
        </ButtonText>
        <ButtonText
          label={'게시글 많은 순'}
          variant={activeTab === 'best' ? 'activeRed' : 'default'}
          onClick={() => {
            handleStoreListTabChange('best');
            setActiveTab('best');
          }}
        >
          게시글 많은 순
        </ButtonText>
        <ButtonText
          label={'조회수'}
          variant={activeTab === 'view' ? 'activeRed' : 'default'}
          onClick={() => {
            handleStoreListTabChange('view');
            setActiveTab('view');
          }}
        >
          조회수
        </ButtonText>
        <ButtonText
          label={' 좋아요 순'}
          variant={activeTab === 'like' ? 'activeRed' : 'default'}
          onClick={() => {
            handleStoreListTabChange('like');
            setActiveTab('like');
          }}
        >
          좋아요 순
        </ButtonText>
      </div>
    </WebWrapper>
  );
};
