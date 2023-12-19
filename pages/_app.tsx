import 'styles/global.css';
import 'styles/timeline.css';

import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
      <Analytics />
      <SpeedInsights />
    </SessionProvider>
  );
}
