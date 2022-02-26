import "@styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

declare type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

declare type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  /**
   *  If `getLayout` is defined on the page, we wrap the page in that layout.
   */
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
