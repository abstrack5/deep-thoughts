import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
// ApolloProvider is a special type of React component that we'll use to provide data to all of the other components.

// ApolloClient is a constructor function that will help initialize the connection to the GraphQL API server.

// InMemoryCache enables the Apollo Client instance to cache API response data so that we can perform requests more efficiently.

// createHttpLink allows us to control how the Apollo Client makes a request. Think of it like middleware for the outbound network requests.

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";

// connection to /graphql endpoint
const httpLink = createHttpLink({
  //establish a new link to the GraphQL server at its /graphql endpoint
  uri: "/graphql",
});
// The React environment runs at localhost:3000, and the server environment runs at localhost:3001. So if we just used /graphql,
// as we've done previously, the requests would go to localhost:3000/graphql—which isn't the address for the back-end server.
const client = new ApolloClient({
  // we use the ApolloClient() constructor to instantiate the Apollo Client
  // instance and create the connection to the API endpoint.
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Header />
        <div className="container">
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
