import React, { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import { createRoot } from 'react-dom/client';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import App from './App';
import createApolloClient from './graphql/createApolloClient';

const MainApp = () => {
  const [apolloClient, setApolloClient] = useState(null);
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    const initializeApollo = async () => {
      let token = '';
      if (isAuthenticated) {
        try {
          token = await getAccessTokenSilently();
        } catch (error) {
          console.error("Error getting access token", error);
          // You can choose to handle errors differently here
        }
      }
      const client = createApolloClient(token);
      setApolloClient(client);
    };

    if (!isLoading) {
      initializeApollo();
    }
  }, [isAuthenticated, isLoading, getAccessTokenSilently]);

  if (!apolloClient) {
    return <div>Loading...</div>;
  }

  return (
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  );
};

createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: process.env.REACT_APP_AUTH0_IDENTIFIER,
      }}
    >
      <MainApp />
    </Auth0Provider>
  </ChakraProvider>
);
