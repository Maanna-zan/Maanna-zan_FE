import { FlexRow } from '@components/Atoms/Flex';
import { MapDefault } from '@components/Atoms/MapDefault';
import {
  WebWrapper,
  WebWrapperHeight,
  WebWrapperFull,
} from '@components/Atoms/Wrapper';
import React from 'react';

export const MainLastSectionMovie = () => {
  return (
    <WebWrapperHeight>
      <FlexRow>
        <WebWrapperFull>
          <video
            autoPlay
            loop
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          >
            <source src="mainLastSectionVideo.mp4" type="video/mp4" />
          </video>
        </WebWrapperFull>
      </FlexRow>
    </WebWrapperHeight>
  );
};
