import React from 'react';
import styled from 'styled-components';
import { LightTheme } from '@components/Themes/theme';

export const ShareBtn = () => {
  return (
    <StSvg
      viewBox="0 0 24 24"
      className="css-i6dzq1"
      fill={LightTheme.FONT_PRIMARY}
    >
      <circle cx="18" cy="5" r="3" stroke={LightTheme.FONT_PRIMARY} />
      <circle cx="6" cy="12" r="3" stroke={LightTheme.FONT_PRIMARY} />
      <circle cx="18" cy="19" r="3" stroke={LightTheme.FONT_PRIMARY} />
      <line
        x1="8.59"
        y1="13.51"
        x2="15.42"
        y2="17.49"
        stroke={LightTheme.FONT_PRIMARY}
      />
      <line
        x1="15.41"
        y1="6.51"
        x2="8.59"
        y2="10.49"
        stroke={LightTheme.FONT_PRIMARY}
      />
    </StSvg>
  );
};

const StSvg = styled.svg`
  width: 24px;
  height: 24px;
  stroke: currentColor;
  stroke-width: 2;
  fill: ${({ fillColor }) => fillColor || 'none'};
  stroke-linecap: round;
  stroke-linejoin: round;
`;
