import React from 'react';
import styled from 'styled-components';
import { LightTheme } from '@components/Themes/theme';

const StyledInput = styled.input`
  border-radius: 10px;
  overflow: hidden;
  box-sizing: border-box;
  /* height: 40px; */
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => props.width};
  border: 1px solid;
  padding: ${(props) => props.padding};
  border-width: ${(props) => props.borderWidth};
  border-color: ${(props) => props.borderColor};
  border-style: solid;
  color: black;
  ::placeholder {
    color: ${(props) => props.placeColor};
  }
  &:focus {
    outline: ${(props) => props.focusBorderColor};
    ::placeholder {
      color: transparent;
    }
  }
`;
export const InputArea = ({
  type,
  placeholder = '',
  value,
  label,
  block = false,
  size = 'md',
  variant = 'default',
  onChange,
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
  let focusBackgroundColor = 'inherit';
  let focusBorderColor = 'inherit';
  let focusFontColor = 'inherit';
  let placeColor = '';
  switch (size) {
    case 'df':
      padding = '12px 8px';
      fontSize = '14px';
      break;
    case 'leftIcon':
      padding = '12px 8px 12px 48px';
      fontSize = LightTheme.FONT_SIZE_2;
      break;
    case 'lg':
      padding = '12px 24px';
      fontSize = '16px';
      break;
    case 'xl':
      padding = '14px 30px';
      fontSize = '20px';
      break;
    case 'xxl':
      padding = '10px 24px 24px 34px';
      fontSize = '16px';
      break;
  }
  if (block) {
    width = '100%';
  }

  switch (variant) {
    case 'default':
      backgroundColor = LightTheme.WHITE;
      fontColor = LightTheme.GRAY_200;
      borderColor = LightTheme.GRAY_400;
      focusBackgroundColor = LightTheme.WHITE;
      focusBorderColor = LightTheme.GRAY_200;
      placeColor = LightTheme.BLACK;
      break;
    case 'primary':
      backgroundColor = LightTheme.PRIMARY_NORMAL;
      fontColor = LightTheme.WHITE;
      borderColor = LightTheme.PRIMARY_NORMAL;
      focusBackgroundColor = LightTheme.PRIMARY_HEAVY;
      focusBorderColor = LightTheme.PRIMARY_HEAVY;
      placeColor = LightTheme.BLACK;
      break;
    case 'primaryBolder':
      backgroundColor = LightTheme.WHITE;
      fontColor = LightTheme.PRIMARY_HEAVY;
      borderColor = LightTheme.PRIMARY_NORMAL;
      focusBackgroundColor = LightTheme.PRIMARY_NORMAL;
      focusBorderColor = LightTheme.PRIMARY_NORMAL;
      placeColor = LightTheme.FONT_SECONDARY;
      break;
    case 'grayButton':
      backgroundColor = LightTheme.WHITE;
      fontColor = LightTheme.PRIMARY_HEAVY;
      borderColor = LightTheme.PRIMARY_NORMAL;
      focusBackgroundColor = LightTheme.PRIMARY_NORMAL;
      focusBorderColor = LightTheme.PRIMARY_NORMAL;
      placeColor = LightTheme.FONT_SECONDARY;
      break;
    case 'gray':
      backgroundColor = LightTheme.GRAY_200;
      fontColor = LightTheme.PRIMARY_HEAVY;
      borderColor = LightTheme.WHITE;
      focusBackgroundColor = LightTheme.PRIMARY_NORMAL;
      focusBorderColor = LightTheme.GRAY_200;
      placeColor = LightTheme.FONT_SECONDARY;
      break;
  }
  return (
    <StyledInput
      backgroundColor={backgroundColor}
      fontSize={fontSize}
      width={width}
      padding={padding}
      fontColor={fontColor}
      focusBackgroundColor={focusBackgroundColor}
      borderWidth={borderWidth}
      borderColor={borderColor}
      borderStyle={borderStyle}
      focusBorderColor={focusBorderColor}
      focusFontColor={focusFontColor}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    >
      {label}
    </StyledInput>
  );
};
