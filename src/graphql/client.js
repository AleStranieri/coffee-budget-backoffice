import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:3002/graphql', // Replace with your backend API URL
});

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from wherever you store it (e.g., local storage, state)
  const token = localStorage.getItem('authToken'); // Replace with your actual token retrieval logic

  // Return the headers to the context so HTTP link can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '', // Include the Bearer token in the Authorization header
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
