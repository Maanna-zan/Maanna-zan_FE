import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    @font-face {
      font-family: "AppleSD";
      src: url("/fonts/AppleSDGothicNeoUL.woff") format("woff");      
      font-display: swap;
      font-weight:100;
    };
    @font-face {
      font-family: "AppleSD";
      src: url("/fonts/AppleSDGothicNeoUL.woff") format("woff");      
      font-display: swap;
      font-weight:200;
    };
    @font-face {
      font-family: "AppleSD";
      src: url("/fonts/AppleSDGothicNeoUL.woff") format("woff");      
      font-display: swap;
      font-weight:300;
    };
    @font-face {
      font-family: "AppleSD";
      src: url("/fonts/AppleSDGothicNeoUL.woff") format("woff");      
      font-display: swap;
      font-weight:400;
    };
    @font-face {
      font-family: "AppleSD";
      src: url("/fonts/AppleSDGothicNeoUL.woff") format("woff");
      font-display: swap;
      font-weight:500;
    };
    @font-face {
      font-family: "AppleSD";
      src: url("/fonts/AppleSDGothicNeoUL.woff") format("woff");
      font-display: swap;
      font-weight:600;
    };
    @font-face {
      font-family: "AppleSD";
      src: url("/fonts/AppleSDGothicNeoUL.woff") format("woff");      
      font-display: swap;
      font-weight:700;
    };
    @font-face {
      font-family: "AppleSD";
      src: url("/fonts/AppleSDGothicNeoUL.woff") format("woff");      
      font-display: swap;
      font-weight:60;
    };
    @font-face {
      font-family: "AppleSD";
      src: url("/fonts/AppleSDGothicNeoUL.woff") format("woff");      
      font-display: swap;
      font-weight:900;
    };
    ${reset}
    * {
        box-sizing:border-box;
    }
    input {
        all:unset
    }
    body {
      //global
      /* font-family: ${(props) => props.theme.font_kor};
      color:${(props) => props.theme.fontColor}; */
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
          font-size:16px;
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
