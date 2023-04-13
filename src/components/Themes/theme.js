//오직 타입스크리트만
//import { DefaultTheme } from 'styled-components';
import styled from 'styled-components';

export const LightTheme = {
  //color system
  WHITE: '#FFFFFF',
  BLACK: '#000000',

  BG_COLOR_LIGHT: '#FFF8ED',
  BG_COLOR: '#FFEED6',
  BG_COLOR_DARK: '#FFE2B9',

  PRIMARY_LIGHT: '#FF6A64',
  PRIMARY_NORMAL: '#FF4840',
  PRIMARY_STRONG: '#ED1E15',
  PRIMARY_HEAVY: '#C8150D',

  SECONDARY_LIGHT: '#FBD44E',
  SECONDARY_NORMAL: '#F9BD1A',
  SECONDARY_STRONG: '#F3A00D',
  SECONDARY_HEAVY: '#D77908',

  STATUS_ALERT: '#EF2B2A',
  STATUS_CAUTION: '#FA9538',
  STATUS_POSITIVE: '#3DC061',

  //gray, background, border
  GRAY_50: '#F7F8F9',
  GRAY_100: '#E8EBED',
  GRAY_200: '#C9CDD2',
  GRAY_400: '#9EA4AA',
  GRAY_500: '#72787F',
  GRAY_600: '#454C53',
  GRAY_800: '#26282B',
  GRAY_900: '#1B1D1F',

  //font color
  FONT_PRIMARY: '#1B1D1F',
  FONT_SECONDARY: '#9EA4AA',
  FONT_TERTIARY: '#E8EBED',
  FONT_CAUTION: '#BDBDBD',

  //font weight(bold 600 --> medium)
  FONT_BOLD: '700',
  FONT_REGULAR: '400',
  FONT_MEDIUM: '600',

  //font size (이거는 line-height값임)
  FONT_SIZE_1: '1rem',
  FONT_SIZE_2: '0.875rem',

  //font height (이거는 line-height값임)
  FONT_HEIGHT_1: '1.125rem',
  FONT_HEIGHT_2: '1.5rem',
};
// 피그마에 폰트 클릭하면 나옴 그에 맞는거 위에 만들어둠!
// --label1-bold: 700 1rem/1.5rem
// --label1-regular: 400 1rem/1.5rem
// --label2-bold: 600 0.875rem/1.125rem
// --label2-regular: 400 0.875rem/1.125rem
