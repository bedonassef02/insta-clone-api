import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: Int!
    username: String!
    profile: Profile
    posts: [Post!]!
  }

  type Profile {
    id: Int!
    bio: String
    user: User!
  }

  type Post {
    id: Int!
    title: String!
    content: String!
    author: User!
    comments: [Comment!]!
  }

  input CreateCommentInput {
    content: String!
    postId: Int!
  }

  type Auth {
    token: String!
    user: User!
  }

  type Comment {
    id: Int!
    content: String!
    author: User!
  }

  type Query {
    users: [User!]!
    user(username: String!): User
    posts(username: String!): [Post!]!
    post(id: Int!): Post
    comments(postId: Int!): [Comment!]!
  }

  type Mutation {
    register(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    createPost(title: String!, content: String!): Post
    updatePost(id: Int!, content: String!): Post
    createComment(commentDto: CreateCommentInput!): Comment
    deletePost(id: Int!): Boolean
  }
`;
