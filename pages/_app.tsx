import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider, Container } from '@chakra-ui/react';
import Head from 'next/head';
import { Header } from '../components/Header/Header';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title>AppTweak - Spotify challenge</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <ChakraProvider>
              <Header />
              <Container as="main" maxW="container.xl">
                <Component {...pageProps} />
              </Container>
            </ChakraProvider>
          </Provider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
