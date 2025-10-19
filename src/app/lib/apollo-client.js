import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { cache } from 'react';

const getClient = cache(() => new ApolloClient({
  link: new HttpLink({
    uri: 'https://graphql.anilist.co',
  }),
  cache: new InMemoryCache(),
}));

export default getClient;
