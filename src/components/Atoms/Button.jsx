import React from 'react';
import styled from 'styled-components';
import { lightTheme } from '@components/Themes/theme';

const StyledButton = styled.button`
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  font-size: ${(props) => props.fontSize};
  border-radius: 10px;
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
`;

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

  switch (variant) {
    case 'default':
      backgroundColor = lightTheme.WHITE;
      fontColor = lightTheme.GRAY_200;
      borderStyle = 'solid';
      borderWidth = '1px';
      borderColor = lightTheme.GRAY_400;
      hoverBackgroundColor = lightTheme.WHITE;
      hoverBorderColor = lightTheme.GRAY_200;
      hoverFontColor = lightTheme.fontColorDark;
      break;
    case 'primary':
      backgroundColor = lightTheme.PRIMARY_NORMAL;
      fontColor = lightTheme.WHITE;
      borderStyle = 'solid';
      borderWidth = '1px';
      borderColor = lightTheme.PRIMARY_NORMAL;
      hoverBackgroundColor = lightTheme.PRIMARY_HEAVY;
      hoverBorderColor = lightTheme.PRIMARY_HEAVY;
      hoverFontColor = lightTheme.WHITE;
      break;
    case 'primaryBolder':
      backgroundColor = lightTheme.WHITE;
      fontColor = lightTheme.PRIMARY_HEAVY;
      borderStyle = 'solid';
      borderWidth = '1px';
      borderColor = lightTheme.PRIMARY_NORMAL;
      hoverBackgroundColor = lightTheme.PRIMARY_NORMAL;
      hoverBorderColor = lightTheme.PRIMARY_NORMAL;
      hoverFontColor = lightTheme.WHITE;
      break;
    case 'grayButton':
      backgroundColor = lightTheme.WHITE;
      fontColor = lightTheme.PRIMARY_HEAVY;
      borderStyle = 'solid';
      borderWidth = '1px';
      borderColor = lightTheme.PRIMARY_NORMAL;
      hoverBackgroundColor = lightTheme.PRIMARY_NORMAL;
      hoverBorderColor = lightTheme.PRIMARY_NORMAL;
      hoverFontColor = lightTheme.WHITE;
    case 'borderColorWhite':
      backgroundColor = lightTheme.WHITE;
      fontColor = lightTheme.BLACK;
      borderStyle = 'solid';
      borderWidth = '1px';
      borderColor = lightTheme.WHITE;
      hoverBackgroundColor = lightTheme.PRIMARY_NORMAL;
      hoverBorderColor = lightTheme.PRIMARY_NORMAL;
      hoverFontColor = lightTheme.WHITE;
      break;
    // case 'grayButtonBolder':
    //   backgroundColor = lightTheme.SECONDARY;
    //   fontColor = lightTheme.PRIMARY;
    //   borderStyle = 'solid';
    //   borderWidth = '1px';
    //   borderColor = lightTheme.PRIMARY;
    //   hoverBackgroundColor = lightTheme.SECONDARY;
    //   hoverBorderColor = lightTheme.SECONDARY;
    //   break;
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
