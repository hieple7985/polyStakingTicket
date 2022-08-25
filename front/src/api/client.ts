import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://laboon-nts-v4.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret": "Lj2ANITVTGhi28Hj3FLpWPZm41XsOuYiCt4y4Gy9krdvbO1fgL2wgjvdpplTyU7P",
    "x-hasura-role": "admin"
  }
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});
