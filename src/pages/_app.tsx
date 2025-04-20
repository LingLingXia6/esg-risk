import React, { Fragment } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/contexts/ThemeContext';
import '@/styles/globals.scss';

const defaultTitle = 'React App with Next.js';

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: JSX.Element, props: P) => JSX.Element;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  pageProps: {
    title?: string;
  };
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  // 创建 React Query 客户端
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000, // 5分钟
        retry: 1
      }
    }
  });

  const { title = defaultTitle } = pageProps;

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </Fragment>
  );
}

export default App;
