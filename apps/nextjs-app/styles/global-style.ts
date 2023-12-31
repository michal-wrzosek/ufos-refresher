import { createGlobalStyle } from 'styled-components';
import { normalizeCss } from './normalize-css';

export const GlobalStyle = createGlobalStyle`
  ${normalizeCss};

  html {
    -webkit-text-size-adjust: 100%;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
      Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    line-height: 1.5;
    tab-size: 4;
    scroll-behavior: smooth;
    box-sizing: border-box;
  }

  body {
    font-family: inherit;
    line-height: inherit;
    margin: 0;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.fontColor};
  }

  h1,
  h2,
  p,
  pre {
    margin: 0;
  }

  *,
  ::before,
  ::after {
    box-sizing: inherit;
    border-width: 0;
    border-style: solid;
    border-color: currentColor;
  }

  h1,
  h2 {
    font-size: inherit;
    font-weight: inherit;
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }

  pre {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      Liberation Mono, Courier New, monospace;
  }

  svg {
    display: block;
    vertical-align: middle;
    shape-rendering: auto;
    text-rendering: optimizeLegibility;
  }

  pre {
    background-color: rgba(55, 65, 81, 1);
    border-radius: 0.25rem;
    color: rgba(229, 231, 235, 1);
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      Liberation Mono, Courier New, monospace;
    overflow: scroll;
    padding: 0.5rem 0.75rem;
  }
`;
