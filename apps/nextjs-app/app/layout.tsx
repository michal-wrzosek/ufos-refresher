import { NoSSR } from '../components/no-ssr';
import { LayoutClient } from '../containers/layout-client';
import { StyledComponentsRegistry } from './registry';

export const metadata = {
  title: 'r/UFOs refresher',
  description: 'Simple way to stay up to date with latest UFO news',
  manifest: '/site.webmanifest',
  themeColor: '#ffffff',
  icons: {
    other: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        url: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png',
      },
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#000000',
      },
    ],
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <NoSSR>
            <LayoutClient>{children}</LayoutClient>
          </NoSSR>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
