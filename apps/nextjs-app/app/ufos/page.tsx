'use client';

import { NoSSR } from '../../components/no-ssr';
import { ListingsPage } from '../../containers/listings-page';
import { GlobalStyle } from '../../styles/global-style';

const UfosPage = async () => (
  <>
    <GlobalStyle />
    <NoSSR>
      <ListingsPage subreddit="ufos" />
    </NoSSR>
  </>
);

export default UfosPage;
