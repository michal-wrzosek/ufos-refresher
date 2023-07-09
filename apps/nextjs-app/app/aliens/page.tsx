'use client';

import { NoSSR } from '../../components/no-ssr';
import { ListingsPage } from '../../containers/listings-page';
import { GlobalStyle } from '../../styles/global-style';

const AliensPage = async () => (
  <>
    <GlobalStyle />
    <NoSSR>
      <ListingsPage subreddit="aliens" />
    </NoSSR>
  </>
);

export default AliensPage;
