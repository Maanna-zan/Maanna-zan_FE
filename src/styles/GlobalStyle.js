import { createGlobalStyle } from 'styled-components';
import { LightTheme } from '@components/Themes/theme';
export const GlobalStyles = createGlobalStyle`



    * {
        box-sizing:border-box;
        font-family: 'Pretendard', sans-serif ;
        
    }
    input {
        all:unset;
        width: 100%;
    }
    body {
      //global
      font-family: ${() => LightTheme.FONT_KOR};
     margin: 0; padding: 0;
      @media  screen and  (max-width: 600px) {
        h1{
          font-size: 100px;
          font-weight: 600;
          line-height: 1.4;
        }
        h2{
          font-size:26px;
          font-weight: 600;
          line-height: 1.4;
        }
        h3{
          font-size:20px;
          font-weight: 600;
          line-height: 1.4;
        }
        h4{
          font-size:18px;
          font-weight: 600;
          line-height: 1.4;
        }
        span{
          font-size:18px;
          font-weight: 400;
          line-height: 1.4;
        }
        p{
          font-size:16px;
          font-weight: 400;
          line-height: 1.4;
        }
        small{
          font-size:16px;
          font-weight: 400;
          line-height: 1.4;
        }
        
      }
      @media  screen and  (min-width: 601px) {
        h1{
          font-size: 1px;
          font-weight: 600;
          line-height: 1.4;
        }
        h2{
          font-size:36px;
          font-weight: 600;
          line-height: 1.4;
        }
        h3{
          font-size:24px;
          font-weight: 600;
          line-height: 1.4;
        }
        h4{
          font-size:18px;
          font-weight: 600;
          line-height: 1.4;
        }
        span{
          font-weight: 400;
          line-height: 1.4;
        }
        p{
          font-size:14px;
          font-weight: 400;
          line-height: 1.4;
        }
        small{
          font-size:12px;
          font-weight: 400;
          line-height: 1.4;
        }
      }
    }
`;
