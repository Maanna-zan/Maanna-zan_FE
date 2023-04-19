import React from 'react';
import styled from 'styled-components';
import { LightTheme } from '@components/Themes/theme';

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
  let backgroundColor = 'inherit';
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
      backgroundColor = LightTheme.WHITE;
      fontColor = LightTheme.GRAY_200;
      borderStyle = 'solid';
      borderWidth = '1px';
      borderColor = LightTheme.GRAY_400;
      hoverBackgroundColor = LightTheme.WHITE;
      hoverBorderColor = LightTheme.GRAY_200;
      hoverFontColor = LightTheme.FONT_SECONDARY;
      break;
    case 'primary':
      backgroundColor = LightTheme.PRIMARY_NORMAL;
      fontColor = LightTheme.WHITE;
      borderStyle = 'solid';
      borderWidth = '1px';
      borderColor = LightTheme.PRIMARY_NORMAL;
      hoverBackgroundColor = LightTheme.PRIMARY_HEAVY;
      hoverBorderColor = LightTheme.PRIMARY_HEAVY;
      hoverFontColor = LightTheme.WHITE;
      break;
    case 'primaryBolder':
      backgroundColor = LightTheme.WHITE;
      fontColor = LightTheme.PRIMARY_HEAVY;
      borderStyle = 'solid';
      borderWidth = '1px';
      borderColor = LightTheme.PRIMARY_NORMAL;
      hoverBackgroundColor = LightTheme.PRIMARY_NORMAL;
      hoverBorderColor = LightTheme.PRIMARY_NORMAL;
      hoverFontColor = LightTheme.WHITE;
      break;
    case 'hoverRed':
      backgroundColor = LightTheme.WHITE;
      fontColor = LightTheme.BLACK;
      borderStyle = 'solid';
      borderWidth = '1px';
      borderColor = LightTheme.WHITE;
      hoverBackgroundColor = LightTheme.WHITE;
      hoverBorderColor = LightTheme.WHITE;
      hoverFontColor = LightTheme.PRIMARY_NORMAL;
      break;
    case 'borderColorWhite':
      backgroundColor = LightTheme.WHITE;
      fontColor = LightTheme.BLACK;
      borderStyle = 'solid';
      borderWidth = '1px';
      borderColor = LightTheme.WHITE;
      hoverBackgroundColor = LightTheme.PRIMARY_NORMAL;
      hoverBorderColor = LightTheme.PRIMARY_NORMAL;
      hoverFontColor = LightTheme.WHITE;
      break;
    // case 'grayButtonBolder':
    //   backgroundColor = LightTheme.SECONDARY;
    //   fontColor = LightTheme.PRIMARY;
    //   borderStyle = 'solid';
    //   borderWidth = '1px';
    //   borderColor = LightTheme.PRIMARY;
    //   hoverBackgroundColor = LightTheme.SECONDARY;
    //   hoverBorderColor = LightTheme.SECONDARY;
    //   break;
  }

  return (
    <StyledButton
      backgroundColor={backgroundColor}
      color={fontColor}
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
