import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create an HTTP link to the GraphQL server
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI,
});

// Function to create the auth link
const createAuthLink = (token) => setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: token ? `Bearer ${token}` : "",
  },
}));

// Function to create the Apollo Client instance
const createApolloClient = (token) => {
  const authLink = createAuthLink(token);
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
