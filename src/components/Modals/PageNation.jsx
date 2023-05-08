import React, { Children } from 'react';
import styled from 'styled-components';
import { WebWrapper } from '@components/Atoms/Wrapper';

const PAGE_SIZE = 10; // 페이지당 보여줄 데이터 개수
const MAX_PAGE_ITEMS = 10; // 페이지 번호 버튼의 최대 개수

export const PageNation = ({
  pages,
  handlePageNumChange,
  activeTab,
  router,
  storeListPage,
  setPageNum,
  propTotalSize,
}) => {
  const currentPage = parseInt(router.query.page) || 1;
  const totalPage = pages.length;

  // 현재 페이지 기준으로 좌우로 몇 개의 페이지 번호 버튼을 보여줄지 계산
  const startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_ITEMS / 2));
  const endPage = Math.min(totalPage, startPage + MAX_PAGE_ITEMS - 1);

  // 현재 페이지에 해당하는 데이터 범위 계산
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const endIdx = Math.min(startIdx + PAGE_SIZE, propTotalSize || 0);

  return (
    <WebWrapper>
      <StUl>
        {startPage > 1 && (
          <>
            <StLi onClick={() => handlePageNumChange(1)}>&lt;&lt;</StLi>
            <StLi onClick={() => handlePageNumChange(startPage - 1)}>&lt;</StLi>
          </>
        )}
        {pages.slice(startPage - 1, endPage).map((pageNum) => (
          <StLi
            key={pageNum}
            className={
              (pageNum === currentPage && storeListPage === activeTab) ||
              (pageNum === 1 && !currentPage && storeListPage === activeTab)
                ? 'active'
                : ''
            }
            onClick={() => handlePageNumChange(pageNum)}
          >
            {pageNum}
          </StLi>
        ))}
        {endPage < totalPage && (
          <>
            <StLi onClick={() => handlePageNumChange(endPage + 1)}>&gt;</StLi>
            <StLi onClick={() => handlePageNumChange(totalPage)}>&gt;&gt;</StLi>
          </>
        )}
      </StUl>
      {/* <StPageInfo>
        {propTotalSize ? (
          <>
            {startIdx + 1}-{endIdx} of {propTotalSize} items
          </>
        ) : (
          <>No items to display</>
        )}
      </StPageInfo> */}
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
  cursor: pointer;
`;

const StPageInfo = styled.p`
  text-align: center;
`;
