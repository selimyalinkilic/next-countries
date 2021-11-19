import { ChakraProvider } from '@chakra-ui/react'
import theme from '../styles/theme'
import Head from 'next/head'
import NextNProgress from 'nextjs-progressbar'

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NextNProgress
        color="#29D"
        startPosition={0.1}
        stopDelayMs={200}
        height={2}
        showOnShallow={true}
      />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
export default App
