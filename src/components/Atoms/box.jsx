import React from 'react';
import styled from 'styled-components';
import { lightTheme } from '@components/theme/lightTheme';

const StyledBox = styled.div`
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  font-size: ${(props) => props.fontSize};
  border-radius: 5px;
  color: ${(props) => props.fontColor};
  border-width: ${(props) => props.borderWidth};
  border-color: ${(props) => props.borderColor};
  border-style: solid;

  &:hover {
    background-color: ${(props) => props.hoverBackgroundColor};
    border-color: ${(props) => props.hoverBorderColor};
    color: ${(props) => props.hoverFontColor};
    transition: 0.3s ease-in-out;
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  }

  &.active {
    background-color: ${(props) => props.hoverBackgroundColor};
    border-color: ${(props) => props.hoverBorderColor};
    transition: 0.3s ease-in-out;
    color: ${(props) => props.hoverFontColor};
  }
  /* 
  svg {
    margin: 0px 12px;
  } */
`;
// interface ButtonProps {
//     size?: "sm" | "md" | "lg";
//     variant?: "default" | "primary" | "danger" | "ghost";
//     onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
//   }

export const BoxText = ({
  block = false,
  size = 'md',
  variant = 'default',
  fontWeight,
  label,
  margin = '0px 0px',
  active = false,
  disabled = false,
  onClick,
  ...props
}) => {
  let padding = '0px';
  let fontSize = '14px';
  let width = undefined;
  let backgroundColor = 'white';
  let fontColor = '';
  let borderWidth = '1px';
  let borderColor = '';
  let borderStyle = 'soild';
  let hoverBackgroundColor = 'inherit';
  let hoverBorderColor = 'inherit';
  let hoverFontColor = 'inherit';

  // about size
  switch (size) {
    case 'sm':
      padding = '15px';
      break;
    case 'md':
      padding = '18px 12px 18px 10px';
      break;
    case 'lg':
      padding = '12px 24px';
      break;
    case 'xl':
      padding = '14px 30px';
      break;
  }

  // about full width
  if (block) {
    width = '100%';
  }

  // about style 폰트컬러설정다시
  switch (variant) {
    case 'default':
      backgroundColor = lightTheme.gray50;
      fontColor = lightTheme.gray200;
      borderStyle = 'solid';
      borderWidth = '1px';
      borderColor = lightTheme.gray400;
      hoverBackgroundColor = lightTheme.gray50;
      hoverBorderColor = lightTheme.gray50;
      hoverFontColor = lightTheme.gray50;
      break;
    case 'grayBox':
      backgroundColor = lightTheme.white;
      fontColor = lightTheme.primaryHeavy;
      borderStyle = 'solid';
      borderWidth = '1px';
      borderColor = lightTheme.primaryNormal;
      hoverBackgroundColor = lightTheme.primaryNormal;
      hoverBorderColor = lightTheme.primaryNormal;
      hoverFontColor = lightTheme.white;
      break;
    case 'grayBoxBolder':
      backgroundColor = lightTheme.secondary;
      fontColor = lightTheme.primary;
      borderStyle = 'solid';
      borderWidth = '1px';
      borderColor = lightTheme.primary;
      hoverBackgroundColor = lightTheme.secondary;
      hoverBorderColor = lightTheme.secondary;
  }

  return (
    <StyledBox
      backgroundColor={backgroundColor}
      fontSize={fontSize}
      width={width}
      padding={padding}
      margin={margin}
      fontColor={fontColor}
      hoverBackgroundColor={hoverBackgroundColor}
      borderWidth={borderWidth}
      borderColor={borderColor}
      borderStyle={borderStyle}
      hoverBorderColor={hoverBorderColor}
      hoverFontColor={hoverFontColor}
      disabled={disabled}
      {...props}
    >
      {label}
    </StyledBox>
  );
};
