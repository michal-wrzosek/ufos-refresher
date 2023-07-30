'use client';

import { NoSSR } from '../../components/no-ssr';
import { ListingsPage } from '../../containers/listings-page';
import { GlobalStyle } from '../../styles/global-style';
import { ThemeModeProvider } from '../../styles/theme';

const AliensPage = async () => (
  <ThemeModeProvider>
    <GlobalStyle />
    <NoSSR>
      <ListingsPage subreddit="aliens" />
    </NoSSR>
  </ThemeModeProvider>
);

export default AliensPage;
