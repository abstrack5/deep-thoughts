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
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import SingleThought from "./pages/SingleThought";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

// connection to /graphql endpoint
const httpLink = createHttpLink({
  //establish a new link to the GraphQL server at its /graphql endpoint
  uri: "/graphql",
});
// The React environment runs at localhost:3000, and the server environment runs at localhost:3001. So if we just used /graphql,
// as we've done previously, the requests would go to localhost:3000/graphql—which isn't the address for the back-end server.

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer  ${token}` : '',
    },
  };
});
// With the configuration of authLink, we use the setContext() function to retrieve the token 
// from localStorage and set the HTTP request headers of every request to include the token, 
// whether the request needs it or not. This is fine, because if the request doesn't need the token, 
// our server-side resolver function won't check for it.

const client = new ApolloClient({
  // we use the ApolloClient() constructor to instantiate the Apollo Client
  // instance and create the connection to the API endpoint.
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />}>
                <Route path=":username" element={<Profile />} />
                <Route path="" element={<Profile />} />
              </Route>
              <Route path="/thought/:id" element={<SingleThought />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
