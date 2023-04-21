import { FlexRow } from '@components/Atoms/Flex';
import { MapDefault } from '@components/Atoms/MapDefault';
import { WebWrapper, WebWrapperHeight } from '@components/Atoms/Wrapper';
import MapBeginning from '@features/map/MapBeginning';
import React from 'react';

export const MainSecondSection = () => {
  return (
    <>
      <WebWrapper 
        // style={{ backgroundColor: 'lightyellow' }}
      >
        <WebWrapperHeight 
          // style={{ backgroundColor: 'lightpink' }}
        >
          <FlexRow style={{ justifyContent: 'space-between' }}>
            {/* <MapDefault size="md"></MapDefault> */}
            <MapBeginning/>
          </FlexRow>
        </WebWrapperHeight>
      </WebWrapper>
    </>
  );
};
