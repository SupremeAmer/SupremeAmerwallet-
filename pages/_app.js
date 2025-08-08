import Head from 'next/head';
import '../styles/globals.css';

// Import polyfills for blockchain dependencies
import 'react-native-get-random-values';
import '@ethersproject/shims';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>SupremeAmer Wallet</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;