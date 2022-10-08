import '../styles/globals.css';
import type { AppProps } from 'next/app';
import ChakraUIProvider from '../Providers/ChakraProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraUIProvider>
      <Component {...pageProps} />
    </ChakraUIProvider>
  );
}

export default MyApp;
