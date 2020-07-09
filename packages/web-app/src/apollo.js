import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const URL = 'http://localhost:3001/graphql';

// Instantiate required constructor fields
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: URL,
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
};

const client = new ApolloClient({
  cache,
  link,
  name: 'react-web-client',
  defaultOptions,
});

export default client;
