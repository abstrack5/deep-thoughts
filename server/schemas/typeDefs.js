// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
// To define a query, you use the type Query {} data type
// type thought is custom data type. With this custom data
// type, we are able to instruct the thoughts query so that each
// thought that returns can include _id, thoughtText, username, and
// reactionCount fields with their respective GraphQL scalars

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
  }

  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addReaction(thoughtId: ID!, reactionBody: String!): Thought
    addFriend(friendId: ID!): User
  }

  type Auth {
    token: ID!
    user: User
  }
`;
//This means that an Auth type must return a token and can optionally include any other user data.

//Notice the exclamation point ! after the query parameter data type definitions?
// That indicates that for that query to be carried out, that data must exist.
// Otherwise, Apollo will return an error to the client making the request and the
// query won't even reach the resolver function associated with it.

// export the typeDefs
module.exports = typeDefs;
