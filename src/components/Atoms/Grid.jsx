import styled from 'styled-components';

export const GrideGapCol4 = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, calc((100% - 3 * 24px) / 4));
  gap: 24px;
`;
export const GrideGapCol3 = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, calc((100% - 2 * 24px) / 3));
  gap: 24px;
`;
export const GrideGap6 = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 15.83% 15.83% 15.83% 15.83% 15.83% 15.83%;
  gap: 1%;
`;

export const GrideGapRow4 = styled.div`
  width: 100%;
  height: 324px;
  display: grid;
  grid-template-rows: repeat(4);
  gap: 12px;
  overflow: hidden;
  box-sizing: border-box;
`;
