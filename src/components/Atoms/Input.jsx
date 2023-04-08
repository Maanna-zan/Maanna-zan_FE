import React from 'react';
import styled from 'styled-components';
import { lightTheme } from '@components/Themes/theme';

const StyledInput = styled.input`
  border-radius: 10px;
  /* height: 40px; */
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => props.width};
  outline: none;
  padding: ${(props) => props.padding};
  border-width: ${(props) => props.borderWidth};
  border-color: ${(props) => props.borderColor};
  border-style: solid;
  ::placeholder {
    color: #333;
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
      focusBackgroundColor = lightTheme.WHITE;
      focusBorderColor = lightTheme.GRAY_200;
      focusFontColor = lightTheme.fontColorDark;
      break;
    case 'primary':
      backgroundColor = lightTheme.PRIMARY_NORMAL;
      fontColor = lightTheme.WHITE;
      borderStyle = 'solid';
      borderWidth = '1px';
      borderColor = lightTheme.PRIMARY_NORMAL;
      focusBackgroundColor = lightTheme.PRIMARY_HEAVY;
      focusBorderColor = lightTheme.PRIMARY_HEAVY;
      focusFontColor = lightTheme.WHITE;
      break;
    case 'primaryBolder':
      backgroundColor = lightTheme.WHITE;
      fontColor = lightTheme.PRIMARY_HEAVY;
      borderStyle = 'solid';
      borderWidth = '1px';
      borderColor = lightTheme.PRIMARY_NORMAL;
      focusBackgroundColor = lightTheme.PRIMARY_NORMAL;
      focusBorderColor = lightTheme.PRIMARY_NORMAL;
      focusFontColor = lightTheme.WHITE;
      break;
    case 'grayButton':
      backgroundColor = lightTheme.WHITE;
      fontColor = lightTheme.PRIMARY_HEAVY;
      borderStyle = 'solid';
      borderWidth = '1px';
      borderColor = lightTheme.PRIMARY_NORMAL;
      focusBackgroundColor = lightTheme.PRIMARY_NORMAL;
      focusBorderColor = lightTheme.PRIMARY_NORMAL;
      focusFontColor = lightTheme.WHITE;
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
    ></StyledInput>
  );
};
