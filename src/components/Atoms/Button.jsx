import React from 'react';
import styled from 'styled-components';
import { lightTheme } from '@components/theme/lightTheme';

const StyledButton = styled.button`
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

export const ButtonText = ({
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
  let borderStyle = 'solid';
  let hoverBackgroundColor = 'inherit';
  let hoverBorderColor = 'inherit';
  let hoverFontColor = 'inherit';

  // about size
  switch (size) {
    case 'sm':
      padding = '10px 16px';
      fontSize = '14px';
      break;
    case 'md':
      padding = '11px 20px';
      fontSize = '14px';
      break;
    case 'lg':
      padding = '12px 24px';
      fontSize = '16px';
      break;
    case 'xl':
      padding = '14px 30px';
      fontSize = '20px';
      break;
  }

  // about full width
  if (block) {
    width = '100%';
  }

  // about style 폰트컬러설정다시
  switch (variant) {
    case 'default':
      backgroundColor = lightTheme.white;
      fontColor = lightTheme.gray200;
      borderStyle = 'solid';
      borderWidth = '1px';
      borderColor = lightTheme.gray400;
      hoverBackgroundColor = lightTheme.white;
      hoverBorderColor = lightTheme.gray;
      hoverFontColor = lightTheme.fontColorDark;
      break;
    case 'primary':
      backgroundColor = lightTheme.primaryNormal;
      fontColor = lightTheme.white;
      borderStyle = 'solid';
      borderWidth = '1px';
      borderColor = lightTheme.primaryNormal;
      hoverBackgroundColor = lightTheme.primaryHeavy;
      hoverBorderColor = lightTheme.primaryHeavy;
      hoverFontColor = lightTheme.white;
      break;
    case 'primaryBolder':
      backgroundColor = lightTheme.white;
      fontColor = lightTheme.primaryHeavy;
      borderStyle = 'solid';
      borderWidth = '1px';
      borderColor = lightTheme.primaryNormal;
      hoverBackgroundColor = lightTheme.primaryNormal;
      hoverBorderColor = lightTheme.primaryNormal;
      hoverFontColor = lightTheme.white;
      break;
    case 'grayButton':
      backgroundColor = lightTheme.white;
      fontColor = lightTheme.primaryHeavy;
      borderStyle = 'solid';
      borderWidth = '1px';
      borderColor = lightTheme.primaryNormal;
      hoverBackgroundColor = lightTheme.primaryNormal;
      hoverBorderColor = lightTheme.primaryNormal;
      hoverFontColor = lightTheme.white;
      break;
    case 'grayButtonBolder':
      backgroundColor = lightTheme.secondary;
      fontColor = lightTheme.primary;
      borderStyle = 'solid';
      borderWidth = '1px';
      borderColor = lightTheme.primary;
      hoverBackgroundColor = lightTheme.secondary;
      hoverBorderColor = lightTheme.secondary;
  }

  return (
    <StyledButton
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
      onClick={disabled ? undefined : onClick} // 이 부분 추가
      {...props}
    >
      {label}
    </StyledButton>
  );
};
