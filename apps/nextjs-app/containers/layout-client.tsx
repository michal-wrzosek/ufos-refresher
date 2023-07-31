'use client';

import { PropsWithChildren } from 'react';
import { GlobalStyle } from '../styles/global-style';
import { ThemeModeProvider } from '../styles/theme';

export const LayoutClient = ({ children }: PropsWithChildren) => (
  <ThemeModeProvider>
    <GlobalStyle />
    {children}
  </ThemeModeProvider>
);
