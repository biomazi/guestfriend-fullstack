import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
    text-align: center;
    margin: 0;
    font-family: 'Segoe UI', 'Roboto', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  *, *::before, *::after {
    box-sizing: border-box;
    font-family: Ubuntu, Montserrat;
    font-size: 14px;
    line-height: 14px;
    color: white;
  }
  h1,h2 {
    color: black;
  }
  h2 {
    font-size: 28px;
    line-height: 28px;
  }
  h1 {
    font-size: 36px;
    line-height: 36px;
  }
`;

export default GlobalStyle;
