import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

// Create a singleton Apollo Client instance
let client;

const getClient = () => {
  if (!client) {
    client = new ApolloClient({
      link: new HttpLink({
        uri: 'https://graphql.anilist.co',
      }),
      cache: new InMemoryCache({
        typePolicies: {
          Page: {
            keyFields: [],
          },
        },
      }),
    });
  }
  return client;
};

export default getClient;
