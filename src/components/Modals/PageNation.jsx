import React, { Children } from 'react';
import styled from 'styled-components';
import { WebWrapper } from '@components/Atoms/Wrapper';

export const PageNation = ({
  pages,
  handlePageNumChange,
  activeTab,
  router,
  storeListPage,
  setPageNum,
}) => {
  return (
    <WebWrapper>
      <StUl>
        {pages.map((pageNum) => (
          <StLi
            key={pageNum}
            className={
              (pageNum === parseInt(router.query.page) &&
                storeListPage === activeTab) ||
              (pageNum === 1 &&
                !router.query.page &&
                storeListPage === activeTab)
                ? 'active'
                : ''
            }
            onClick={() => handlePageNumChange(pageNum)}
          >
            {pageNum}
          </StLi>
        ))}
      </StUl>
    </WebWrapper>
  );
};
const StUl = styled.ul`
  justify-content: center;
  display: flex;
  align-items: center;
  margin: 80px auto;
`;

const StLi = styled.li`
  padding: 0 24px;
  box-sizing: border-box;
  overflow: hidden;
`;
