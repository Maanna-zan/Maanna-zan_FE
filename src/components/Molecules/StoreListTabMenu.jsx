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
          gap: '12px',
          margin: '20px 0px',
          marginRight: '12px',
          alignContent: 'center',
        }}
      >
        <ButtonText
          label={'전체'}
          size="tab"
          variant={activeTab === 'all' ? 'activeRedTab' : 'default'}
          onClick={() => {
            handleStoreListTabChange('all');
            setActiveTab('all');
          }}
        >
          전체
        </ButtonText>
        <ButtonText
          label={'게시글 많은 순'}
          size="tab"
          variant={activeTab === 'best' ? 'activeRedTab' : 'default'}
          onClick={() => {
            handleStoreListTabChange('best');
            setActiveTab('best');
          }}
        >
          게시글 많은 순
        </ButtonText>
        <ButtonText
          label={'조회수'}
          size="tab"
          variant={activeTab === 'view' ? 'activeRedTab' : 'default'}
          onClick={() => {
            handleStoreListTabChange('view');
            setActiveTab('view');
          }}
        >
          조회수
        </ButtonText>
        <ButtonText
          label={' 좋아요 순'}
          size="tab"
          variant={activeTab === 'like' ? 'activeRedTab' : 'default'}
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
