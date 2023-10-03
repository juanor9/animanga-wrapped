import { HttpLink } from '@apollo/client';
import { NextSSRInMemoryCache, NextSSRApolloClient } from '@apollo/experimental-nextjs-app-support/ssr';

const getClient = (token) => {
  const linkOptions = {
    uri: 'https://graphql.anilist.co',
  };

  if (token) {
    linkOptions.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: new HttpLink(linkOptions),
  });
};

export default getClient;
