import React from 'react';
import styled from 'styled-components';
import { LightTheme } from '@components/Themes/theme';

const StyledBox = styled.div`
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  font-size: ${(props) => props.fontSize};
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.borderRadius};
  color: ${(props) => props.fontColor};
  border-width: ${(props) => props.borderWidth};
  border-color: ${(props) => props.borderColor};
  border-style: solid;
  box-sizing: border-box;
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

export const BoxTextReal = ({
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
  let borderRadius = '10px';
  // about size
  switch (size) {
    case 'sm':
      padding = '8px';
      borderRadius = '5px';
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
    case 'nonePadding':
      padding = '0';
      borderRadius = '8px';
      break;
  }

  // about full width
  if (block) {
    width = '100%';
  }

  // about style 폰트컬러설정다시
  switch (variant) {
    case 'default':
      backgroundColor = LightTheme.GRAY_50;
      fontColor = LightTheme.GRAY_200;
      borderStyle = 'solid';
      borderWidth = '1px';
      borderColor = LightTheme.GRAY_400;
      hoverBackgroundColor = LightTheme.GRAY_50;
      hoverBorderColor = LightTheme.GRAY_50;
      hoverFontColor = LightTheme.GRAY_50;
      break;
    case 'grayBox':
      backgroundColor = LightTheme.GRAY_50;
      fontColor = LightTheme.GRAY_50;
      borderStyle = 'solid';
      borderWidth = '1px';
      borderColor = LightTheme.GRAY_50;
      hoverBackgroundColor = LightTheme.GRAY_50;
      hoverBorderColor = LightTheme.GRAY_50;
      hoverFontColor = LightTheme.GRAY_50;
      break;
    case 'grayBolderBox':
      backgroundColor = LightTheme.WHITE;
      fontColor = LightTheme.FONT_PRIMARY;
      borderStyle = 'solid';
      borderWidth = '1px';
      borderColor = LightTheme.GRAY_100;
      hoverBackgroundColor = LightTheme.WHITE;
      hoverBorderColor = LightTheme.GRAY_100;
      hoverFontColor = LightTheme.FONT_PRIMARY;
      break;
    case 'realDefaultBox':
      backgroundColor = LightTheme.WHITE;
      fontColor = LightTheme.FONT_PRIMARY;
      borderStyle = 'none';
      borderWidth = '0px';
      borderColor = LightTheme.WHITE;
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
      borderRadius={borderRadius}
      {...props}
    ></StyledBox>
  );
};
