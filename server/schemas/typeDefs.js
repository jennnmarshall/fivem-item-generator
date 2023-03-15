const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Item {
    _id: ID
    itemName: String
    label: String
    weight: Int
    type: String
    image: String
    unique: Boolean
    stackable: Boolean
    usable: Boolean
    description: String
    decay: Int
    decayRate: Int
    doclId: String
    bizName: String
  }

  type User {
    _id: ID
    username: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    items(doclId: String!): [Item]
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addItem(label: String!, description: String!): Post
  }
`;

module.exports = typeDefs;
