import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client'; // Import your Apollo Client instance

// Replace ReactDOM.render with createRoot
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <ApolloProvider client={client}>
    <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <App />
      </Auth0Provider>
    </ApolloProvider>
  </ChakraProvider>
);