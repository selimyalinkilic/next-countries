import { ChakraProvider } from '@chakra-ui/react'
import theme from '../styles/theme'
import Head from 'next/head'

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
export default App
