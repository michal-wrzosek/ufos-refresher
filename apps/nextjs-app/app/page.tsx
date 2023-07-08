'use client';

import { NoSSR } from '../components/no-ssr';
import { IndexPage } from '../containers/index-page';
import { GlobalStyle } from '../styles/global-style';

const Index = async () => (
  <>
    <GlobalStyle />
    <NoSSR>
      <IndexPage />
    </NoSSR>
  </>
);

export default Index;
