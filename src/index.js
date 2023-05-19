import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client'; // Import your Apollo Client instance

// Replace ReactDOM.render with createRoot
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
  </ChakraProvider>
);