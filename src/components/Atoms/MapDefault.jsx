import React from 'react';
import styled from 'styled-components';

const StyledMap = styled.div`
  display: block;
  background-color: aliceblue;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export const MapDefault = ({ block = false, size = 'md', label, ...props }) => {
  let width = '100%';
  let height = '100%';

  switch (size) {
    case 'default':
      width = '100%';
      height = '100%';
      break;
    case 'sm':
      width = '280px';
      height = '690px';
      break;
    case 'md':
      width = '360px';
      height = '960px';
      break;
    case 'lg':
      width = '982px';
      height = '578px';
      break;
  }

  return (
    <StyledMap width={width} height={height} {...props}>
      {label}
    </StyledMap>
  );
};
