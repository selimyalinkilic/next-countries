import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};
export default App;
