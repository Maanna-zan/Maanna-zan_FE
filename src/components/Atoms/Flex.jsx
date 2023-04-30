import React from 'react';
import styled from 'styled-components';

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;
export const FlexRowCenter = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
`;
export const FlexColumnCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
`;
export const FlexGap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5%;
`;