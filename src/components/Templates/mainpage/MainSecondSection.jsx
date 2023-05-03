import { FlexRow } from '@components/Atoms/Flex';
import { MapDefault } from '@components/Atoms/MapDefault';
import { WebWrapper, WebWrapperHeight } from '@components/Atoms/Wrapper';
import MapBeginning from '@features/map/MapBeginning';
import React from 'react';

export const MainSecondSection = () => {
  return (
    <>
      <WebWrapper >
        <WebWrapperHeight >
          <FlexRow>
            <MapBeginning/>
          </FlexRow>
        </WebWrapperHeight>
      </WebWrapper>
    </>
  );
};
