import { FlexRow } from '@components/Atoms/Flex';
import { InputArea } from '@components/Atoms/Input';
import { MapDefault } from '@components/Atoms/MapDefault';
import { WebWrapper, WebWrapperHeight } from '@components/Atoms/Wrapper';
import React from 'react';

export const TestTemplate = () => {
  return (
    <>
      <WebWrapper style={{ backgroundColor: 'lightyellow' }}>
        <WebWrapperHeight style={{ backgroundColor: 'lightpink' }}>
          <FlexRow style={{ justifyContent: 'space-between' }}>
            <InputArea size="df" variant="primary" placeholder={'안뇽'} />
          </FlexRow>
        </WebWrapperHeight>
      </WebWrapper>
    </>
  );
};
