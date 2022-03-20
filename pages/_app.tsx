import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, Container } from '@chakra-ui/react';
import Head from 'next/head';
import { Header } from '../components/Header/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>AppTweak - Spotify challenge</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <ChakraProvider>
        <Header />
        <Container as="main" maxW='container.xl'>
          <Component {...pageProps} />
        </Container>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
