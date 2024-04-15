export const PostQuery = `
  post(id: Int!): Post
  posts(username: String!): [Post!]!
  `;
