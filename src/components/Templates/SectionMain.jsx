import { FlexRow } from '@components/Atoms/Flex';
import { MapDefault } from '@components/Atoms/MapDefault';
import { WebWrapper, WebWrapperHeight } from '@components/Atoms/Wrapper';
import React from 'react';

export const SectionMain = () => {
  return (
    <>
      <WebWrapper>
        <WebWrapperHeight>
          <FlexRow style={{ justifyContent: 'space-between' }}>
            <MapDefault size="md"></MapDefault>
          </FlexRow>
        </WebWrapperHeight>
      </WebWrapper>
    </>
  );
};
