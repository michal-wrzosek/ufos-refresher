import dynamic from 'next/dynamic';
import React, { PropsWithChildren } from 'react';

const NoSSRWrapper = ({ children }: PropsWithChildren) => <>{children}</>;

export const NoSSR = dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false,
});
