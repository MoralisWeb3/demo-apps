import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { MoralisProvider } from 'react-moralis';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
});

const appId = 'YOUR_APP_ID';
const serverUrl = 'YOUR_SERVER_URL';

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
