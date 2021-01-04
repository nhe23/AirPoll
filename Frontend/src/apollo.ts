import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { getMainDefinition } from "apollo-utilities";

const headers = { "content-type": "application/json" };
const getHeaders = () => {
  return headers;
};

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: process.env.GQLBACKEND ? process.env.GQLBACKEND : "http://localhost:8080/query",
  headers: getHeaders(),
});

const link = split(({ query }) => {
  const { kind } = getMainDefinition(query);
  return kind === "OperationDefinition";
}, httpLink);

export const client = new ApolloClient({
  link,
  cache,
});
